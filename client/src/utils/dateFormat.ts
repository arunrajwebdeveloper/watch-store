export const dateFormat = (date: string) => {
  return new Date(date)
    .toLocaleString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
    .replace(",", "")
    .replace(",", " at");
};
