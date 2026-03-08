import { useCallback, useEffect, useRef, useState } from "react";

function useAnchoredDropdown({ anchorRef, isOpen, onClose }: { anchorRef: React.RefObject<HTMLButtonElement | null>; isOpen: boolean; onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  }, [anchorRef]);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDropdown = dropdownRef.current?.contains(target);
      const clickedAnchor = anchorRef.current?.contains(target);
      if (!clickedDropdown && !clickedAnchor) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [anchorRef, isOpen, onClose]);

  return { dropdownRef, position };
}

export { useAnchoredDropdown };
