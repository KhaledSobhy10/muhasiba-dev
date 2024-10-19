import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
dayjs.extend(relativeTime);
dayjs.locale("ar");

export function getFromDate(
  date?: string | number | Date | dayjs.Dayjs | null | undefined
) {
  if (dayjs(date).isSame(new Date(), "day")) return "اليوم";
  return dayjs(date).fromNow();
}
