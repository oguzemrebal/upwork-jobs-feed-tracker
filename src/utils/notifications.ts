import { browser } from './browser';

interface NotificationConfig {
  title: string;
  message: string;
}

const clear = browser.notifications.clear;
const getAll = browser.notifications.getAll;
const createNative = browser.notifications.create;

export const create = ({ title, message }: NotificationConfig) =>
  createNative({
    title,
    message,
    type: 'basic',
    // iconUrl: './notification-icon.png',
  });

export const removeAll = () =>
  getAll((notifications) =>
    Object.keys(notifications).forEach((notification) => clear(notification))
  );
