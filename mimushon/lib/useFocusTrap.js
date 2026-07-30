import { useEffect, useRef } from "react";

/* useFocusTrap — accessibility helper for modal dialogs.
   When `active` is true it: moves focus into the dialog, keeps Tab/Shift+Tab
   cycling within it (so keyboard users can't tab behind the modal), and returns
   focus to the previously-focused element when the dialog closes. Attach the
   returned ref to the dialog container and give that container tabIndex={-1}
   so it can receive focus as a fallback. */
export function useFocusTrap(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const previouslyFocused = document.activeElement;
    const SELECTOR =
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      Array.from(node.querySelectorAll(SELECTOR)).filter((el) => el.offsetParent !== null);

    // Move focus into the dialog (first focusable, else the container itself).
    (focusables()[0] || node).focus();

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      // Restore focus to where it was before the dialog opened.
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [active]);

  return ref;
}
