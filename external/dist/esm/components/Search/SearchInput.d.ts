import type { FocusEventHandler, FormEventHandler } from "react";
interface SearchInputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}
export declare const SearchInput: ({
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  autoFocus,
}: SearchInputProps) => import("react/jsx-runtime").JSX.Element;
export declare const StickySearchInput: (
  props: SearchInputProps,
) => import("react/jsx-runtime").JSX.Element;
export {};
