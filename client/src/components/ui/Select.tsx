import type { FocusEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const Select = ({
  label,
  value,
  options,
  onChange,
  onBlur,
  placeholder,
}: SelectProps) => {
  return (
    <label className="block">
      {label && (
        <span className="label">
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className="input-field"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
