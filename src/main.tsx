import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// TODO: 해야할 개발 내용
// 1. 프로젝트 통해 테이블 리스트로 접근하기
// 2. 테이블 row 및 column 종류 추가 기능
// 3. 자동 id 추가 기능
// 4. 테이블 column 종류 중 table 참조 기능 추가하기
// 5. 테이블 xlsx로 export 하기
// 6. 프로젝트 사용 시 unreal, unity 프로젝트 설정하기 (우선은 언리얼만)
// 7. 테이블 column에서 특정 타입의 class or blueprint 주입 기능

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
