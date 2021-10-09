import { browser } from './browser';

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

export const setLocalStorageItem = (key: string, value: any): Promise<any> =>
  new Promise((resolve, reject) => {
    browser.storage.local.set({ [key]: value }, () =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(value)
    );
  });

export const getLocalStorageItem = (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    browser.storage.local.get(key, (item: any) =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(item[key])
    );
  });

export const onStorageChange = (
  area: string,
  namespace: string,
  callback: (updatedValue: any, oldValue: any) => void
) =>
  browser.storage.onChanged.addListener((changes: any, updatedArea: string) => {
    if (area === updatedArea && changes[namespace]?.newValue !== undefined) {
      callback(changes[namespace].newValue, changes[namespace].oldValue);
    }
  });

export const removeChangeListener = (listener: any) =>
  browser.storage.onChanged.removeListener(listener);
