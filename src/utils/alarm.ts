import { browser } from './browser';
import Alarm = chrome.alarms.Alarm;

export const get = browser.alarms.get;
export const clear = browser.alarms.clear;
export const create = browser.alarms.create;
export const getAll = browser.alarms.getAll;
export const clearAll = browser.alarms.clearAll;

export const onEvent = (name: string, callback: (alarm: Alarm) => void) =>
  browser.alarms.onAlarm.addListener(
    (alarm) => alarm.name === name && callback(alarm)
  );
