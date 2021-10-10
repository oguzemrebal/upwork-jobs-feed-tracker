import { browser } from './browser';
import AreaName = chrome.storage.AreaName;

const setItem = (key: string, value: any, area: AreaName): Promise<any> =>
  new Promise((resolve, reject) =>
    browser.storage[area].set({ [key]: value }, () =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(value)
    )
  );

const getItem = (key: string, area: AreaName): Promise<any> =>
  new Promise((resolve, reject) =>
    browser.storage[area].get(key, (item: any) =>
      browser.runtime.lastError
        ? reject(browser.runtime.lastError)
        : resolve(item[key])
    )
  );

export const getLocalStorageItem = (key: string) => getItem(key, 'local');

export const setLocalStorageItem = (key: string, value: any) =>
  setItem(key, value, 'local');

export const getStorageItem = (key: string) => getItem(key, 'sync');

export const setStorageItem = (key: string, value: any) =>
  setItem(key, value, 'sync');

export const onStorageChange = (
  area: AreaName,
  namespace: string,
  callback: (updatedValue: any, oldValue: any) => void
) =>
  browser.storage.onChanged.addListener(
    (changes: any, updatedArea: AreaName) => {
      if (area === updatedArea && changes[namespace]?.newValue !== undefined) {
        callback(changes[namespace].newValue, changes[namespace].oldValue);
      }
    }
  );

export const removeChangeListener = (listener: any) =>
  browser.storage.onChanged.removeListener(listener);
