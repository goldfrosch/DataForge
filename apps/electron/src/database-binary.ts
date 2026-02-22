/**
 * DB 단위 단일 바이너리 저장.
 * - 파일: .dataForge/database (매직 + 버전 + MessagePack payload)
 * - 기존 database.json + tables/*.json 이 있으면 첫 읽기 시 마이그레이션 후 바이너리 사용.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { encode, decode } from "@msgpack/msgpack";
import type {
  TableType,
  ColumnType,
  TableDataRowType,
  TableDataJsonType,
} from "./types/config.type";

const DATAFORGE_DIR = ".dataForge";
const DATABASE_BINARY_FILE = "database";
const LEGACY_DATABASE_JSON = "database.json";
const LEGACY_TABLES_DIR = "tables";

/** 바이너리 파일 매직: "DFDB" (DataForge Database) */
const MAGIC = Buffer.from([0x44, 0x46, 0x44, 0x42]);
const VERSION = 1;

/** 디스크에 저장되는 테이블 한 덩어리 (메타 + 데이터) */
export type PersistedTableBlock = {
  name: string;
  createdAt: string;
  columns: ColumnType[];
  rows: TableDataRowType[];
};

/** 바이너리 파일 전체 payload */
export type DatabaseBinaryPayload = {
  tables: PersistedTableBlock[];
};

function getDataForgePath(projectPath: string): string {
  return path.join(projectPath, DATAFORGE_DIR);
}

export function getDatabaseBinaryPath(projectPath: string): string {
  return path.join(getDataForgePath(projectPath), DATABASE_BINARY_FILE);
}

function getLegacyDatabaseJsonPath(projectPath: string): string {
  return path.join(getDataForgePath(projectPath), LEGACY_DATABASE_JSON);
}

function getLegacyTableJsonPath(
  projectPath: string,
  tableName: string,
): string {
  const sanitized = tableName.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(
    getDataForgePath(projectPath),
    LEGACY_TABLES_DIR,
    `${sanitized}.json`,
  );
}

/** 바이너리 파일 읽기 → payload 반환. 없으면 null. */
export async function readDatabaseBinary(
  projectPath: string,
): Promise<DatabaseBinaryPayload | null> {
  const filePath = getDatabaseBinaryPath(projectPath);
  if (!existsSync(filePath)) {
    return null;
  }
  const buf = await readFile(filePath);
  if (buf.length < MAGIC.length + 1) {
    return null;
  }
  if (buf.subarray(0, MAGIC.length).compare(MAGIC) !== 0) {
    return null;
  }
  const version = buf[MAGIC.length];
  if (version !== VERSION) {
    return null;
  }
  const payloadBytes = buf.subarray(MAGIC.length + 1);
  const payload = decode(payloadBytes) as DatabaseBinaryPayload;
  if (!payload || !Array.isArray(payload.tables)) {
    return { tables: [] };
  }
  return payload;
}

/** payload를 바이너리로 저장. */
export async function writeDatabaseBinary(
  projectPath: string,
  payload: DatabaseBinaryPayload,
): Promise<void> {
  const dir = getDataForgePath(projectPath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  const payloadBytes = encode(payload);
  const header = Buffer.alloc(MAGIC.length + 1);
  MAGIC.copy(header, 0);
  header[MAGIC.length] = VERSION;
  const filePath = getDatabaseBinaryPath(projectPath);
  await writeFile(filePath, Buffer.concat([header, Buffer.from(payloadBytes)]));
}

/**
 * DB 전체 로드. 바이너리 없고 JSON 있으면 마이그레이션 후 바이너리 저장하고 반환.
 */
export async function loadDatabase(
  projectPath: string,
): Promise<DatabaseBinaryPayload> {
  let payload = await readDatabaseBinary(projectPath);
  return payload ?? { tables: [] };
}

/** 테이블 목록만 반환 (메타) */
export function getTablesFromPayload(
  payload: DatabaseBinaryPayload,
): TableType[] {
  return payload.tables.map((t) => ({ name: t.name, createdAt: t.createdAt }));
}

/** 특정 테이블 데이터 반환 */
export function getTableDataFromPayload(
  payload: DatabaseBinaryPayload,
  tableName: string,
): TableDataJsonType | null {
  const nameNorm = tableName.replace(/[^a-zA-Z0-9_-]/g, "_");
  const block = payload.tables.find(
    (t) =>
      t.name === tableName ||
      t.name.replace(/[^a-zA-Z0-9_-]/g, "_") === nameNorm,
  );
  if (!block) return null;
  return { columns: block.columns, rows: block.rows };
}

/** 특정 테이블 데이터 갱신 후 저장 */
export async function saveTableDataInDatabase(
  projectPath: string,
  tableName: string,
  data: TableDataJsonType,
): Promise<void> {
  const payload = await loadDatabase(projectPath);
  const nameNorm = tableName.replace(/[^a-zA-Z0-9_-]/g, "_");
  const idx = payload.tables.findIndex(
    (t) =>
      t.name === tableName ||
      t.name.replace(/[^a-zA-Z0-9_-]/g, "_") === nameNorm,
  );
  if (idx >= 0) {
    payload.tables[idx].columns = data.columns;
    payload.tables[idx].rows = data.rows;
  } else {
    payload.tables.push({
      name: tableName,
      createdAt: new Date().toISOString(),
      columns: data.columns,
      rows: data.rows,
    });
  }
  await writeDatabaseBinary(projectPath, payload);
}

/** 새 테이블 추가 후 저장 */
export async function createTableInDatabase(
  projectPath: string,
  tableName: string,
): Promise<TableType[]> {
  const payload = await loadDatabase(projectPath);
  const newBlock: PersistedTableBlock = {
    name: tableName,
    createdAt: new Date().toISOString(),
    columns: [],
    rows: [],
  };
  payload.tables.push(newBlock);
  await writeDatabaseBinary(projectPath, payload);
  return getTablesFromPayload(payload);
}
