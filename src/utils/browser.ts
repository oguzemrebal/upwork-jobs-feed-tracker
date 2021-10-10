declare global {
  interface Window {
    chrome: typeof chrome;
    getStorageItem: any;
  }
}

export const browser = window.chrome;
