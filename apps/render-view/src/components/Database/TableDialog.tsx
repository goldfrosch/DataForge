import { useState } from "react";
import { Popup } from "@/components/@Common/Popup/Popup";
import { Button } from "@/components/@Common/Button/Button";
import * as styles from "./TableDialog.css";
import { usePopup } from "@/hooks/UsePopup.hook";
import { POPUP_STATE } from "@/hooks/UseStore.hook";
import { useInvalidateTablesHook } from "@/hooks/UseElectronEvent.hook";

interface TableDialogProps {
  projectPath: string;
}

export function TableDialog({ projectPath }: TableDialogProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentPopup, pop } = usePopup();
  const { invalidateTables } = useInvalidateTablesHook(projectPath);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && projectPath) {
      setIsLoading(true);
      try {
        await window.electronEvent.createTable(projectPath, name.trim());
        invalidateTables();
        setName("");
        pop();
      } catch (error) {
        console.error("Failed to create table:", error);
        // alert("테이블 생성에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    pop();
  };

  return (
    <Popup
      isOpen={currentPopup === POPUP_STATE.DATABASE_ADD_TABLE_POPUP}
      onClose={handleClose}
      title="Add New Table"
      closeOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="table-name" className={styles.label}>
            Table Name
          </label>
          <input
            type="text"
            id="table-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., users, products, orders"
            className={styles.input}
            autoFocus
          />
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="none" size="m" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="m"
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create Table"}
          </Button>
        </div>
      </form>
    </Popup>
  );
}
