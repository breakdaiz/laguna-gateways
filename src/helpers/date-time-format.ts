import dayjs from "dayjs";

export const getDateTimeFormat = (date: Date | string) => {
  return dayjs(date).format("MMM DD YYYY, h:mm A");
};
