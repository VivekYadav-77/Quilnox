import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamo, USERS_TABLE } from '../config/dynamo';
import { UserRole } from '../types';

export interface IUser {
  userId: string;
  email: string;
  name: string;
  password?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserInput = Omit<IUser, 'createdAt' | 'updatedAt'>;

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    })
  );

  return (result.Items?.[0] as IUser) || null;
};

export const findUserById = async (userId: string): Promise<IUser | null> => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    })
  );

  return (result.Item as IUser) || null;
};

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  const now = new Date().toISOString();
  
  const user: IUser = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await dynamo.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
    })
  );

  return user;
};

export const sanitizeUser = (user: IUser): Omit<IUser, 'password'> => {
  const { password, ...safeUser } = user;
  return safeUser;
};
