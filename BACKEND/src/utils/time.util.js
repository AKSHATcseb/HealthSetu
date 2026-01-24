function calculateEndTime(startTime, durationHours) {
  const [h, m] = startTime.split(":").map(Number);

  let endHour = h + durationHours;
  let endMinute = m;

  if (endHour >= 24) endHour -= 24;

  return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
    2,
    "0"
  )}`;
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

module.exports = { calculateEndTime, timeToMinutes };
