import type { FocusEvent } from 'react';

interface InputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({
  label,
  error,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
}: InputProps) => {
  return (
    <label className="block">
      {label && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
};

export default Input;
