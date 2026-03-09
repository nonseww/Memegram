export const calcDates = (dateString: string): string => {
  const postDate = new Date(dateString).getTime();

  if (isNaN(postDate)) {
    return "Invalid date";
  }

  const dateNow = Date.now();
  const differenceMs = dateNow - postDate;
  const differenceMins = Math.floor(differenceMs / (1000 * 60));
  const differenceHours = Math.floor(differenceMins / 60);
  const differenceDays = Math.floor(differenceHours / 24);

  if (differenceMins < 1) return "только что";
  else if (differenceMins < 60) return `${differenceMins} мин. назад`;
  else if (differenceHours < 24) return `${differenceHours} ч. назад`;
  else if (differenceDays < 7) return `${differenceDays} дн. назад`;
  else return new Date(dateString).toLocaleDateString();
};
