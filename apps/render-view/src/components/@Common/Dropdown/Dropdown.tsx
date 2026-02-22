import {
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";
import * as styles from "./Dropdown.css";
import classNames from "classnames";

export interface IDropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
}

interface DropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  items: IDropdownItem[];
}

export function Dropdown({
  open,
  onOpenChange,
  trigger,
  items,
}: DropdownProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  const triggerWithClick = isValidElement(trigger)
    ? cloneElement(
        trigger as React.ReactElement<{
          onClick?: (e: React.MouseEvent) => void;
        }>,
        {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const prev = (
              trigger as React.ReactElement<{
                onClick?: (e: React.MouseEvent) => void;
              }>
            ).props?.onClick;
            prev?.(e);
            onOpenChange(!open);
          },
        },
      )
    : trigger;

  return (
    <div className={styles.dropdownWrap} ref={wrapRef}>
      {triggerWithClick}
      {open && (
        <div className={styles.dropdownMenu}>
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              className={classNames(
                styles.dropdownItem,
                item.danger && styles.dropdownItemDanger,
              )}
              onClick={() => {
                item.onClick();
                onOpenChange(false);
              }}
            >
              {item.icon && (
                <span className={styles.dropdownItemIcon}>{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
