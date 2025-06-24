import type { PageContainerProps } from "../../components/PageContainer.js";
export declare const AddressInput: import("@emotion/styled").StyledComponent<
  import("@mui/material").InputBaseProps &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const BookmarkInputFields: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SendToWalletPageContainer: import("@emotion/styled").StyledComponent<
  import("@mui/material").ContainerOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      | "fixed"
      | "maxWidth"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "disableGutters"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> &
    PageContainerProps,
  {},
  {}
>;
interface FullHeightAdjustablePageContainerProps extends PageContainerProps {
  enableFullHeight?: boolean;
}
export declare const FullHeightAdjustablePageContainer: import("@emotion/styled").StyledComponent<
  import("@mui/material").ContainerOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      | "fixed"
      | "maxWidth"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "disableGutters"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> &
    PageContainerProps &
    FullHeightAdjustablePageContainerProps,
  {},
  {}
>;
export declare const SendToWalletCard: import("@emotion/styled").StyledComponent<
  Pick<
    import("@mui/material").CardOwnProps &
      import("@mui/material/OverridableComponent").CommonProps &
      Omit<
        import("react").DetailedHTMLProps<
          import("react").HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        | "children"
        | "sx"
        | "style"
        | "className"
        | "classes"
        | "variant"
        | "elevation"
        | "square"
        | "raised"
      > &
      import("@mui/system").MUIStyledCommonProps<
        import("@mui/material").Theme
      > &
      import("../../components/Card/Card.js").CardProps,
    | "title"
    | "color"
    | "content"
    | "translate"
    | "children"
    | "ref"
    | "sx"
    | "slot"
    | "style"
    | "key"
    | "defaultChecked"
    | "defaultValue"
    | "suppressContentEditableWarning"
    | "suppressHydrationWarning"
    | "accessKey"
    | "autoCapitalize"
    | "autoFocus"
    | "className"
    | "contentEditable"
    | "contextMenu"
    | "dir"
    | "draggable"
    | "enterKeyHint"
    | "hidden"
    | "id"
    | "lang"
    | "nonce"
    | "spellCheck"
    | "tabIndex"
    | "radioGroup"
    | "role"
    | "about"
    | "datatype"
    | "inlist"
    | "prefix"
    | "property"
    | "rel"
    | "resource"
    | "rev"
    | "typeof"
    | "vocab"
    | "autoCorrect"
    | "autoSave"
    | "itemProp"
    | "itemScope"
    | "itemType"
    | "itemID"
    | "itemRef"
    | "results"
    | "security"
    | "unselectable"
    | "popover"
    | "popoverTargetAction"
    | "popoverTarget"
    | "inert"
    | "inputMode"
    | "is"
    | "exportparts"
    | "part"
    | "aria-activedescendant"
    | "aria-atomic"
    | "aria-autocomplete"
    | "aria-braillelabel"
    | "aria-brailleroledescription"
    | "aria-busy"
    | "aria-checked"
    | "aria-colcount"
    | "aria-colindex"
    | "aria-colindextext"
    | "aria-colspan"
    | "aria-controls"
    | "aria-current"
    | "aria-describedby"
    | "aria-description"
    | "aria-details"
    | "aria-disabled"
    | "aria-dropeffect"
    | "aria-errormessage"
    | "aria-expanded"
    | "aria-flowto"
    | "aria-grabbed"
    | "aria-haspopup"
    | "aria-hidden"
    | "aria-invalid"
    | "aria-keyshortcuts"
    | "aria-label"
    | "aria-labelledby"
    | "aria-level"
    | "aria-live"
    | "aria-modal"
    | "aria-multiline"
    | "aria-multiselectable"
    | "aria-orientation"
    | "aria-owns"
    | "aria-placeholder"
    | "aria-posinset"
    | "aria-pressed"
    | "aria-readonly"
    | "aria-relevant"
    | "aria-required"
    | "aria-roledescription"
    | "aria-rowcount"
    | "aria-rowindex"
    | "aria-rowindextext"
    | "aria-rowspan"
    | "aria-selected"
    | "aria-setsize"
    | "aria-sort"
    | "aria-valuemax"
    | "aria-valuemin"
    | "aria-valuenow"
    | "aria-valuetext"
    | "dangerouslySetInnerHTML"
    | "onCopy"
    | "onCopyCapture"
    | "onCut"
    | "onCutCapture"
    | "onPaste"
    | "onPasteCapture"
    | "onCompositionEnd"
    | "onCompositionEndCapture"
    | "onCompositionStart"
    | "onCompositionStartCapture"
    | "onCompositionUpdate"
    | "onCompositionUpdateCapture"
    | "onFocus"
    | "onFocusCapture"
    | "onBlur"
    | "onBlurCapture"
    | "onChange"
    | "onChangeCapture"
    | "onBeforeInput"
    | "onBeforeInputCapture"
    | "onInput"
    | "onInputCapture"
    | "onReset"
    | "onResetCapture"
    | "onSubmit"
    | "onSubmitCapture"
    | "onInvalid"
    | "onInvalidCapture"
    | "onLoad"
    | "onLoadCapture"
    | "onError"
    | "onErrorCapture"
    | "onKeyDown"
    | "onKeyDownCapture"
    | "onKeyPress"
    | "onKeyPressCapture"
    | "onKeyUp"
    | "onKeyUpCapture"
    | "onAbort"
    | "onAbortCapture"
    | "onCanPlay"
    | "onCanPlayCapture"
    | "onCanPlayThrough"
    | "onCanPlayThroughCapture"
    | "onDurationChange"
    | "onDurationChangeCapture"
    | "onEmptied"
    | "onEmptiedCapture"
    | "onEncrypted"
    | "onEncryptedCapture"
    | "onEnded"
    | "onEndedCapture"
    | "onLoadedData"
    | "onLoadedDataCapture"
    | "onLoadedMetadata"
    | "onLoadedMetadataCapture"
    | "onLoadStart"
    | "onLoadStartCapture"
    | "onPause"
    | "onPauseCapture"
    | "onPlay"
    | "onPlayCapture"
    | "onPlaying"
    | "onPlayingCapture"
    | "onProgress"
    | "onProgressCapture"
    | "onRateChange"
    | "onRateChangeCapture"
    | "onSeeked"
    | "onSeekedCapture"
    | "onSeeking"
    | "onSeekingCapture"
    | "onStalled"
    | "onStalledCapture"
    | "onSuspend"
    | "onSuspendCapture"
    | "onTimeUpdate"
    | "onTimeUpdateCapture"
    | "onVolumeChange"
    | "onVolumeChangeCapture"
    | "onWaiting"
    | "onWaitingCapture"
    | "onAuxClick"
    | "onAuxClickCapture"
    | "onClick"
    | "onClickCapture"
    | "onContextMenu"
    | "onContextMenuCapture"
    | "onDoubleClick"
    | "onDoubleClickCapture"
    | "onDrag"
    | "onDragCapture"
    | "onDragEnd"
    | "onDragEndCapture"
    | "onDragEnter"
    | "onDragEnterCapture"
    | "onDragExit"
    | "onDragExitCapture"
    | "onDragLeave"
    | "onDragLeaveCapture"
    | "onDragOver"
    | "onDragOverCapture"
    | "onDragStart"
    | "onDragStartCapture"
    | "onDrop"
    | "onDropCapture"
    | "onMouseDown"
    | "onMouseDownCapture"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onMouseMove"
    | "onMouseMoveCapture"
    | "onMouseOut"
    | "onMouseOutCapture"
    | "onMouseOver"
    | "onMouseOverCapture"
    | "onMouseUp"
    | "onMouseUpCapture"
    | "onSelect"
    | "onSelectCapture"
    | "onTouchCancel"
    | "onTouchCancelCapture"
    | "onTouchEnd"
    | "onTouchEndCapture"
    | "onTouchMove"
    | "onTouchMoveCapture"
    | "onTouchStart"
    | "onTouchStartCapture"
    | "onPointerDown"
    | "onPointerDownCapture"
    | "onPointerMove"
    | "onPointerMoveCapture"
    | "onPointerUp"
    | "onPointerUpCapture"
    | "onPointerCancel"
    | "onPointerCancelCapture"
    | "onPointerEnter"
    | "onPointerLeave"
    | "onPointerOver"
    | "onPointerOverCapture"
    | "onPointerOut"
    | "onPointerOutCapture"
    | "onGotPointerCapture"
    | "onGotPointerCaptureCapture"
    | "onLostPointerCapture"
    | "onLostPointerCaptureCapture"
    | "onScroll"
    | "onScrollCapture"
    | "onScrollEnd"
    | "onScrollEndCapture"
    | "onWheel"
    | "onWheelCapture"
    | "onAnimationStart"
    | "onAnimationStartCapture"
    | "onAnimationEnd"
    | "onAnimationEndCapture"
    | "onAnimationIteration"
    | "onAnimationIterationCapture"
    | "onToggle"
    | "onBeforeToggle"
    | "onTransitionCancel"
    | "onTransitionCancelCapture"
    | "onTransitionEnd"
    | "onTransitionEndCapture"
    | "onTransitionRun"
    | "onTransitionRunCapture"
    | "onTransitionStart"
    | "onTransitionStartCapture"
    | "type"
    | "classes"
    | "variant"
    | "elevation"
    | "component"
    | "square"
    | "theme"
    | "as"
    | "raised"
    | "selectionColor"
    | "indented"
  > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SendToWalletSheetContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SendToWalletButtonRow: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SendToWalletIconButton: import("@emotion/styled").StyledComponent<
  import("@mui/material").ButtonOwnProps &
    Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      | "color"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "tabIndex"
      | "classes"
      | "variant"
      | "href"
      | "action"
      | "size"
      | "disabled"
      | "centerRipple"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "TouchRippleProps"
      | "touchRippleRef"
      | "disableFocusRipple"
      | "loading"
      | "loadingIndicator"
      | "disableElevation"
      | "endIcon"
      | "fullWidth"
      | "loadingPosition"
      | "startIcon"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const IconContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SheetTitle: import("@emotion/styled").StyledComponent<
  import("@mui/material").TypographyOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >,
      | "border"
      | "borderTop"
      | "borderRight"
      | "borderBottom"
      | "borderLeft"
      | "borderColor"
      | "borderRadius"
      | "display"
      | "displayPrint"
      | "overflow"
      | "textOverflow"
      | "visibility"
      | "whiteSpace"
      | "flexBasis"
      | "flexDirection"
      | "flexWrap"
      | "justifyContent"
      | "alignItems"
      | "alignContent"
      | "order"
      | "flex"
      | "flexGrow"
      | "flexShrink"
      | "alignSelf"
      | "justifyItems"
      | "justifySelf"
      | "gap"
      | "columnGap"
      | "rowGap"
      | "gridColumn"
      | "gridRow"
      | "gridAutoFlow"
      | "gridAutoColumns"
      | "gridAutoRows"
      | "gridTemplateColumns"
      | "gridTemplateRows"
      | "gridTemplateAreas"
      | "gridArea"
      | "bgcolor"
      | "color"
      | "zIndex"
      | "position"
      | "top"
      | "right"
      | "bottom"
      | "left"
      | "boxShadow"
      | "width"
      | "maxWidth"
      | "minWidth"
      | "height"
      | "maxHeight"
      | "minHeight"
      | "boxSizing"
      | "m"
      | "mt"
      | "mr"
      | "mb"
      | "ml"
      | "mx"
      | "my"
      | "p"
      | "pt"
      | "pr"
      | "pb"
      | "pl"
      | "px"
      | "py"
      | "margin"
      | "marginTop"
      | "marginRight"
      | "marginBottom"
      | "marginLeft"
      | "marginX"
      | "marginY"
      | "marginInline"
      | "marginInlineStart"
      | "marginInlineEnd"
      | "marginBlock"
      | "marginBlockStart"
      | "marginBlockEnd"
      | "padding"
      | "paddingTop"
      | "paddingRight"
      | "paddingBottom"
      | "paddingLeft"
      | "paddingX"
      | "paddingY"
      | "paddingInline"
      | "paddingInlineStart"
      | "paddingInlineEnd"
      | "paddingBlock"
      | "paddingBlockStart"
      | "paddingBlockEnd"
      | "typography"
      | "fontFamily"
      | "fontSize"
      | "fontStyle"
      | "fontWeight"
      | "letterSpacing"
      | "lineHeight"
      | "textAlign"
      | "textTransform"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "align"
      | "gutterBottom"
      | "noWrap"
      | "paragraph"
      | "variant"
      | "variantMapping"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SheetAddressContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const ListContainer: import("@emotion/styled").StyledComponent<
  import("@mui/material").ListOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >,
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "dense"
      | "disablePadding"
      | "subheader"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const BookmarksListContainer: import("@emotion/styled").StyledComponent<
  import("@mui/material").ListOwnProps &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >,
      | "children"
      | "sx"
      | "style"
      | "className"
      | "classes"
      | "dense"
      | "disablePadding"
      | "subheader"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const BookmarkButtonContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const EmptyContainer: import("@emotion/styled").StyledComponent<
  import("@mui/system").BoxOwnProps<import("@mui/material").Theme> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const ValidationAlert: import("@emotion/styled").StyledComponent<
  import("@mui/material").AlertProps &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const OptionsMenuButton: import("@emotion/styled").StyledComponent<
  import("@mui/material").IconButtonOwnProps &
    Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> &
    import("@mui/material/OverridableComponent").CommonProps &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      | "color"
      | "children"
      | "sx"
      | "style"
      | "className"
      | "tabIndex"
      | "classes"
      | "action"
      | "size"
      | "disabled"
      | "centerRipple"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "TouchRippleProps"
      | "touchRippleRef"
      | "disableFocusRipple"
      | "edge"
      | "loading"
      | "loadingIndicator"
    > &
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export {};
