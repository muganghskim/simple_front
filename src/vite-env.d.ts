/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string;
    // 추가적으로 사용할 환경 변수를 여기에 정의하세요
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  