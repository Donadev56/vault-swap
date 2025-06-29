"use client";
export function NavigateBack() {
  if (typeof window != undefined) {
    window.history.back();
  }
}
