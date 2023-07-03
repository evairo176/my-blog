import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  const getMinutes = readingTime(text).minutes;

  const minutesRounded = Math.floor(getMinutes);

  if (locale === "id") {
    if (minutesRounded === 1) {
      return `${minutesRounded} menit`;
    } else {
      return `${minutesRounded} menit`;
    }
  } else {
    if (minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  }

  return readingTime(text).text;
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
