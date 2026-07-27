"use client";

import ReactSelect, { SingleValue } from "react-select";
import { selectStyles } from "@/src/app/select.styles";

export interface SelectOption<T> {
  value: T;
  label: React.ReactNode;
}

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  isSearchable?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SelectCustom<T>({
  value,
  onChange,
  options,
  isSearchable = false,
  placeholder = "Select...",
  className = "",
  ...props
}: SelectProps<T>) {
  return (
    <ReactSelect<SelectOption<T>>
      styles={selectStyles}
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      onChange={(selected) => {
        if (selected) onChange(selected.value);
      }}
      isSearchable={isSearchable}
      placeholder={placeholder}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      menuPosition="fixed"
      className={className}
      {...props}
    />
  );
}