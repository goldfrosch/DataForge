import { useQuery } from "@tanstack/react-query";

const ELECTRON_EVENT_HOOK_KEY = {
  loadAllProjects: "loadAllProjects",
} as const;

export const useLoadAllProjectsHook = () =>
  useQuery({
    queryKey: [ELECTRON_EVENT_HOOK_KEY.loadAllProjects],
    queryFn: () => window.electronEvent.loadAllProjects(),
  });
