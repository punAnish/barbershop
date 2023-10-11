// import React, { useState } from "react";
// import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useTranslation } from "react-i18next";
// // import formatDistanceToNow from "date-fns/formatDistanceToNow";

// const AppointmentForm = () => {
//   const { t } = useTranslation();
//   const { dispatch } = useAppointmentsContext();
//   const { user } = useAuthContext();

//   const [customerName, setCustomerName] = useState("");
//   const [serviceType, setServiceType] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
//   const [notes, setNotes] = useState("");

//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   // Available time slots for each day of the week
//   const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const weekend = ["Saturday"];
//   const closed = ["Sunday"];

//   const availableTimeSlots = {
//     ...Object.fromEntries(
//       weekdays.map((day) => [
//         day,
//         [
//           "09:00",
//           "10:00",
//           "11:00",
//           "12:00",
//           "13:00",
//           "14:00",
//           "15:00",
//           "16:00",
//           "17:00",
//           "18:00",
//           "19:00",
//         ],
//       ])
//     ),
//     ...Object.fromEntries(
//       weekend.map((day) => [day, ["11:00", "12:00", "13:00", "14:00", "15:00"]])
//     ),
//     ...Object.fromEntries(closed.map((day) => [day, []])),
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     setSelectedTimeSlot("");
//   };

//   const handleTimeSlotChange = (e) => {
//     const selectedTimeSlot = e.target.value;
//     setSelectedTimeSlot(selectedTimeSlot);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError(t("appointmentForm.error"));
//       return;
//     }

//     const selectedDayOfWeek = new Date(selectedDate).toLocaleDateString(
//       "en-US",
//       { weekday: "long" }
//     );
//     const selectedDateAvailableTimeSlots =
//       availableTimeSlots[selectedDayOfWeek];
//     if (
//       !selectedDateAvailableTimeSlots ||
//       !selectedDateAvailableTimeSlots.includes(selectedTimeSlot)
//     ) {
//       setError(t("appointmentForm.error"));
//       return;
//     }

//     const appointment = {
//       customerName,
//       serviceType,
//       date: selectedDate,
//       timeSlot: selectedTimeSlot,
//       notes,
//     };

//     const response = await fetch("/api/appointments", {
//       method: "POST",
//       body: JSON.stringify(appointment),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//       setEmptyFields(json.emptyFields);
//     }
//     if (response.ok) {
//       setCustomerName("");
//       setServiceType("");
//       setSelectedDate("");
//       setSelectedTimeSlot("");
//       setNotes("");
//       setError(null);
//       setEmptyFields([]);
//       dispatch({ type: "CREATE_APPOINTMENT", payload: json });
//     }
//   };

//   return (
//     <form className="create" onSubmit={handleSubmit}>
//       <h3>{t("appointmentForm.bookAppointment")}</h3>
//       <label>{t("appointmentForm.customerName")}:</label>
//       <input
//         type="text"
//         onChange={(e) => setCustomerName(e.target.value)}
//         value={customerName}
//         className={emptyFields.includes("customerName") ? "error" : ""}
//       />
//       <label>{t("appointmentForm.serviceType")}:</label>
//       <select
//         type="select"
//         onChange={(e) => setServiceType(e.target.value)}
//         value={serviceType}
//         className={emptyFields.includes("serviceType") ? "error" : ""}
//       >
//         <option value="">{t("appointmentForm.selectService")}</option>
//         <option value="childrenHaircut">
//           {t("appointmentForm.childrenHaircut")}
//         </option>
//         <option value="adultHaircut">
//           {t("appointmentForm.adultHaircut")}
//         </option>
//         <option value="shaving">{t("appointmentForm.shaving")}</option>
//         <option value="hairColoring">
//           {t("appointmentForm.hairColoring")}
//         </option>
//       </select>
//       <label>{t("appointmentForm.date")}:</label>
//       <input
//         type="date"
//         onChange={handleDateChange}
//         value={selectedDate}
//         className={emptyFields.includes("date") ? "error" : ""}
//       />
//       <label>{t("appointmentForm.timeSlot")}:</label>
//       <select
//         onChange={handleTimeSlotChange}
//         value={selectedTimeSlot}
//         className={emptyFields.includes("timeSlot") ? "error" : ""}
//       >
//         {availableTimeSlots[
//           new Date(selectedDate).toLocaleDateString("en-US", {
//             weekday: "long",
//           })
//         ]?.map((timeSlot) => (
//           <option key={timeSlot} value={timeSlot}>
//             {timeSlot}
//           </option>
//         ))}
//       </select>
//       <p>
//         <strong>{"date And Time"}: </strong>{" "}
//         {new Date(selectedDate + " " + selectedTimeSlot).toLocaleString()}
//       </p>
//       <label>{t("appointmentForm.notes")}:</label>
//       <textarea
//         type="text"
//         onChange={(e) => setNotes(e.target.value)}
//         value={notes}
//         className={emptyFields.includes("notes") ? "error" : ""}
//       />
//       <button>{t("appointmentForm.submit")}</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// // export default AppointmentForm;

// import React, { useState } from "react";
// import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useTranslation } from "react-i18next";

// const AppointmentForm = ({ appointmentToEdit }) => {
//   const { t } = useTranslation();
//   const { dispatch } = useAppointmentsContext();
//   const { user } = useAuthContext();

//   const [customerName, setCustomerName] = useState(
//     appointmentToEdit ? appointmentToEdit.customerName : ""
//   );
//   const [serviceType, setServiceType] = useState(
//     appointmentToEdit ? appointmentToEdit.serviceType : ""
//   );
//   const [selectedDate, setSelectedDate] = useState(
//     appointmentToEdit ? appointmentToEdit.date : ""
//   );
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(
//     appointmentToEdit ? appointmentToEdit.timeSlot : ""
//   );
//   const [notes, setNotes] = useState(
//     appointmentToEdit ? appointmentToEdit.notes : ""
//   );

//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   // Available time slots for each day of the week
//   const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const weekend = ["Saturday"];
//   const closed = ["Sunday"];

//   const availableTimeSlots = {
//     ...Object.fromEntries(
//       weekdays.map((day) => [
//         day,
//         [
//           "09:00",
//           "10:00",
//           "11:00",
//           "12:00",
//           "13:00",
//           "14:00",
//           "15:00",
//           "16:00",
//           "17:00",
//           "18:00",
//           "19:00",
//         ],
//       ])
//     ),
//     ...Object.fromEntries(
//       weekend.map((day) => [day, ["11:00", "12:00", "13:00", "14:00", "15:00"]])
//     ),
//     ...Object.fromEntries(closed.map((day) => [day, []])),
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     setSelectedTimeSlot("");
//   };

//   const handleTimeSlotChange = (e) => {
//     const selectedTimeSlot = e.target.value;
//     setSelectedTimeSlot(selectedTimeSlot);
//   };

//   const handleEdit = () => {
//     // Enable editing mode
//     // You can add your own logic here to indicate that the form is in edit mode.
//   };

//   const handleCancel = () => {
//     // Exit editing mode and reset the form fields to the original data
//     setCustomerName(appointmentToEdit.customerName);
//     setServiceType(appointmentToEdit.serviceType);
//     setSelectedDate(appointmentToEdit.date);
//     setSelectedTimeSlot(appointmentToEdit.timeSlot);
//     setNotes(appointmentToEdit.notes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError(t("appointmentForm.error"));
//       return;
//     }

//     const selectedDayOfWeek = new Date(selectedDate).toLocaleDateString(
//       "en-US",
//       { weekday: "long" }
//     );
//     const selectedDateAvailableTimeSlots =
//       availableTimeSlots[selectedDayOfWeek];
//     if (
//       !selectedDateAvailableTimeSlots ||
//       !selectedDateAvailableTimeSlots.includes(selectedTimeSlot)
//     ) {
//       setError(t("appointmentForm.error"));
//       return;
//     }

//     const appointment = {
//       customerName,
//       serviceType,
//       date: selectedDate,
//       timeSlot: selectedTimeSlot,
//       notes,
//     };

//     if (appointmentToEdit) {
//       // This is an update operation
//       try {
//         const response = await fetch(
//           "/api/appointments/" + appointmentToEdit._id,
//           {
//             method: "PUT",
//             body: JSON.stringify(appointment),
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const updatedAppointment = await response.json();
//           dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
//           // Handle other actions after updating if needed
//         } else {
//           console.error("Failed to update the appointment.");
//           setError("Failed to update the appointment.");
//         }
//       } catch (error) {
//         console.error("Error while updating the appointment:", error);
//         setError("Error while updating the appointment.");
//       }
//     } else {
//       // This is a create operation
//       try {
//         const response = await fetch("/api/appointments", {
//           method: "POST",
//           body: JSON.stringify(appointment),
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         const json = await response.json();

//         if (!response.ok) {
//           setError(json.error);
//           setEmptyFields(json.emptyFields);
//         }
//         if (response.ok) {
//           setCustomerName("");
//           setServiceType("");
//           setSelectedDate("");
//           setSelectedTimeSlot("");
//           setNotes("");
//           setError(null);
//           setEmptyFields([]);
//           dispatch({ type: "CREATE_APPOINTMENT", payload: json });
//         }
//       } catch (error) {
//         console.error("Error while creating the appointment:", error);
//         setError("Error while creating the appointment.");
//       }
//     }
//   };

//   return (
//     <form className="create" onSubmit={handleSubmit}>
//       <h3>
//         {appointmentToEdit
//           ? t("appointmentForm.editAppointment")
//           : t("appointmentForm.bookAppointment")}
//       </h3>
//       <label>{t("appointmentForm.customerName")}:</label>
//       <input
//         type="text"
//         onChange={(e) => setCustomerName(e.target.value)}
//         value={customerName}
//         className={emptyFields.includes("customerName") ? "error" : ""}
//       />
//       <label>{t("appointmentForm.serviceType")}:</label>
//       <select
//         type="select"
//         onChange={(e) => setServiceType(e.target.value)}
//         value={serviceType}
//         className={emptyFields.includes("serviceType") ? "error" : ""}
//       >
//         <option value="">{t("appointmentForm.selectService")}</option>
//         <option value="childrenHaircut">
//           {t("appointmentForm.childrenHaircut")}
//         </option>
//         <option value="adultHaircut">
//           {t("appointmentForm.adultHaircut")}
//         </option>
//         <option value="shaving">{t("appointmentForm.shaving")}</option>
//         <option value="hairColoring">
//           {t("appointmentForm.hairColoring")}
//         </option>
//       </select>
//       <label>{t("appointmentForm.date")}:</label>
//       <input
//         type="date"
//         onChange={handleDateChange}
//         value={selectedDate}
//         className={emptyFields.includes("date") ? "error" : ""}
//       />
//       <label>{t("appointmentForm.timeSlot")}:</label>
//       <select
//         onChange={handleTimeSlotChange}
//         value={selectedTimeSlot}
//         className={emptyFields.includes("timeSlot") ? "error" : ""}
//       >
//         {availableTimeSlots[
//           new Date(selectedDate).toLocaleDateString("en-US", {
//             weekday: "long",
//           })
//         ]?.map((timeSlot) => (
//           <option key={timeSlot} value={timeSlot}>
//             {timeSlot}
//           </option>
//         ))}
//       </select>
//       <p>
//         <strong>{t("appointmentForm.dateAndTime")}: </strong>
//         {new Date(selectedDate + " " + selectedTimeSlot).toLocaleString()}
//       </p>
//       <label>{t("appointmentForm.notes")}:</label>
//       <textarea
//         type="text"
//         onChange={(e) => setNotes(e.target.value)}
//         value={notes}
//         className={emptyFields.includes("notes") ? "error" : ""}
//       />
//       {appointmentToEdit ? (
//         <div>
//           <button onClick={handleEdit}>{t("appointmentForm.edit")}</button>
//           <button onClick={handleCancel}>{t("appointmentForm.cancel")}</button>
//         </div>
//       ) : (
//         <button>{t("appointmentForm.submit")}</button>
//       )}
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default AppointmentForm;
import React, { useState } from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next";

const AppointmentForm = ({ appointmentToEdit }) => {
  const { t } = useTranslation();
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [isFormOpen, setIsFormOpen] = useState(true); // The form is open by default
  const [customerName, setCustomerName] = useState(
    appointmentToEdit ? appointmentToEdit.customerName : ""
  );
  const [serviceType, setServiceType] = useState(
    appointmentToEdit ? appointmentToEdit.serviceType : ""
  );
  const [selectedDate, setSelectedDate] = useState(
    appointmentToEdit ? appointmentToEdit.date : ""
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    appointmentToEdit ? appointmentToEdit.timeSlot : ""
  );
  const [notes, setNotes] = useState(
    appointmentToEdit ? appointmentToEdit.notes : ""
  );

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Available time slots for each day of the week
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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    setSelectedTimeSlot("");
  };

  const handleTimeSlotChange = (e) => {
    const selectedTimeSlot = e.target.value;
    setSelectedTimeSlot(selectedTimeSlot);
  };

  const handleEdit = () => {
    // Enable editing mode
    // You can add your own logic here to indicate that the form is in edit mode.
  };

  const handleCancel = () => {
    // Exit editing mode and reset the form fields to the original data
    setCustomerName(appointmentToEdit.customerName);
    setServiceType(appointmentToEdit.serviceType);
    setSelectedDate(appointmentToEdit.date);
    setSelectedTimeSlot(appointmentToEdit.timeSlot);
    setNotes(appointmentToEdit.notes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError(t("appointmentForm.error"));
      return;
    }

    const selectedDayOfWeek = new Date(selectedDate).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    const selectedDateAvailableTimeSlots =
      availableTimeSlots[selectedDayOfWeek];
    if (
      !selectedDateAvailableTimeSlots ||
      !selectedDateAvailableTimeSlots.includes(selectedTimeSlot)
    ) {
      setError(t("appointmentForm.error"));
      return;
    }

    const appointment = {
      customerName,
      serviceType,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
    };

    if (appointmentToEdit) {
      // This is an update operation
      try {
        const response = await fetch(
          "/api/appointments/" + appointmentToEdit._id,
          {
            method: "PUT",
            body: JSON.stringify(appointment),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const updatedAppointment = await response.json();
          dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
          // Handle other actions after updating if needed
          setIsFormOpen(false); // Close the form
        } else {
          console.error("Failed to update the appointment.");
          setError("Failed to update the appointment.");
        }
      } catch (error) {
        console.error("Error while updating the appointment:", error);
        setError("Error while updating the appointment.");
      }
    } else {
      // This is a create operation
      try {
        const response = await fetch("/api/appointments", {
          method: "POST",
          body: JSON.stringify(appointment),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
          setCustomerName("");
          setServiceType("");
          setSelectedDate("");
          setSelectedTimeSlot("");
          setNotes("");
          setError(null);
          setEmptyFields([]);
          dispatch({ type: "CREATE_APPOINTMENT", payload: json });
          setIsFormOpen(false); // Close the form
        }
      } catch (error) {
        console.error("Error while creating the appointment:", error);
        setError("Error while creating the appointment.");
      }
    }
  };
  return (
    <div>
      {isFormOpen ? (
        <form className="create" onSubmit={handleSubmit}>
          <h3>
            {appointmentToEdit
              ? t("appointmentForm.editAppointment")
              : t("appointmentForm.bookAppointment")}
          </h3>
          <label>{t("appointmentForm.customerName")}:</label>
          <input
            type="text"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            className={emptyFields.includes("customerName") ? "error" : ""}
          />
          <label>{t("appointmentForm.serviceType")}:</label>
          <select
            type="select"
            onChange={(e) => setServiceType(e.target.value)}
            value={serviceType}
            className={emptyFields.includes("serviceType") ? "error" : ""}
          >
            <option value="">{t("appointmentForm.selectService")}</option>
            <option value="childrenHaircut">
              {t("appointmentForm.childrenHaircut")}
            </option>
            <option value="adultHaircut">
              {t("appointmentForm.adultHaircut")}
            </option>
            <option value="shaving">{t("appointmentForm.shaving")}</option>
            <option value="hairColoring">
              {t("appointmentForm.hairColoring")}
            </option>
          </select>
          <label>{t("appointmentForm.date")}:</label>
          <input
            type="date"
            onChange={handleDateChange}
            value={selectedDate}
            className={emptyFields.includes("date") ? "error" : ""}
          />
          <label>{t("appointmentForm.timeSlot")}:</label>
          <select
            onChange={handleTimeSlotChange}
            value={selectedTimeSlot}
            className={emptyFields.includes("timeSlot") ? "error" : ""}
          >
            {availableTimeSlots[
              new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
              })
            ]?.map((timeSlot) => (
              <option key={timeSlot} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
          <p>
            <strong>{t("appointmentForm.dateAndTimeInvalid")}: </strong>
            {new Date(selectedDate + " " + selectedTimeSlot).toLocaleString()}
          </p>

          <label>{t("appointmentForm.notes")}:</label>
          <textarea
            type="text"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            className={emptyFields.includes("notes") ? "error" : ""}
          />
          {appointmentToEdit ? (
            <div>
              <button onClick={handleEdit}>{t("appointmentForm.edit")}</button>
              <button onClick={handleCancel}>
                {t("appointmentForm.cancel")}
              </button>
            </div>
          ) : (
            <button type="submit">{t("appointmentForm.submit")}</button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <button onClick={() => setIsFormOpen(true)}>
          {t("appointmentForm.bookAppointment")}
        </button>
      )}
    </div>
  );
};

export default AppointmentForm;
