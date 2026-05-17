import { AxiosError } from 'axios';
import { useState } from 'react';
import { createLeadApi, updateLeadApi } from '../api/leadsApi';
import type { ApiResponse, Lead, LeadFormData } from '../types';
import LeadForm from './LeadForm';
import Modal from './ui/Modal';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead;
  onSuccess: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiResponse<unknown> | undefined;
    return response?.message || response?.errors?.[0] || 'Unable to save lead';
  }

  return 'Unable to save lead';
};

const LeadModal = ({ isOpen, onClose, lead, onSuccess }: LeadModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const isEdit = !!lead;

  const handleSubmit = async (data: LeadFormData): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      if (lead) {
        await updateLeadApi(lead._id, data);
      } else {
        await createLeadApi(data);
      }
      onSuccess();
      onClose();
    } catch (caughtError) {
      setError(getErrorMessage(caughtError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit lead' : 'Create lead'}
    >
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <LeadForm
        key={lead?._id || 'create'}
        initialData={lead}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={isEdit ? 'Save changes' : 'Create lead'}
      />
    </Modal>
  );
};

export default LeadModal;
