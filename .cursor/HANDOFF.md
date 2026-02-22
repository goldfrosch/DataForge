# DataForge — Handoff 문서

이 문서는 **현재 구현 상태**와 **이어서 개발할 항목**을 정리한 것이다.  
전체 비전·목표·기능 요구사항은 [.cursor/project-description.md](.cursor/project-description.md)를 참고한다.

---

## 1. 현재까지 진행된 부분

### 1.1 앱 골격

- **Electron**: 메인 윈도우, 빌드/개발 분기, preload를 통한 IPC 노출
- **렌더러**: React + Vite + TypeScript, React Router, TanStack Query, Zustand, Vanilla Extract
- **윈도우**: 커스텀 타이틀바(최소화/최대화/닫기), `win:maximize-changed` 등 창 이벤트 연동

### 1.2 프로젝트 목록·추가·수정·삭제

- **설정 저장 위치**: `app.getPath("userData")` 아래 `dataforge-config.json`. 파일 없으면 `loadAllProjects` 시 빈 `{ projects: [] }`로 생성.
- **IPC**
  - `electron:loadAllProjects` → 프로젝트 목록 반환. **isConnect**는 config 값이 아니라 각 프로젝트 경로의 `.dataForge/status` 파일 존재 여부로 계산.
  - `electron:getConfigPath` → 설정 파일 전체 경로 반환 (개발 시 로그/확인용)
  - `electron:showOpenDirectoryDialog` → 폴더 선택 다이얼로그, 선택 경로 반환
  - `electron:addProject`(project) → config에 프로젝트 추가 + **프로젝트 폴더에 `.dataForge` 디렉터리 및 `status` 바이너리 파일 생성**
  - `electron:saveProjects`(config) → config 전체 덮어쓰기
- **UI**
  - 메인 페이지: 프로젝트 카드 리스트, **Add Project** / **Load Project** 버튼 → `AddProjectDialog` (폴더 선택 → 이름·엔진 타입 입력 → 추가)
  - **ProjectCard** 옵션: Dropdown(⋯) → "프로젝트 이름 수정", "삭제" → **UsePopup** 플로우로 `RENAME_PROJECT_POPUP` / `DELETE_PROJECT_POPUP` + **popupContext**(대상 프로젝트)
  - MainPage에서 `RenameProjectPopup`, `DeleteProjectConfirmPopup` 한 번만 렌더, `currentPopup`·`popupContext`·`pop()`으로 제어
- **상태**: `useProjectStore`로 프로젝트 객체 보관, 앱 로드 시 `initialProject(data?.projects)` 주입. `useSaveProjectsMutation`으로 이름 수정·삭제 후 config 저장 및 목록 무효화.

### 1.3 프로젝트 연결 상태(isConnect)

- **규칙**: 프로젝트 디렉터리 내 `.dataForge/status` 파일이 **있으면** `isConnect: true`, **없으면** `false`.
- **프로젝트 추가 시**: `addProject`에서 해당 경로에 `.dataForge` 폴더와 `status` 바이너리(매직+버전) 생성.
- **목록 조회 시**: `loadAllProjects`가 config의 각 프로젝트에 대해 위 경로 존재 여부를 보고 isConnect 설정.

### 1.4 데이터베이스(프로젝트) 화면·테이블

- **라우트**: `/database/:uuid`, `useParams()`로 프로젝트 식별. 테이블 선택은 쿼리 `?table=테이블이름`.
- **레이아웃**: 좌측 `DatabaseSelectAside` + 메인 영역.
- **Aside**
  - 뒤로가기(All Databases), 프로젝트 이름/경로
  - **테이블 목록**: `useGetTablesHook(projectPath)`로 실제 테이블 목록 표시, 클릭 시 `setSearchParams({ table: tableName })`
  - "테이블 추가" → `TableDialog` (POPUP_STATE.DATABASE_ADD_TABLE_POPUP)
- **테이블 데이터**
  - **저장 구조**: DB 단위 단일 바이너리 `.dataForge/database` (매직 + 버전 + MessagePack 직렬화). 테이블 메타·컬럼·행이 한 파일에 저장. 기존 `database.json` + `tables/*.json` 이 있으면 첫 읽기 시 자동 마이그레이션.
  - **IPC**: `getTables`, `getTableData`, `saveTableData`, `createTable`. 경로는 모두 `.dataForge` 기준 통일.
- **TableEditor** (메인 영역, `?table=` 있을 때): 컬럼 정의(이름·타입·삭제), 행 추가·셀 편집, Save로 `saveTableData` 호출.
- **TableDialog**: 테이블 이름 입력 → `createTable` → `useInvalidateTablesHook`로 목록 갱신.

### 1.5 공통 컴포넌트·팝업 플로우

- **@Common**: Button(variant: primary/none), Chip, Titlebar, **Dropdown**(trigger + items), Popup(타이틀·닫기·children).
- **팝업 상태**: `UseStore.hook`의 `POPUP_STATE`(ADD_PROJECT, DATABASE_ADD_TABLE, RENAME_PROJECT, DELETE_PROJECT, EMPTY), `popupStates` 스택, **popupContext**(IProject | null).
- **UsePopup**: `currentPopup`, `popupContext`, `push(state, isReplace?, context?)`, `pop()`. 이름 수정/삭제는 `push(..., project)`로 context 전달.

### 1.6 훅·캐시 무효화

- **UseElectronEvent.hook**: `useLoadAllProjectsHook`, `useGetTablesHook`, `useGetTableDataHook`, `useAddProjectMutation`, `useSaveProjectsMutation`, `useSaveTableDataMutation`, `useInvalidateTablesHook`, `useInvalidateProjectsHook`.  
- **규칙**: `useQueryClient()`는 컴포넌트/페이지에서 직접 쓰지 않고, 무효화는 위 훅으로만 수행.

### 1.7 백엔드(IPC) 요약

| 핸들러 | 설명 |
|--------|------|
| electron:getConfigPath | 설정 파일 경로 반환 |
| electron:loadAllProjects | userData/dataforge-config.json 읽기, isConnect는 .dataForge/status 존재 여부로 계산 |
| electron:saveProjects | config 덮어쓰기 |
| electron:showOpenDirectoryDialog | 폴더 선택 다이얼로그 |
| electron:addProject | config 추가 + 프로젝트 경로에 .dataForge/status 생성 |
| electron:createTable | .dataForge/database 바이너리에 빈 테이블(columns/rows 빈 배열) 추가 |
| electron:getTables | .dataForge/database 바이너리에서 테이블 목록(메타) 반환 |
| electron:getTableData | .dataForge/database 바이너리에서 해당 테이블 columns, rows 반환 |
| electron:saveTableData | .dataForge/database 바이너리 내 해당 테이블 데이터 갱신 후 저장 |
| win:* | minimize, toggleMaximize, isMaximized, close, maximize-changed |

---

## 2. 이어서 개발할 부분

### 2.1 코드베이스 TODO (main.tsx 등)

1. **자동 id** — row 식별용 자동 id 생성·관리
2. **테이블 컬럼 중 table 참조** — 컬럼 타입으로 다른 테이블 참조, 참조 무결성
3. **테이블 XLSX export** — 선택 테이블/전체 XLSX 내보내기
4. **프로젝트 사용 시 Unreal/Unity 프로젝트 설정** — 우선 Unreal
5. **테이블 컬럼에서 class/blueprint 주입** — 엔진 특화 타입

### 2.2 project-description.md 기준 미구현

- **4.1 Schema System**: 스키마 소스, 필드 타입/Required/Default/Range/Enum/Array·Map, 스키마 버전 관리
- **4.2 Data Editing Layer**: 타입별 셀 에디터(Enum, Asset Picker 등), Virtual Scroll
- **4.3 Validation Engine**: 타입 검증, 필수값, Row Key 중복, 참조 존재, Import 전 검증
- **4.4 Local Version Control**: Snapshot, Diff, Commit, Rollback, Branch
- **3.3 Export**: CSV/JSON Export (XLSX는 TODO)
- **3.4 Engine Asset Reference**: Unreal/Unity 에셋 탐색·참조

---

## 3. 권장 진행 순서

1. **테이블 고급 기능** — 자동 id, 테이블 참조 컬럼, XLSX export
2. **Schema·Validation** — 스키마 정의·버전, 저장/Import 전 검증
3. **Grid 고급 UI** — 셀 에디터, Virtual Scroll
4. **엔진 연동·버전 관리** — Unreal/Unity 설정, 에셋 참조, 스냅샷/커밋

---

## 4. 참고

- **프로젝트 설명**: [.cursor/project-description.md](.cursor/project-description.md)
- **React/프론트 규칙**: [.cursor/skills/frontend/react-coding-standard.md](.cursor/skills/frontend/react-coding-standard.md)
- **Electron 메인**: `apps/electron/src/main.ts`
- **팝업·context**: `apps/render-view/src/hooks/UseStore.hook.ts` (POPUP_STATE, popupContext), `UsePopup.hook.ts`
- **테이블 에디터**: `apps/render-view/src/components/Database/TableEditor/TableEditor.tsx`
- **프로젝트 팝업**: `RenameProjectPopup`, `DeleteProjectConfirmPopup` (MainPage에서 렌더), `AddProjectDialog`
