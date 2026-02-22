/**
 * 프로젝트·설정 관련 IPC (config, load/save projects, add project, 폴더 선택 다이얼로그).
 */

import { ipcMain, dialog } from "electron";
import type { BrowserWindow } from "electron";
import path from "node:path";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import type { ConfigType, ProjectType } from "../types/config.type";
import {
  getConfigPath,
  getProjectStatusPath,
  STATUS_FILE_BINARY,
  DATAFORGE_DIR,
} from "../config";

export function registerProjectIpc(win: BrowserWindow | null): void {
  ipcMain.handle("electron:ping", () => {
    console.log("pong!");
  });

  ipcMain.handle("electron:getConfigPath", (): string => getConfigPath());

  ipcMain.handle("electron:loadAllProjects", async (): Promise<ConfigType> => {
    const configPath = getConfigPath();
    const initial: ConfigType = { projects: [] };

    if (!existsSync(configPath)) {
      const dir = path.dirname(configPath);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(configPath, JSON.stringify(initial, null, 2), "utf-8");
      if (process.env.MODE !== "build") {
        console.log("[DataForge] config created:", configPath);
      }
      return initial;
    }
    let config: ConfigType;
    try {
      const raw = await readFile(configPath, "utf-8");
      config = JSON.parse(raw) as ConfigType;
    } catch {
      return initial;
    }
    const projects = config.projects.map((p) => ({
      ...p,
      isConnect: existsSync(getProjectStatusPath(p.projectPath)),
    }));
    return { projects };
  });

  ipcMain.handle(
    "electron:saveProjects",
    async (_, config: ConfigType): Promise<void> => {
      const configPath = getConfigPath();
      const dir = path.dirname(configPath);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
    },
  );

  ipcMain.handle(
    "electron:showOpenDirectoryDialog",
    async (): Promise<string | null> => {
      const result = await dialog.showOpenDialog(win!, {
        properties: ["openDirectory"],
        title: "Select project folder",
      });
      if (result.canceled || result.filePaths.length === 0) return null;
      return result.filePaths[0];
    },
  );

  ipcMain.handle(
    "electron:addProject",
    async (
      _,
      project: Omit<ProjectType, "uuid" | "tableCount"> & { uuid?: number },
    ): Promise<ConfigType> => {
      const configPath = getConfigPath();
      let config: ConfigType = { projects: [] };
      if (existsSync(configPath)) {
        try {
          const raw = await readFile(configPath, "utf-8");
          config = JSON.parse(raw) as ConfigType;
        } catch {
          config = { projects: [] };
        }
      }
      const maxUuid =
        config.projects.length > 0
          ? Math.max(...config.projects.map((p) => p.uuid))
          : 0;
      const newProject: ProjectType = {
        projectName: project.projectName,
        projectPath: project.projectPath,
        type: project.type,
        isConnect: true,
        uuid: project.uuid ?? maxUuid + 1,
        tableCount: 0,
      };
      config.projects.push(newProject);

      const dir = path.dirname(configPath);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");

      const dataForgeDir = path.join(project.projectPath, DATAFORGE_DIR);
      if (!existsSync(dataForgeDir)) {
        await mkdir(dataForgeDir, { recursive: true });
      }
      const statusPath = getProjectStatusPath(project.projectPath);
      await writeFile(statusPath, STATUS_FILE_BINARY);

      return {
        projects: config.projects.map((p) => ({
          ...p,
          isConnect: existsSync(getProjectStatusPath(p.projectPath)),
        })),
      };
    },
  );
}
