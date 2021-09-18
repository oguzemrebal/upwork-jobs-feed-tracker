import { browser } from './browser';
import { isProduction } from './environment';

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
    browser.storage.sync.set({ [key]: value }, () =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(value)
    );
  });

export const getStorageItem = (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    browser.storage.sync.get(key, (item: any) =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(item[key])
    );
  });

export const setItem = (key: string, value: any): Promise<any> =>
  isProduction() ? setStorageItem(key, value) : setLocalStorageItem(key, value);

export const getItem = (key: string): Promise<any> =>
  isProduction() ? getStorageItem(key) : getLocalStorageItem(key);
