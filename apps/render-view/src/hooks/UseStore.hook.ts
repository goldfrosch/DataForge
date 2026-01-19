import type { IProject } from "@/types/Project.type";
import { create } from "zustand";

interface IProjectState {
  initialized: boolean;
  projectObject: { [uuid: string]: IProject };
  addProject: (project: IProject) => void;
  initialProject: (initialValue: IProject[]) => void;
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
