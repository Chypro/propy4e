/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PERSIST_ENCRYPT_KEY: string;
  readonly VITE_BACKEND_BASE_URL: string;
  readonly VITE_BACKEND_DYNAMIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
