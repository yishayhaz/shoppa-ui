export const getDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export function formatToLocal(
  date: Date | number | string,
  includeDigits = true
): string {
  let d = new Date(date);

  if (isNaN(d.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  if (includeDigits) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  return d.toLocaleDateString("he-IL", options).replaceAll(".", "/");
}

export const isDateNew = (d: Date | string, newIs: 7) => {
  const date = new Date(d).getTime();

  if (isNaN(date)) {
    return false;
  }

  return date > getDate(-newIs).getTime();
};

export namespace DateUtils {
  export const format = formatToLocal;
  export const get = getDate;
  export const isNew = isDateNew;
}
