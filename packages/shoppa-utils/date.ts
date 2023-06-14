export const getDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export function formatToLocal(date: Date | number | string): string {
  return new Date(date)
    .toLocaleDateString("he-IL", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(".", "/");
}

export const isDateNew = (d: Date | string, newIs: 7) => {
  const date = new Date(d).getTime();

  if (isNaN(date)) {
    return false;
  }

  return date > getDate(-newIs).getTime();
};
