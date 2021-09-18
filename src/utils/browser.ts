declare global {
  interface Window {
    chrome: any;
    getStorageItem: any;
  }
}

export const browser = window.chrome;
