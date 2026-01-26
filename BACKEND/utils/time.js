exports.timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

exports.calculateEndTime = (startTime, durationHours) => {
  const [h, m] = startTime.split(":").map(Number);

  const endHour = h + durationHours;

  return `${String(endHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};
