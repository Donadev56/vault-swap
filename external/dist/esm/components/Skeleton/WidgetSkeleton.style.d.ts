export declare const SkeletonHeaderAppBar: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonWalletMenuButtonContainer: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonCardRow: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonAmountContainer: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonCard: import("@emotion/styled").StyledComponent<
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
    import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>,
  {},
  {}
>;
export declare const SkeletonInputCard: import("@emotion/styled").StyledComponent<
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
      import("../Card/Card.js").CardProps,
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
export declare const SkeletonReviewButtonContainer: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonReviewButton: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonSendToWalletButton: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonPoweredByContainer: import("@emotion/styled").StyledComponent<
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
export declare const SkeletonHeaderContainer: import("@emotion/styled").StyledComponent<
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
