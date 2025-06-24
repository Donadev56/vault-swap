"use client";

import { Bot } from "lucide-react";
import React from "react";

export interface FloatingButtonStyle {
  style?: React.CSSProperties;
  backgroundColor?: string;
  color?: string;
  px?: number;
  py?: number;
  rounded?: number;
  className?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  iconSize?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  mx?: number;
  my?: number;
}

export interface FloatingButtonContainerType {
  children: React.ReactNode;
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

export const FloatingButtonContainer = ({
  children,
  top,
  left,
  bottom = 30,
  right = 10,
  className,
  style,
  zIndex = 99999,
}: FloatingButtonContainerType) => {
  return (
    <div
      style={{
        ...style,
        top,
        bottom,
        right,
        left,
        position: style?.position ?? "fixed",
        zIndex,
      }}
      className={`${className}`}
    >
      {children}
    </div>
  );
};

export const FloatingButton = ({
  style,
  backgroundColor = "#03fc84",
  color = "#000000",
  px = 10,
  py = 1,
  rounded = 50,
  className,
  width = 50,
  height = 50,
  children,
  iconSize = 30,
  onClick,
  mx = 10,
  my = 10,
}: FloatingButtonStyle) => {
  return (
    <div
      onClick={onClick as any}
      style={
        style ?? {
          backgroundColor,
          color,
          paddingBlock: py,
          paddingInline: px,
          borderRadius: rounded,
          width,
          height,
          marginBlock: my,
          marginInline: mx,
        }
      }
      className={`${className} justify-center flex items-center touch-opacity`}
    >
      {children ?? (
        <>
          {" "}
          <Bot color={color} size={iconSize} />
        </>
      )}
    </div>
  );
};
