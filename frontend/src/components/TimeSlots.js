const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const weekend = ["Saturday"];
const closed = ["Sunday"];

const availableTimeSlots = {
  ...Object.fromEntries(
    weekdays.map((day) => [
      day,
      [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
      ],
    ])
  ),
  ...Object.fromEntries(
    weekend.map((day) => [day, ["11:00", "12:00", "13:00", "14:00", "15:00"]])
  ),
  ...Object.fromEntries(closed.map((day) => [day, []])),
};

export default availableTimeSlots;
