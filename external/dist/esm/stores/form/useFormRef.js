import { useImperativeHandle } from "react";
import { useBookmarkActions } from "../../stores/bookmarks/useBookmarkActions.js";
import { formDefaultValues } from "../../stores/form/createFormStore.js";
import { useSendToWalletActions } from "../../stores/settings/useSendToWalletStore.js";
export const useFormRef = (formStore, formRef) => {
  const { setSendToWallet } = useSendToWalletActions();
  const { setSelectedBookmark } = useBookmarkActions();
  useImperativeHandle(formRef, () => {
    const sanitizeValue = {
      fromAmount: (value) =>
        (typeof value === "number" ? value?.toPrecision() : value) ||
        formDefaultValues.fromAmount,
      toAmount: (value) =>
        (typeof value === "number" ? value?.toPrecision() : value) ||
        formDefaultValues.toAmount,
      toAddress: (value) => {
        const isToAddressObj = typeof value !== "string";
        const address =
          (isToAddressObj ? value?.address : value) ||
          formDefaultValues.toAddress;
        // sets the send to wallet button state to be open
        // if there is an address to display
        if (address) {
          setSendToWallet(address);
        }
        // we can assume that the toAddress has been passed as ToAddress object
        // and display it accordingly - this ensures that if a name is included
        // that it is displayed in the Send To Wallet form field correctly
        if (isToAddressObj) {
          setSelectedBookmark(value);
        }
        return address;
      },
    };
    return {
      setFieldValue: (fieldName, value, options) => {
        const sanitizedValue = sanitizeValue[fieldName]
          ? sanitizeValue[fieldName](value)
          : value;
        const fieldValueOptions = options?.setUrlSearchParam
          ? { isTouched: options?.setUrlSearchParam }
          : undefined;
        formStore
          .getState()
          .setFieldValue(fieldName, sanitizedValue, fieldValueOptions);
      },
    };
  }, [formStore, setSendToWallet, setSelectedBookmark]);
};
//# sourceMappingURL=useFormRef.js.map
