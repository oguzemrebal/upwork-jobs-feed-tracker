import { isProduction } from './environment';

declare global {
  interface Window {
    chrome: any;
  }
}

const chrome = window.chrome;

export const setLocalStorageItem = (key: string, value: any): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });

export const getLocalStorageItem = (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(localStorage.getItem(key) as string));
    } catch (error) {
      reject(error);
    }
  });

export const setStorageItem = (key: string, value: any): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () =>
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(value)
    );
  });

export const getStorageItem = (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (item: any) =>
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(item)
    );
  });

export const setItem = (key: string, value: any): Promise<any> =>
  isProduction() ? setStorageItem(key, value) : setLocalStorageItem(key, value);

export const getItem = (key: string): Promise<any> =>
  isProduction() ? getStorageItem(key) : getLocalStorageItem(key);
