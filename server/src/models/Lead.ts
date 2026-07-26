import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { dynamo, LEADS_TABLE } from '../config/dynamo';
import { LeadSource, LeadStatus } from '../types';

export interface ILead {
  leadId: string;
  createdBy: string;
  name: string;
  email?: string;
  status: LeadStatus;
  source?: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export type CreateLeadInput = Omit<ILead, 'createdAt' | 'updatedAt'>;

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: string;
  cursor?: string;
  limit?: number;
}

export interface LeadListResult {
  items: ILead[];
  count: number;
  nextCursor?: string;
}

export const getLeads = async (
  userRole: string,
  userId: string,
  filters: LeadFilters
): Promise<LeadListResult> => {
  const limit = filters.limit || 50;
  
  let filterExpr = '';
  const exprValues: Record<string, any> = {};
  const exprNames: Record<string, string> = {};

  if (filters.status) {
    filterExpr += '#status = :status';
    exprNames['#status'] = 'status';
    exprValues[':status'] = filters.status;
  }

  if (filters.source) {
    if (filterExpr) filterExpr += ' AND ';
    filterExpr += '#source = :source';
    exprNames['#source'] = 'source';
    exprValues[':source'] = filters.source;
  }

  let items: ILead[] = [];
  let nextCursor: Record<string, any> | undefined = undefined;

  if (userRole === 'admin') {
    const scanParams: any = {
      TableName: LEADS_TABLE,
      Limit: limit,
    };
    
    if (filterExpr) {
      scanParams.FilterExpression = filterExpr;
      scanParams.ExpressionAttributeNames = exprNames;
      scanParams.ExpressionAttributeValues = exprValues;
    }
    
    if (filters.cursor) {
      try { scanParams.ExclusiveStartKey = JSON.parse(atob(filters.cursor)); } catch(e){}
    }

    const result = await dynamo.send(new ScanCommand(scanParams));
    items = (result.Items || []) as ILead[];
    nextCursor = result.LastEvaluatedKey;
  } else {
    const queryParams: any = {
      TableName: LEADS_TABLE,
      IndexName: 'CreatedByIndex',
      KeyConditionExpression: 'createdBy = :userId',
      Limit: limit,
      ScanIndexForward: filters.sort === 'oldest' ? true : false,
    };
    
    exprValues[':userId'] = userId;
    
    if (filterExpr) {
      queryParams.FilterExpression = filterExpr;
      queryParams.ExpressionAttributeNames = exprNames;
    }
    
    queryParams.ExpressionAttributeValues = exprValues;
    
    if (filters.cursor) {
      try { queryParams.ExclusiveStartKey = JSON.parse(atob(filters.cursor)); } catch(e){}
    }

    const result = await dynamo.send(new QueryCommand(queryParams));
    items = (result.Items || []) as ILead[];
    nextCursor = result.LastEvaluatedKey;
  }

  if (filters.search) {
    const lowerSearch = filters.search.toLowerCase();
    items = items.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lowerSearch) ||
        (lead.email && lead.email.toLowerCase().includes(lowerSearch))
    );
  }

  if (userRole === 'admin') {
    const asc = filters.sort === 'oldest';
    items.sort((a, b) => {
      if (a.createdAt < b.createdAt) return asc ? -1 : 1;
      if (a.createdAt > b.createdAt) return asc ? 1 : -1;
      return 0;
    });
  }

  return {
    items,
    count: items.length,
    nextCursor: nextCursor ? btoa(JSON.stringify(nextCursor)) : undefined,
  };
};

export const getLeadById = async (leadId: string): Promise<ILead | null> => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: LEADS_TABLE,
      Key: { leadId },
    })
  );
  return (result.Item as ILead) || null;
};

export const createLead = async (data: CreateLeadInput): Promise<ILead> => {
  const now = new Date().toISOString();
  const lead: ILead = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await dynamo.send(
    new PutCommand({
      TableName: LEADS_TABLE,
      Item: lead,
    })
  );

  return lead;
};

export const updateLead = async (
  leadId: string,
  updates: Partial<ILead>
): Promise<ILead | null> => {
  delete updates.leadId;
  delete updates.createdBy;
  delete updates.createdAt;
  updates.updatedAt = new Date().toISOString();

  const updateKeys = Object.keys(updates) as Array<keyof ILead>;
  if (updateKeys.length === 0) {
    return getLeadById(leadId);
  }

  let updateExpr = 'SET ';
  const exprNames: Record<string, string> = {};
  const exprValues: Record<string, any> = {};

  updateKeys.forEach((key, index) => {
    updateExpr += `#key${index} = :val${index}${
      index < updateKeys.length - 1 ? ', ' : ''
    }`;
    exprNames[`#key${index}`] = key;
    exprValues[`:val${index}`] = updates[key];
  });

  try {
    const result = await dynamo.send(
      new UpdateCommand({
        TableName: LEADS_TABLE,
        Key: { leadId },
        UpdateExpression: updateExpr,
        ExpressionAttributeNames: exprNames,
        ExpressionAttributeValues: exprValues,
        ReturnValues: 'ALL_NEW',
      })
    );
    return (result.Attributes as ILead) || null;
  } catch (err) {
    console.error('DynamoDB Update Error:', err);
    return null;
  }
};

export const deleteLead = async (leadId: string): Promise<boolean> => {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: LEADS_TABLE,
        Key: { leadId },
      })
    );
    return true;
  } catch (err) {
    console.error('DynamoDB Delete Error:', err);
    return false;
  }
};
