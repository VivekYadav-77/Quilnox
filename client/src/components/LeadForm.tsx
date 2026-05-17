import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { LeadFormData, LeadSource, LeadStatus } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface LeadFormProps {
  initialData?: Partial<LeadFormData>;
  onSubmit: (data: LeadFormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

type LeadFormField = keyof LeadFormData;
type TouchedFields = Partial<Record<LeadFormField, boolean>>;
type FormErrors = Partial<Record<LeadFormField, string>>;

const statusOptions = ['New', 'Contacted', 'Qualified', 'Lost'].map((value) => ({
  value,
  label: value,
}));

const sourceOptions = ['Website', 'Instagram', 'Referral'].map((value) => ({
  value,
  label: value,
}));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (data: LeadFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required';
  if (data.name.length > 100) errors.name = 'Name cannot exceed 100 characters';
  if (!emailPattern.test(data.email)) errors.email = 'Enter a valid email';
  if (!data.status) errors.status = 'Status is required';
  if (!data.source) errors.source = 'Source is required';

  return errors;
};

const LeadForm = ({ initialData, onSubmit, loading, submitLabel }: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    status: initialData?.status || 'New',
    source: initialData?.source || 'Website',
  });
  const [touched, setTouched] = useState<TouchedFields>({});

  const errors = useMemo(() => validate(formData), [formData]);

  const setField = (field: LeadFormField, value: string): void => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const touchField = (field: LeadFormField) => (): void => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setTouched({ name: true, email: true, status: true, source: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(value) => setField('name', value)}
        onBlur={touchField('name')}
        error={touched.name ? errors.name : undefined}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setField('email', value)}
        onBlur={touchField('email')}
        error={touched.email ? errors.email : undefined}
        required
      />
      <Select
        label="Status"
        value={formData.status}
        options={statusOptions}
        onChange={(value) => setField('status', value as LeadStatus)}
        onBlur={touchField('status')}
      />
      <Select
        label="Source"
        value={formData.source}
        options={sourceOptions}
        onChange={(value) => setField('source', value as LeadSource)}
        onBlur={touchField('source')}
      />
      <Button type="submit" loading={loading} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default LeadForm;
