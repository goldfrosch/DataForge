import { useState, useEffect } from "react";
import { Popup } from "@/components/@Common/Popup/Popup";
import { Button } from "@/components/@Common";
import * as styles from "./RenameProjectPopup.css";
import { POPUP_STATE } from "@/hooks/UseStore.hook";
import { usePopup } from "@/hooks/UsePopup.hook";

interface RenameProjectPopupProps {
  onClose?: () => void;
  projectName: string;
}

export function RenameProjectPopup({
  onClose,
  projectName,
}: RenameProjectPopupProps) {
  const { currentPopup, pop } = usePopup();
  const [value, setValue] = useState(projectName);

  // TODO: 좋은 코드 방식은 아니여서, 추후 바꿀 필요가 있음
  useEffect(() => {
    setValue(projectName);
  }, [projectName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      // 닫기는 호출부(onConfirm)에서 pop()으로 처리
    }
  };

  const handleClose = () => {
    onClose?.();
    pop();
  };

  return (
    <Popup
      isOpen={currentPopup === POPUP_STATE.RENAME_PROJECT_POPUP}
      onClose={handleClose}
      title="프로젝트 이름 수정"
      closeOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="rename-project-input" className={styles.label}>
            프로젝트 이름
          </label>
          <input
            id="rename-project-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.input}
            autoFocus
          />
        </div>
        <div className={styles.formActions}>
          <Button type="button" variant="none" size="m" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="m"
            disabled={!value.trim()}
          >
            저장
          </Button>
        </div>
      </form>
    </Popup>
  );
}
