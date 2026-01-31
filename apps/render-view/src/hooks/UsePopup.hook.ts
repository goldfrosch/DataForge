import { POPUP_STATE, usePopupStore, type PopupState } from "./UseStore.hook";

export const usePopup = () => {
  const { popupStates, pushPopup, popPopup } = usePopupStore();
  const currentPopup = popupStates[0] ?? POPUP_STATE.EMPTY;

  const push = (popupState: PopupState, isReplace: boolean = false) => {
    pushPopup(popupState, isReplace);
  };

  const pop = () => {
    popPopup();
  };

  return {
    currentPopup,
    push,
    pop,
  };
};
