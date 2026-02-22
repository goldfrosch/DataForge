import { Popup } from "@/components/@Common/Popup/Popup";
import { Button } from "@/components/@Common";
import * as styles from "./DeleteProjectConfirmPopup.css";
import { POPUP_STATE } from "@/hooks/UseStore.hook";
import { usePopup } from "@/hooks/UsePopup.hook";

interface DeleteProjectConfirmPopupProps {
  projectName: string;
}

export function DeleteProjectConfirmPopup({
  projectName,
}: DeleteProjectConfirmPopupProps) {
  const { currentPopup, pop } = usePopup();

  const handleConfirm = () => {
    // 닫기는 호출부(onConfirm)에서 pop()으로 처리
  };

  const handleClose = () => {
    pop();
  };

  return (
    <Popup
      isOpen={currentPopup === POPUP_STATE.DELETE_PROJECT_POPUP}
      onClose={handleClose}
      title="프로젝트 삭제"
      closeOnOverlayClick={false}
    >
      <p className={styles.message}>
        「{projectName}」을(를) 목록에서 삭제할까요?
      </p>
      <div className={styles.actions}>
        <Button type="button" variant="none" size="m" onClick={handleClose}>
          취소
        </Button>
        <Button
          type="button"
          variant="primary"
          size="m"
          onClick={handleConfirm}
        >
          삭제
        </Button>
      </div>
    </Popup>
  );
}
