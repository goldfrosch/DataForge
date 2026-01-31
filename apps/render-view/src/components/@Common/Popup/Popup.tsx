import classNames from "classnames";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import * as styles from "./Popup.css";
import { Button } from "../Button/Button";
import { X } from "lucide-react";

interface PopupProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export function Popup({
  isOpen,
  title,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: PopupProps) {
  const [defaultBody, setDefaultBody] = useState<HTMLElement | null>(() =>
    document.getElementById("default-body")
  );

  useEffect(() => {
    setDefaultBody(document.getElementById("default-body"));
  }, []);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (defaultBody) {
      if (isOpen) {
        defaultBody.style.overflow = "hidden";
      } else {
        defaultBody.style.overflow = "";
      }
    }

    return () => {
      if (defaultBody) {
        defaultBody.style.overflow = "";
      }
    };
  }, [isOpen, defaultBody]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!defaultBody) return null;

  return createPortal(
    <div className={classNames(styles.overlay)} onClick={handleOverlayClick}>
      <div className={classNames(styles.popup)}>
        <div className={classNames(styles.popupHeader)}>
          <h1 className={classNames(styles.popupTitle)}>{title}</h1>
          <Button variant="none" size="s" onClick={onClose}>
            <X className={classNames(styles.popupCloseIcon)} />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    defaultBody
  );
}
