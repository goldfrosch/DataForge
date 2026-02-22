# Forge — Game Data Authoring & Versioning Platform

---

# 1. Project Overview

## 1.1 Vision

Forge는 Unreal Engine 및 Unity에서 사용하는 구조화된 게임 데이터를  
엔진 외부에서 안전하게 관리, 검증, 버전 관리, 그리고 주입할 수 있도록 설계된 데이터 관리 애플리케이션이다.

이 프로젝트의 목표는 다음과 같다:

- Excel 의존성 제거
- 엔진 내부 DataTable / ScriptableObject 편집의 제약 해소
- Git과 유사한 데이터 버전 관리 시스템 제공
- 디자이너와 개발자 간 협업 효율 향상
- 엔진과 분리된 독립적인 데이터 Authoring 환경 구축

---

# 2. Core Principles

- Data should be treated like code.
- Schema must be explicit and versioned.
- Validation is mandatory, not optional.
- Version history must be traceable.
- Engine consumes data — it does not author it.

---

# 3. Core Objectives

## 3.1 Engine-Agnostic Data Management

Forge는 특정 엔진에 종속되지 않는 데이터 관리 시스템을 제공한다.

### Unreal Engine 지원 범위

- DataTable
- CurveTable
- DataAsset
- SoftObjectPath 기반 참조

### Unity 지원 범위

- ScriptableObject
- JSON 기반 데이터
- GUID 기반 에셋 참조

---

## 3.2 Local Data Versioning (Git-like Model)

Forge는 로컬 환경에서 Git과 유사한 데이터 상태 관리 시스템을 제공한다.

### 지원 개념

- Snapshot
- Diff
- Commit
- Rollback
- Branch (추후 확장 가능)

### 목표

"코드처럼 데이터를 관리한다."

---

## 3.3 Spreadsheet-Based Authoring

Forge는 Excel 스타일의 Grid 기반 데이터 편집 UI를 제공한다.

### 지원 기능

- 셀 단위 편집
- 타입 기반 자동 컬럼 생성
- CSV Export
- XLSX Export
- JSON Export
- 대용량 데이터 Virtual Scroll 지원

---

## 3.4 Engine Asset Reference System

Forge는 엔진 내부 에셋을 외부 툴에서 탐색하고 참조할 수 있어야 한다.

### Unreal 요구사항

- Asset Registry 기반 에셋 탐색
- 클래스 단위 필터링
- SoftObjectPath 자동 생성
- TSubclassOf 지원
- Enum / Struct 지원

### Unity 요구사항

- GUID 기반 참조
- ScriptableObject 타입 필터링
- Prefab / Material / Texture 탐색

---

# 4. Functional Requirements

## 4.1 Schema System

### Schema Source Options

- Engine Reflection 기반 Export
- JSON Schema 정의
- 코드 기반 구조 정의

### Schema 기능

- 필드 타입 정의
- Required 필드 설정
- Default 값 지원
- Range 제한
- Enum 지원
- Array / Map 지원
- 스키마 버전 관리

---

## 4.2 Data Editing Layer

- Grid 기반 UI
- 타입별 Custom Cell Editor
  - Enum Dropdown
  - Asset Picker
  - Boolean Toggle
  - Number Range 제한
- 대규모 데이터 성능 최적화

---

## 4.3 Validation Engine

- 타입 검증
- 필수 값 누락 검사
- Row Key 중복 검사
- 참조 에셋 존재 여부 확인
- 스키마 불일치 감지
- Import 전 Validation 강제 수행

---

## 4.4 Local Version Control System

### 내부 모델
