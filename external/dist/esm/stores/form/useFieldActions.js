import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useWidgetEvents } from "../../hooks/useWidgetEvents.js";
import { WidgetEvent } from "../../types/events.js";
import { useFormStore } from "./useFormStore.js";
export const useFieldActions = () => {
  const emitter = useWidgetEvents();
  const actions = useFormStore(
    (store) => ({
      getFieldValues: store.getFieldValues,
      isTouched: store.isTouched,
      isDirty: store.isDirty,
      resetField: store.resetField,
      setAsTouched: store.setAsTouched,
      setDefaultValues: store.setDefaultValues,
      setFieldValue: store.setFieldValue,
      setUserAndDefaultValues: store.setUserAndDefaultValues,
    }),
    shallow,
  );
  const setFieldValueWithEmittedEvents = useCallback(
    (fieldName, newValue, options) => {
      const oldValue = actions.getFieldValues(fieldName)[0];
      actions.setFieldValue(fieldName, newValue, options);
      if (newValue !== oldValue) {
        emitter.emit(WidgetEvent.FormFieldChanged, {
          fieldName,
          newValue,
          oldValue,
        });
      }
    },
    [actions, emitter],
  );
  const setUserAndDefaultValuesWithEmittedEvents = useCallback(
    (formValues) => {
      const formValuesKeys = Object.keys(formValues);
      const changedValues = formValuesKeys.reduce((accum, fieldName) => {
        const oldValue = actions.getFieldValues(fieldName)[0];
        const newValue = formValues[fieldName];
        if (newValue !== oldValue) {
          accum.push({ fieldName, newValue, oldValue });
        }
        return accum;
      }, []);
      actions.setUserAndDefaultValues(formValues);
      changedValues.forEach(({ fieldName, newValue, oldValue }) => {
        emitter.emit(WidgetEvent.FormFieldChanged, {
          fieldName,
          newValue,
          oldValue,
        });
      });
    },
    [actions, emitter],
  );
  return {
    ...actions,
    setFieldValue: setFieldValueWithEmittedEvents,
    setUserAndDefaultValues: setUserAndDefaultValuesWithEmittedEvents,
  };
};
//# sourceMappingURL=useFieldActions.js.map
