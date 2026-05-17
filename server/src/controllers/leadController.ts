import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { Types, UpdateQuery } from 'mongoose';
import { ILead, Lead } from '../models/Lead';
import { AuthPayload, LeadSource, LeadStatus } from '../types';
import { getErrorMessage, sendValidationError } from '../utils/errorResponse';
import { isValidObjectId } from '../utils/objectId';

interface LeadRequestBody {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

interface LeadQuery {
  status?: string;
  source?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

interface RegexFilter {
  $regex: string;
  $options: 'i';
}

interface LeadFilter {
  createdBy?: Types.ObjectId;
  status?: LeadStatus;
  source?: LeadSource;
  $or?: Array<{ name: RegexFilter } | { email: RegexFilter }>;
}

const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const LEAD_SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];
const ALLOWED_UPDATE_FIELDS: Array<keyof LeadRequestBody> = [
  'name',
  'email',
  'status',
  'source',
];

const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.map((error) => String(error.msg));
};

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const parsePositiveInt = (
  value: string | undefined,
  fallback: number,
  max?: number
): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  const normalized = Number.isNaN(parsed) ? fallback : Math.max(1, parsed);

  return max ? Math.min(max, normalized) : normalized;
};

const isLeadStatus = (value: string | undefined): value is LeadStatus => {
  return !!value && LEAD_STATUSES.includes(value as LeadStatus);
};

const isLeadSource = (value: string | undefined): value is LeadSource => {
  return !!value && LEAD_SOURCES.includes(value as LeadSource);
};

const getAuthenticatedUser = (req: { user?: AuthPayload }): AuthPayload => {
  if (!req.user) {
    throw new Error('Authenticated user missing from request');
  }

  return req.user;
};

const buildLeadFilter = (
  user: AuthPayload,
  query: LeadQuery
): LeadFilter => {
  const { status, source, search } = query;
  const filter: LeadFilter = {};

  if (user.role === 'sales') {
    filter.createdBy = new Types.ObjectId(user.id);
  }

  if (isLeadStatus(status)) {
    filter.status = status;
  }

  if (isLeadSource(source)) {
    filter.source = source;
  }

  if (search?.trim()) {
    const escapedSearch = escapeRegex(search.trim());
    filter.$or = [
      { name: { $regex: escapedSearch, $options: 'i' } },
      { email: { $regex: escapedSearch, $options: 'i' } },
    ];
  }

  return filter;
};

const validateObjectId = (id: string, res: Response): boolean => {
  if (isValidObjectId(id)) {
    return true;
  }

  res.status(400).json({ success: false, message: 'Invalid lead ID' });
  return false;
};

const ensureLeadAccess = (req: Request, lead: ILead, res: Response): boolean => {
  const user = getAuthenticatedUser(req);

  if (user.role === 'sales' && lead.createdBy.toString() !== user.id) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to access this lead',
    });
    return false;
  }

  return true;
};

const pickLeadUpdates = (body: LeadRequestBody): UpdateQuery<ILead> => {
  return ALLOWED_UPDATE_FIELDS.reduce<UpdateQuery<ILead>>((updates, field) => {
    const value = body[field];

    if (value !== undefined) {
      updates[field] = value;
    }

    return updates;
  }, {});
};

export const getLeads = async (
  req: Request<Record<string, never>, unknown, unknown, LeadQuery>,
  res: Response
): Promise<void> => {
  try {
    const { sort, page, limit } = req.query;
    const filter = buildLeadFilter(getAuthenticatedUser(req), req.query);
    const pageNum = parsePositiveInt(page, 1);
    const limitNum = parsePositiveInt(limit, 10, 50);
    const skip = (pageNum - 1) * limitNum;
    const sortOrder = sort === 'oldest' ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email'),
      Lead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: unknown) {
    console.error(`Failed to fetch leads: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};

export const getLeadById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    if (!ensureLeadAccess(req, lead, res)) {
      return;
    }

    res.json({ success: true, data: lead });
  } catch (error: unknown) {
    console.error(`Failed to fetch lead: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to fetch lead' });
  }
};

export const createLead = async (
  req: Request<Record<string, never>, unknown, LeadRequestBody>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: formatValidationErrors(errors.array()),
    });
    return;
  }

  try {
    const user = getAuthenticatedUser(req);
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status: status || 'New',
      source,
      createdBy: user.id,
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error: unknown) {
    if (sendValidationError(error, res, 'Lead validation failed')) {
      return;
    }

    console.error(`Failed to create lead: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to create lead' });
  }
};

export const updateLead = async (
  req: Request<{ id: string }, unknown, LeadRequestBody>,
  res: Response
): Promise<void> => {
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: formatValidationErrors(errors.array()),
    });
    return;
  }

  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    if (!ensureLeadAccess(req, lead, res)) {
      return;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      pickLeadUpdates(req.body),
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.json({ success: true, data: updatedLead });
  } catch (error: unknown) {
    if (sendValidationError(error, res, 'Lead validation failed')) {
      return;
    }

    console.error(`Failed to update lead: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
};

export const deleteLead = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: unknown) {
    console.error(`Failed to delete lead: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to delete lead' });
  }
};
