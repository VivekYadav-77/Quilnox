import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION || 'ap-south-1';

// On EC2 with an IAM Role: SDK automatically uses instance metadata credentials.
// In local development: SDK uses ~/.aws/credentials or env vars.
const client = new DynamoDBClient({ region });
export const dynamo = DynamoDBDocumentClient.from(client);

export const USERS_TABLE = process.env.DYNAMO_USERS_TABLE || 'quilnox-users';
export const LEADS_TABLE = process.env.DYNAMO_LEADS_TABLE || 'quilnox-leads';
