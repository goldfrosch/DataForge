import type { IProject } from "@/types/Project.type";
import { create } from "zustand";

export const POPUP_STATE = {
  DATABASE_ADD_TABLE_POPUP: "DATABASE_ADD_TABLE_POPUP",
  ADD_PROJECT_POPUP: "ADD_PROJECT_POPUP",
  RENAME_PROJECT_POPUP: "RENAME_PROJECT_POPUP",
  DELETE_PROJECT_POPUP: "DELETE_PROJECT_POPUP",
  EMPTY: "EMPTY",
} as const;

export type PopupState = (typeof POPUP_STATE)[keyof typeof POPUP_STATE];

interface IProjectState {
  initialized: boolean;
  projectObject: { [uuid: string]: IProject };
  addProject: (project: IProject) => void;
  initialProject: (initialValue: IProject[]) => void;
}

interface IPopupState {
  popupStates: PopupState[];
  popupContext: IProject | null;
  pushPopup: (
    popupState: PopupState,
    isReplace: boolean,
    context?: IProject | null,
  ) => void;
  popPopup: () => void;
}

export const useProjectStore = create<IProjectState>((set) => ({
  initialized: false,
  projectObject: {},
  addProject: (project) =>
    set((state) => ({
      projectObject: { ...state.projectObject, [project.uuid]: project },
    })),
  initialProject: (initialValue) =>
    set(() => ({
      initialized: true,
      projectObject: {
        ...initialValue.reduce((prev, cur) => {
          return { ...prev, [cur.uuid]: cur };
        }, {}),
      },
    })),
}));

export const usePopupStore = create<IPopupState>((set) => ({
  popupStates: [],
  popupContext: null,
  pushPopup: (popupState, isReplace, context) =>
    set((state) => {
      const newPopupStates = [...state.popupStates];
      if (isReplace) {
        newPopupStates.pop();
      }
      return {
        popupStates: [...newPopupStates, popupState],
        popupContext: context !== undefined ? context : state.popupContext,
      };
    }),
  popPopup: () =>
    set((state) => ({
      popupStates: state.popupStates.slice(0, -1),
      popupContext: null,
    })),
}));
