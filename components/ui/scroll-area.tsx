type ScrollAreaType = {
  children?: React.ReactNode;
  maxWidth?: number | string;
  maxHeight?: number | string;
  height?: number | string;
  width?: number | string;
  minHeight?: number | string;
  ref?: React.Ref<HTMLDivElement> | undefined;
  pb?: number;
};

const ScrollArea = ({
  children,
  maxHeight,
  maxWidth,
  height,
  ref,
  minHeight,
  pb,
  width,
}: ScrollAreaType) => {
  return (
    <div
      ref={ref}
      className={`overflow-y-scroll 
          overscroll-none
           overflow-x-hidden`}
      style={{
        width,
        minHeight,
        height,
        maxHeight,
        maxWidth,
        paddingBottom: pb,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
