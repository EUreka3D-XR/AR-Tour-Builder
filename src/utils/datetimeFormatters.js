import differenceInMinutes from "date-fns/differenceInMinutes";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";

function lastUpdatedLike(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();
  const diffMinutes = differenceInMinutes(now, date);

  // Case 1: less than 2 minutes → "just now"
  if (diffMinutes < 2) {
    return "just now";
  }

  // Case 2: 2–10 minutes ago
  if (diffMinutes <= 10) {
    return `${diffMinutes} minutes ago`;
  }

  // Case 3: same day → "hh:mm"
  if (isSameDay(date, now)) {
    return format(date, "HH:mm");
  }

  // Case 4: older → "MMM d, yyyy" (e.g. "Oct 25, 2025")
  return format(date, "MMM d, yyyy");
}

export const dateFormatters = {
  lastUpdatedLike,
};
