import React from "react";

export const Logo = ({
  style,
  className,
  color,
}: {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      version="1.2"
      viewBox="0 0 375 375"
      style={style}
      className={className}
    >
      <defs>
        <clipPath id="cccf8b58b8">
          <path d="M24 37h327v301H24Zm0 0"></path>
        </clipPath>
        <clipPath id="4eb27ca561">
          <path d="m158.688-34.047 240.93 151.414-183.352 291.75-240.93-151.414Zm0 0"></path>
        </clipPath>
        <clipPath id="26e8830d2d">
          <path d="m289.742 54.746 57.008 116.809a33.72 33.72 0 0 1-1.754 32.726L270.93 322.137a33.71 33.71 0 0 1-28.727 15.773l-129.976-.703a30.2 30.2 0 0 1-26.973-16.95L28.246 203.446A33.71 33.71 0 0 1 30 170.723l74.066-117.856a33.71 33.71 0 0 1 28.727-15.773l129.977.699a30.19 30.19 0 0 1 26.972 16.953m0 0"></path>
        </clipPath>
      </defs>
      <g id="6c67d81f44" clipPath="url(#cccf8b58b8)">
        <g clipPath="url(#4eb27ca561)">
          <g clipPath="url(#26e8830d2d)">
            <path
              fill={color ?? "#FFF"}
              d="m161.055-37.812 240.93 151.414-188.087 299.28-240.93-151.413Zm0 0"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
