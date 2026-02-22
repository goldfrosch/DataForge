# DataForge — Handoff 문서

이 문서는 **현재 구현 상태**와 **이어서 개발할 항목**을 정리한 것이다.  
전체 비전·목표·기능 요구사항은 [.cursor/project-description.md](.cursor/project-description.md)를 참고한다.

---

## 1. 현재까지 진행된 부분

### 1.1 앱 골격

- **Electron**: 메인 윈도우, 빌드/개발 분기, preload를 통한 IPC 노출
- **렌더러**: React + Vite + TypeScript, React Router, TanStack Query, Zustand, Vanilla Extract
- **윈도우**: 커스텀 타이틀바(최소화/최대화/닫기), `win:maximize-changed` 등 창 이벤트 연동

### 1.2 프로젝트(데이터베이스) 목록

- **설정**: Electron 메인에서 `config.json` 읽어 프로젝트 목록 제공
- **IPC**: `electron:loadAllProjects` → `ConfigType` (projects 배열) 반환
- **UI**: 메인 페이지에서 프로젝트 카드 리스트 표시, 카드 클릭 시 `/database/:uuid` 이동
- **상태**: `UseStore.hook`의 `useProjectStore`로 프로젝트 객체 보관, 앱 로드 시 `initialProject`로 주입

### 1.3 데이터베이스(프로젝트) 화면

- **라우트**: `/database/:uuid`, `useParams()`로 프로젝트 식별
- **레이아웃**: 좌측 `DatabaseSelectAside` + 메인 영역
- **Aside**: 뒤로가기(All Databases), 프로젝트 이름/경로 표시, 테이블 목록 헤더 + “테이블 추가” 버튼, Settings 버튼
- **테이블 추가**: `TableDialog` 팝업에서 테이블 이름 입력 후 생성
  - IPC `electron:createTable(projectPath, tableName)` 호출
  - 프로젝트 경로 아래 `.dataForge/database.json`에 `tables[]` 유지, 새 테이블(`name`, `createdAt`) 추가

### 1.4 백엔드(IPC) 상태

- **구현된 핸들러**
  - `electron:loadAllProjects` — config.json 기반 프로젝트 목록
  - `electron:createTable` — `.dataForge/database.json`에 테이블 추가
  - `electron:getTables` — 테이블 목록 반환 (아래 버그 참고)
- **데이터 구조**: `TableType` { name, createdAt }, `DatabaseJsonType` { tables }

### 1.5 알려진 이슈

- **테이블 목록 경로 불일치**: `createTable`은 `projectPath + ".dataForge"`를 쓰는데, `getTables`는 `projectPath + "dataForge"`(앞에 점 없음)를 사용함. 테이블 목록을 실제로 불러오려면 둘을 동일하게 맞춰야 함 (권장: `.dataForge`).

---

## 2. 이어서 개발할 부분

### 2.1 코드베이스 TODO (render-view)

`apps/render-view/src/main.tsx`에 적힌 항목:

1. **프로젝트를 통해 테이블 리스트 접근**
   - Aside의 테이블 목록을 하드코딩이 아닌 `getTables(projectPath)` 결과로 표시
   - `getTables` 경로 버그 수정 후, 훅(예: `useGetTables`)으로 불러와 Aside에 연동

2. **테이블 row / column 정의**
   - 테이블별 스키마(컬럼 타입, 이름) 및 row 데이터 모델 설계
   - UI: 컬럼 추가·편집, row 추가·삭제 (또는 스키마 먼저, 그다음 데이터)

3. **자동 id**
   - row 식별용 자동 id 생성·관리 (스키마/저장 형식에 반영)

4. **테이블 컬럼 중 table 참조**
   - 컬럼 타입으로 “다른 테이블 참조” 지원, 참조 무결성 등

5. **테이블 XLSX export**
   - 선택 테이블(또는 전체)을 XLSX로 내보내기 (project-description의 3.3 Export 요구사항 일부)

6. **프로젝트 사용 시 Unreal/Unity 프로젝트 설정**
   - 우선 Unreal; 프로젝트 타입별 설정 화면 또는 설정 저장 구조

7. **테이블 컬럼에서 class/blueprint 주입**
   - Unreal 등 엔진 특화 타입(클래스, 블루프린트)을 컬럼 타입으로 지원 (3.4 Engine Asset Reference와 연결)

### 2.2 project-description.md 기준 미구현

- **4.1 Schema System**: 스키마 소스(엔진 리플렉션, JSON Schema, 코드 정의), 필드 타입/Required/Default/Range/Enum/Array·Map, 스키마 버전 관리 — 전부 미구현.
- **4.2 Data Editing Layer**: Grid 기반 편집 UI, 타입별 셀 에디터(Enum, Asset Picker, Boolean, Number Range), Virtual Scroll — 미구현.
- **4.3 Validation Engine**: 타입 검증, 필수값/Row Key 중복/참조 존재/스키마 불일치, Import 전 검증 — 미구현.
- **4.4 Local Version Control**: Snapshot, Diff, Commit, Rollback, Branch — 문서에 “내부 모델”만 있고 구현 없음.
- **3.3 Export**: CSV/XLSX/JSON Export — TODO에 XLSX만 명시됨, CSV·JSON은 추후.
- **3.4 Engine Asset Reference**: Unreal(Asset Registry, SoftObjectPath, TSubclassOf 등), Unity(GUID, ScriptableObject 등) — 미구현.

---

## 3. 권장 진행 순서

1. **테이블 목록 연동**
   - `getTables` 경로를 `.dataForge`로 통일
   - render-view에서 `getTables` 호출 훅 추가 후 DatabaseSelectAside에 테이블 리스트 표시

2. **테이블 스키마·데이터 모델**
   - `.dataForge` 아래 스키마/테이블 데이터 파일 형식 정의 (예: schema.json + per-table json 또는 단일 database 확장)
   - row/column 타입, 자동 id 설계

3. **Grid 기반 편집 UI (4.2)**
   - 선택한 테이블에 대한 스프레드시트형 그리드, 셀 편집, 필요 시 Virtual Scroll

4. **Schema 시스템 (4.1)**
   - 스키마 정의·버전·타입 제한을 코드/설정에 반영

5. **Validation (4.3)**
   - 저장/Import 전 검증 파이프라인

6. **Export (3.3)**
   - XLSX → CSV, JSON 순으로 확장

7. **엔진 연동·버전 관리 (3.4, 4.4)**
   - Unreal/Unity 설정 및 에셋 참조, 이후 로컬 버전 관리(스냅샷, 커밋 등)

---

## 4. 참고

- **프로젝트 설명**: [.cursor/project-description.md](.cursor/project-description.md)
- **React/프론트 규칙**: [.cursor/skills/frontend/react-coding-standard.md](.cursor/skills/frontend/react-coding-standard.md)
- **Electron 메인**: `apps/electron/src/main.ts` — IPC 핸들러, `config.json` 경로, `.dataForge` vs `dataForge` 경로 확인
- **테이블 목록 UI**: `apps/render-view/src/components/Database/DatabaseSelectAside.tsx` — 현재 하드코딩된 테이블 영역을 API 연동 지점으로 보면 됨
