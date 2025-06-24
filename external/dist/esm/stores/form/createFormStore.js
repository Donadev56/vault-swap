import { createWithEqualityFn } from "zustand/traditional";
export const formDefaultValues = {
  fromAmount: "",
  toAmount: "",
  tokenSearchFilter: "",
};
const defaultValueToFormValue = (value) => ({
  isTouched: false,
  isDirty: false,
  value,
});
const valuesToFormValues = (defaultValues) => {
  return Object.keys(defaultValues).reduce((accum, key) => {
    accum[key] = defaultValueToFormValue(defaultValues[key]);
    return accum;
  }, {});
};
const isString = (str) => typeof str === "string" || str instanceof String;
const getUpdatedTouchedFields = (userValues) => {
  return Object.keys(userValues).reduce((accum, key) => {
    if (userValues[key]?.isTouched) {
      accum[key] = true;
    }
    return accum;
  }, {});
};
const mergeDefaultFormValues = (userValues, defaultValues) =>
  Object.keys(defaultValues).reduce(
    (accum, key) => {
      const formValue = {
        isTouched: !!(
          userValues[key]?.isTouched || defaultValues[key]?.isTouched
        ),
        isDirty: !!(userValues[key]?.isDirty || defaultValues[key]?.isTouched),
        value:
          userValues[key]?.value || Number.isFinite(userValues[key]?.value)
            ? userValues[key]?.value
            : defaultValues[key]?.value,
      };
      accum[key] = formValue;
      return accum;
    },
    { ...valuesToFormValues(formDefaultValues) },
  );
export const createFormStore = (defaultValues) =>
  createWithEqualityFn((set, get) => {
    const _defaultValues = valuesToFormValues({
      ...formDefaultValues,
      ...defaultValues,
    });
    return {
      defaultValues: _defaultValues,
      userValues: _defaultValues,
      touchedFields: {},
      isValid: true,
      isValidating: false,
      errors: {},
      validation: {},
      setDefaultValues: (defaultValue) => {
        const defaultFormValues = valuesToFormValues(defaultValue);
        set((state) => ({
          defaultValues: defaultFormValues,
          userValues: mergeDefaultFormValues(
            state.userValues,
            defaultFormValues,
          ),
        }));
      },
      setUserAndDefaultValues: (formValues) => {
        const currentUserValues = get().userValues;
        Object.keys(formValues).forEach((key) => {
          if (formValues[key] !== currentUserValues[key]?.value) {
            get().resetField(key, { defaultValue: formValues[key] });
            get().setFieldValue(key, formValues[key], { isTouched: true });
          }
        });
      },
      isTouched: (fieldName) => !!get().userValues[fieldName]?.isTouched,
      isDirty: (fieldName) => !!get().userValues[fieldName]?.isDirty,
      setAsTouched: (fieldName) => {
        const userValues = {
          ...get().userValues,
          [fieldName]: {
            ...get().userValues[fieldName],
            isTouched: true,
          },
        };
        const touchedFields = getUpdatedTouchedFields(userValues);
        set(() => ({
          userValues,
          touchedFields,
        }));
      },
      resetField: (fieldName, { defaultValue } = {}) => {
        if (defaultValue) {
          const fieldValues = {
            ...get().defaultValues[fieldName],
            value: defaultValue,
          };
          const defaultValues = {
            ...get().defaultValues,
            [fieldName]: { ...fieldValues },
          };
          const userValues = {
            ...get().userValues,
            [fieldName]: { ...fieldValues },
          };
          const touchedFields = getUpdatedTouchedFields(userValues);
          set(() => {
            return {
              defaultValues,
              userValues,
              touchedFields,
            };
          });
        } else {
          const userValues = {
            ...get().userValues,
            [fieldName]: { ...get().defaultValues[fieldName] },
          };
          const touchedFields = getUpdatedTouchedFields(userValues);
          set(() => ({
            userValues,
            touchedFields,
          }));
        }
      },
      setFieldValue: (fieldName, value, { isDirty, isTouched } = {}) => {
        const userValues = {
          ...get().userValues,
          [fieldName]: {
            value,
            isDirty:
              isDirty === undefined
                ? get().userValues[fieldName]?.isDirty
                : isDirty,
            isTouched:
              isTouched === undefined
                ? get().userValues[fieldName]?.isTouched
                : isTouched,
          },
        };
        const touchedFields = getUpdatedTouchedFields(userValues);
        set(() => ({
          userValues,
          touchedFields,
        }));
      },
      getFieldValues: (...names) =>
        names.map((name) => get().userValues[name]?.value),
      addFieldValidation: (name, validationFn) => {
        set((state) => ({
          validation: {
            ...state.validation,
            [name]: validationFn,
          },
        }));
      },
      triggerFieldValidation: async (name) => {
        try {
          let valid = true;
          set(() => ({ isValid: false, isValidating: true }));
          const validationFn = get().validation[name];
          if (validationFn) {
            const result = await validationFn(get().userValues?.[name]?.value);
            if (isString(result)) {
              valid = false;
              set((state) => ({
                errors: {
                  ...state.errors,
                  [name]: result,
                },
              }));
            } else {
              valid = result;
              if (valid) {
                get().clearErrors(name);
              }
            }
          }
          set(() => ({ isValid: valid, isValidating: false }));
          return valid;
        } catch (err) {
          set(() => ({ isValidating: false }));
          throw err;
        }
      },
      clearErrors: (name) => {
        const newErrors = { ...get().errors };
        delete newErrors[name];
        set(() => ({
          errors: newErrors,
        }));
      },
    };
  }, Object.is);
//# sourceMappingURL=createFormStore.js.map
