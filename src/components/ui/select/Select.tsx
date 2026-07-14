import dynamic from "next/dynamic";
import type SelectCustom from "./selectCustom";

const Select = dynamic(
  () => import("./selectCustom"),
  { ssr: false }
) as typeof SelectCustom;

export default Select;