/**
 * 앱·프로젝트 경로 및 상수.
 */

import { app } from "electron";
import path from "node:path";

export const DATAFORGE_DIR = ".dataForge";
export const STATUS_FILE = "status";

/** 프로젝트 루트 내 .dataForge/status 바이너리 파일 경로. 이 파일 존재 여부로 isConnect 판단. */
export function getProjectStatusPath(projectPath: string): string {
  return path.join(projectPath, DATAFORGE_DIR, STATUS_FILE);
}

/** 프로젝트 추가 시 .dataForge/status에 쓸 바이너리 (버전 식별용 매직 + 버전 1). */
export const STATUS_FILE_BINARY = Buffer.from([0x44, 0x46, 0x30, 0x31, 0x01]);

/**
 * 프로젝트 목록이 저장되는 설정 파일 경로.
 * - Windows: %APPDATA%\<app name>\dataforge-config.json
 * - macOS: ~/Library/Application Support/<app name>/dataforge-config.json
 * - Linux: ~/.config/<app name>/dataforge-config.json
 */
export function getConfigPath(): string {
  return path.join(app.getPath("userData"), "dataforge-config.json");
}
