import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { createLead as createLeadModel, deleteLead as deleteLeadModel, getLeadById as getLeadByIdModel, getLeads as getLeadsModel, ILead, updateLead as updateLeadModel } from '../models/Lead';
import { AuthPayload, LeadSource, LeadStatus } from '../types';
import { getErrorMessage, sendValidationError } from '../utils/errorResponse';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';

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
  cursor?: string;
  limit?: string;
}

const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const LEAD_SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];

const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.map((error) => String(error.msg));
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

const validateLeadId = (id: string, res: Response): boolean => {
  if (validateUuid(id)) {
    return true;
  }

  res.status(400).json({ success: false, message: 'Invalid lead ID' });
  return false;
};

const ensureLeadAccess = (req: Request, lead: ILead, res: Response): boolean => {
  const user = getAuthenticatedUser(req);

  if (user.role === 'sales' && lead.createdBy !== user.id) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to access this lead',
    });
    return false;
  }

  return true;
};

export const getLeads = async (
  req: Request<Record<string, never>, unknown, unknown, LeadQuery>,
  res: Response
): Promise<void> => {
  try {
    const { status, source, search, sort, cursor, limit } = req.query;
    const user = getAuthenticatedUser(req);
    const limitNum = parsePositiveInt(limit, 10, 50);

    const result = await getLeadsModel(user.role, user.id, {
      status: isLeadStatus(status) ? status : undefined,
      source: isLeadSource(source) ? source : undefined,
      search: search?.trim(),
      sort: sort === 'oldest' ? 'oldest' : 'newest',
      cursor,
      limit: limitNum,
    });

    res.json({
      success: true,
      data: result.items,
      pagination: {
        total: result.count, // DynamoDB cursor pagination doesn't give real total easily
        limit: limitNum,
        nextCursor: result.nextCursor,
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
  if (!validateLeadId(req.params.id, res)) {
    return;
  }

  try {
    const lead = await getLeadByIdModel(req.params.id);

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
    
    if (!name) {
       res.status(400).json({ success: false, errors: ['Name is required'] });
       return;
    }

    const lead = await createLeadModel({
      leadId: uuidv4(),
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
  if (!validateLeadId(req.params.id, res)) {
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
    const lead = await getLeadByIdModel(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    if (!ensureLeadAccess(req, lead, res)) {
      return;
    }

    const updatedLead = await updateLeadModel(req.params.id, req.body);

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
  if (!validateLeadId(req.params.id, res)) {
    return;
  }

  try {
    const lead = await getLeadByIdModel(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    
    if (!ensureLeadAccess(req, lead, res)) {
        return;
    }

    await deleteLeadModel(req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: unknown) {
    console.error(`Failed to delete lead: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Failed to delete lead' });
  }
};
