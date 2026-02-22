import { POPUP_STATE, usePopupStore, type PopupState } from "./UseStore.hook";
import type { IProject } from "@/types/Project.type";

export const usePopup = () => {
  const { popupStates, pushPopup, popPopup, popupContext } = usePopupStore();
  const currentPopup = popupStates[0] ?? POPUP_STATE.EMPTY;

  const push = (
    popupState: PopupState,
    isReplace: boolean = false,
    context?: IProject | null,
  ) => {
    pushPopup(popupState, isReplace, context);
  };

  const pop = () => {
    popPopup();
  };

  return {
    currentPopup,
    popupContext,
    push,
    pop,
  };
};
