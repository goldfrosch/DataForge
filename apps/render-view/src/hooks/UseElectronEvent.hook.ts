import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITableData } from "@/types/TableData.type";
export const ELECTRON_EVENT_HOOK_KEY = {
  loadAllProjects: "loadAllProjects",
  getTables: "getTables",
  getTableData: "getTableData",
} as const;

export const useLoadAllProjectsHook = () =>
  useQuery({
    queryKey: [ELECTRON_EVENT_HOOK_KEY.loadAllProjects],
    queryFn: () => window.electronEvent.loadAllProjects(),
  });

export const useInvalidateProjectsHook = () => {
  const queryClient = useQueryClient();
  return {
    invalidateProjects: () =>
      queryClient.invalidateQueries({
        queryKey: [ELECTRON_EVENT_HOOK_KEY.loadAllProjects],
      }),
  };
};

export const useAddProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: {
      projectName: string;
      projectPath: string;
      type: "unreal" | "unity";
      isConnect?: boolean;
    }) => window.electronEvent.addProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ELECTRON_EVENT_HOOK_KEY.loadAllProjects],
      });
    },
  });
};

export const useGetTablesHook = (projectPath: string) =>
  useQuery({
    queryKey: [ELECTRON_EVENT_HOOK_KEY.getTables, projectPath],
    queryFn: () => window.electronEvent.getTables(projectPath),
    enabled: !!projectPath,
  });

/** 테이블 목록 캐시 무효화 등 테이블 리스트 관련 부수 동작을 훅으로 제공. 컴포넌트에서 useQueryClient를 직접 쓰지 않고 이 훅을 사용한다. */
export const useInvalidateTablesHook = (projectPath: string) => {
  const queryClient = useQueryClient();
  return {
    invalidateTables: () =>
      queryClient.invalidateQueries({
        queryKey: [ELECTRON_EVENT_HOOK_KEY.getTables, projectPath],
      }),
  };
};

export const useGetTableDataHook = (
  projectPath: string,
  tableName: string | null,
) =>
  useQuery({
    queryKey: [
      ELECTRON_EVENT_HOOK_KEY.getTableData,
      projectPath,
      tableName ?? "",
    ],
    queryFn: () =>
      tableName
        ? window.electronEvent.getTableData(projectPath, tableName)
        : Promise.resolve(null),
    enabled: !!projectPath && !!tableName,
  });

export const useSaveTableDataMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectPath,
      tableName,
      data,
    }: {
      projectPath: string;
      tableName: string;
      data: ITableData;
    }) =>
      window.electronEvent.saveTableData(projectPath, tableName, data),
    onSuccess: (_, { projectPath, tableName }) => {
      queryClient.invalidateQueries({
        queryKey: [
          ELECTRON_EVENT_HOOK_KEY.getTableData,
          projectPath,
          tableName,
        ],
      });
    },
  });
};
