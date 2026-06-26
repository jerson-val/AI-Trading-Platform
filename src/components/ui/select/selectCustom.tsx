"use client";

import ReactSelect, { SingleValue } from "react-select";
import { selectStyles } from "@/src/app/select.styles";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  isSearchable?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SelectCustom({
  value,
  onChange,
  options,
  isSearchable = false,
  placeholder = "Select...",
  className = "",
  ...props
}: SelectProps) {
  return (
    <ReactSelect<SelectOption>
      styles={selectStyles}
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      onChange={(selected: SingleValue<SelectOption>) =>
        onChange(selected?.value ?? "")
      }
      isSearchable={isSearchable}
      placeholder={placeholder}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      menuPosition="fixed"
      className={className}
      {...props}
    />
  );
}