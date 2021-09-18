export const audioSource = 'notification.mp3';

export const playNotificationSound = (volume: number = 100) => {
  const sound = new Audio(audioSource);

  sound.volume = volume / 100;
  sound.play();
};
