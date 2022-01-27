import { fetchJobs } from './api/jobs';
import * as alarms from './utils/alarm';
import { playNotificationSound } from './utils/audio';
import { retrieveJobs, saveJobs } from './utils/jobs';
import * as notifications from './utils/notifications';
import { onSettingsChanged, retrieveSettings } from './utils/settings';

const jobsLimit = 50;
const alarmName = 'job-fetcher';

onSettingsChanged(async ({ isFetchingEnabled, fetchingInterval }) => {
  const fetcher = await alarms.get(alarmName);

  if (!isFetchingEnabled) {
    return alarms.clear(alarmName);
  }

  if (!fetcher) {
    return alarms.create(alarmName, { periodInMinutes: fetchingInterval });
  }

  if (fetcher && fetcher.periodInMinutes !== fetchingInterval) {
    alarms.clear(alarmName);
    alarms.create(alarmName, { periodInMinutes: fetchingInterval });
  }
});

alarms.onEvent(alarmName, async () => {
  const [newJobs, oldJobs, settings] = await Promise.all([
    fetchJobs(),
    retrieveJobs(),
    retrieveSettings(),
  ]);

  const jobsToSave = [
    ...newJobs.map((job) => ({ ...job, __isSeen: false })),
    ...oldJobs,
  ].slice(0, jobsLimit);

  const unseenJobs = jobsToSave.filter((job) => !job.__isSeen);

  if (unseenJobs.length > 0) {
    notifications.create({
      title: `You have ${unseenJobs.length} new job${
        unseenJobs.length > 1 ? 's' : ''
      }`,
      message: 'Hurry up and apply before somebody else gets it!',
    });

    if (settings.isNotificationSoundEnabled) {
      playNotificationSound(settings.notificationSoundVolume);
    }
  }

  // set badge counter
  // notify about unseen jobs

  await saveJobs(jobsToSave);
});
