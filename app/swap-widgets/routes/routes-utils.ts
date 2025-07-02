"use client";
function NavigateBack() {
  if (typeof window != undefined) {
    window.history.back();
  }
}

function Navigate(path: string) {
  window.location.hash = path;
}

export { NavigateBack, Navigate };
