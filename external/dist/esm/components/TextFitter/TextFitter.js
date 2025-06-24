import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "@mui/material";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
const initialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
export const TextFitter = ({
  children,
  width = "100%",
  height,
  preserveAspectRatio = "xMinYMid meet",
  textStyle,
  svgStyle,
  cropTop,
  cropBottom,
  onFit,
}) => {
  const theme = useTheme();
  const textRef = useRef(null);
  const [viewBox, setViewBox] = useState(initialState);
  const [ref] = useInView({
    onChange(inView) {
      if (inView) {
        calculateBox();
      }
    },
  });
  const calculateBox = useCallback(() => {
    if (!textRef.current) {
      return;
    }
    const box = textRef.current.getBBox();
    if (cropTop) {
      box.y += box.height * cropTop;
      box.height -= box.height * cropTop;
    }
    if (cropBottom) {
      box.height -= box.height * cropBottom;
    }
    setViewBox(box);
    onFit?.();
  }, [cropBottom, cropTop, onFit]);
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useLayoutEffect(() => {
    calculateBox();
  }, [calculateBox, children]);
  useLayoutEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        calculateBox();
      });
    }
  }, [calculateBox]);
  return _jsxs("svg", {
    style: svgStyle,
    viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`,
    width: width,
    height: height,
    // height={
    //   textRect.height && maxHeight && textRect.height >= maxHeight
    //     ? maxHeight
    //     : height
    // }
    preserveAspectRatio: preserveAspectRatio,
    fill: theme.vars.palette.text.primary,
    ref: ref,
    children: [
      _jsx("title", { children: children }),
      _jsx("text", {
        x: 0,
        y: 0,
        style: textStyle,
        ref: textRef,
        children: children,
      }),
    ],
  });
};
//# sourceMappingURL=TextFitter.js.map
