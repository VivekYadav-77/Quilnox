import { useAuth } from './useAuth';
import type { Lead } from '../types';

interface RBACResult {
  canCreate: boolean;
  canEdit: (lead: Lead) => boolean;
  canDelete: boolean;
}

export const useRBAC = (): RBACResult => {
  const { user, isAdmin } = useAuth();

  return {
    canCreate: true,
    canDelete: isAdmin,
    canEdit: (lead: Lead): boolean => {
      if (isAdmin) {
        return true;
      }

      return lead.createdBy._id === user?._id;
    },
  };
};
