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
        <span className="label">
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
        className="input-field"
      />
      {error && <p className="mt-1 text-xs" style={{ color: 'var(--danger)' }}>{error}</p>}
    </label>
  );
};

export default Input;
