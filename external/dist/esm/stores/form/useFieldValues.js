import { shallow } from "zustand/shallow";
import { useFormStore } from "./useFormStore.js";
// We should return a strongly-typed array based on the specific field names we pass to the function.
export const useFieldValues = (...names) => {
  const values = useFormStore(
    (store) => names.map((name) => store.userValues[name]?.value),
    shallow,
  );
  return values;
};
//# sourceMappingURL=useFieldValues.js.map
