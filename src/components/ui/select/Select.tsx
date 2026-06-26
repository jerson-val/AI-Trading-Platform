import dynamic from "next/dynamic";

const Select = dynamic(() => import("./selectCustom"), {
  ssr: false,
});

export default Select;