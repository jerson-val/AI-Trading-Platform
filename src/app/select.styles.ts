export const selectStyles = {
  control: (base: any, state:any) => ({
    ...base,
    width: "100%",
    minHeight: "44px",
    backgroundColor: "#1f2937",
    border: `1px solid ${state.isFocused ? "#3b82f6" : "#374151"}`,
    borderRadius: "0.5rem",
    boxShadow: "none",
    padding: "0 0.25rem",
    cursor: "text",
    "&:hover": {
      borderColor: state.isFocused ? "#3b82f6" : "#4b5563",
    },
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "0 0.5rem",
  }),

  input: (base: any) => ({
    ...base,
    color: "#fff",
    margin: 0,
    padding: 0,
    fontSize: "0.875rem",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
    fontSize: "0.875rem",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "#9ca3af",
    fontSize: "0.875rem",
  }),

  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: "#4b5563",
  }),
  menuPortal: (base: any) => ({
  ...base,
  zIndex: 9999,
}),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#fff",
    },
  }),

  clearIndicator: (base: any) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#fff",
    },
  }),

  menu: (base: any) => ({
    ...base,
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "0.5rem",
    overflow: "hidden",
    marginTop: 4,
    zIndex: 50,
  }),

  menuList: (base: any) => ({
    ...base,
    padding: 0,
    maxHeight: 250,
  }),

  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#374151"
      : "#1f2937",
    color: "#fff",
    fontSize: "0.875rem",
    cursor: "pointer",
    padding: "10px 12px",
    "&:active": {
      backgroundColor: "#2563eb",
    },
  }),

  noOptionsMessage: (base: any) => ({
    ...base,
    color: "#9ca3af",
    padding: "10px",
  }),
};