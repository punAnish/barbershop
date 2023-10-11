// import React from "react";
// import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// const AppointmentDetails = ({ appointment }) => {
//   const { dispatch } = useAppointmentsContext();
//   const { user } = useAuthContext();
//   const { t } = useTranslation();

//   const handleClick = async () => {
//     if (!user || !appointment) {
//       return;
//     }

//     try {
//       const response = await fetch("/api/appointments/" + appointment._id, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       if (response.ok) {
//         // If the response has no content, we can consider it a success.
//         if (response.status === 204) {
//           // Perform any necessary actions for a successful deletion.
//           dispatch({ type: "DELETE_APPOINTMENT", payload: appointment });
//           toast.success("Appointment deleted successfully");
//         } else {
//           const json = await response.json();
//           // Handle the JSON response as needed for your application.
//           dispatch({ type: "DELETE_APPOINTMENT", payload: json });
//           toast.success("Appointment deleted successfully");
//         }
//       } else {
//         // Handle the case where the response status is not OK (e.g., 404 Not Found).
//         console.error("Failed to delete the appointment.");
//         // Optionally, perform error handling or show a message to the user.
//         toast.error("Failed to delete the appointment");
//       }
//     } catch (error) {
//       // Handle network errors or other exceptions.
//       console.error("Error while deleting the appointment:", error);
//       // Optionally, perform error handling or show a message to the user.
//       toast.error("Error while deleting the appointment");
//     }
//   };

//   // Function to format time as "hh.mm.ss"
//   const formatTime = (date) => {
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const seconds = date.getSeconds().toString().padStart(2, "0");
//     return `${hours}.${minutes}.${seconds}`;
//   };

//   return (
//     <div className="appointment-details">
//       <h1>{t("pageTitle")}</h1>
//       <section className="form">
//         <div className="form-group">
//           <label htmlFor="customerName">
//             {t("appointmentForm.customerName")}
//           </label>
//           <p>{appointment.customerName}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="serviceType">
//             {t("appointmentForm.serviceType")}
//           </label>
//           <p>{t(`${appointment.serviceType}`)}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="date">{t("appointmentForm.date")}</label>
//           <p>{new Date(appointment.date).toLocaleDateString()}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="time">{t("appointmentForm.timeSlot")}</label>
//           <p>{formatTime(new Date(appointment.date))} Time Slot</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="notes">{t("appointmentForm.notes")}</label>
//           <p>{appointment.notes}</p>
//         </div>
//       </section>
//       <span className="material-symbols-outlined" onClick={handleClick}>
//         delete
//       </span>
//     </div>
//   );
// };

// export default AppointmentDetails;import React, { useState } from "react";
import React, { useState } from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import availableTimeSlots from "./TimeSlots";

const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...appointment });

  const handleDelete = async () => {
    if (!user || !appointment) {
      return;
    }

    try {
      const response = await fetch("/api/appointments/" + appointment._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        if (response.status === 204) {
          dispatch({ type: "DELETE_APPOINTMENT", payload: appointment });
          toast.success("Appointment deleted successfully");
        } else {
          const json = await response.json();
          dispatch({ type: "DELETE_APPOINTMENT", payload: json });
          toast.success("Appointment deleted successfully");
        }
      } else {
        console.error("Failed to delete the appointment.");
        toast.error("Failed to delete the appointment");
      }
    } catch (error) {
      console.error("Error while deleting the appointment:", error);
      toast.error("Error while deleting the appointment");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user || !editedData) {
      return;
    }

    try {
      const response = await fetch("/api/appointments/" + appointment._id, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
        setIsEditing(false);
        toast.success("Appointment updated successfully");
      } else {
        console.error("Failed to update the appointment.");
        toast.error("Failed to update the appointment");
      }
    } catch (error) {
      console.error("Error while updating the appointment:", error);
      toast.error("Error while updating the appointment");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...appointment });
  };

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${date.getDate()}`;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="appointment-details">
      <h1>{t("pageTitle")}</h1>
      <section className="form">
        <div className="form-group">
          <label htmlFor="customerName">
            {t("appointmentForm.customerName")}
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.customerName}
              onChange={(e) =>
                setEditedData({ ...editedData, customerName: e.target.value })
              }
            />
          ) : (
            <p>{editedData.customerName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">
            {t("appointmentForm.serviceType")}
          </label>
          {isEditing ? (
            <select
              value={editedData.serviceType}
              onChange={(e) =>
                setEditedData({ ...editedData, serviceType: e.target.value })
              }
            >
              <option value="children haircut">Children Haircut</option>
              <option value="adult haircut">Adult Haircut</option>
              <option value="shaving">Shaving</option>
              <option value="hair coloring">Hair Coloring</option>
            </select>
          ) : (
            <p>{t(`${editedData.serviceType}`)}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">{t("appointmentForm.date")}</label>
          {isEditing ? (
            <input
              type="date"
              min={formatDate(new Date())}
              value={formatDate(new Date(editedData.date))}
              onChange={(e) =>
                setEditedData({ ...editedData, date: e.target.value })
              }
            />
          ) : (
            <p>{new Date(editedData.date).toLocaleDateString()}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time">{t("appointmentForm.timeSlot")}</label>
          {isEditing ? (
            <select
              onChange={(e) =>
                setEditedData({ ...editedData, timeSlot: e.target.value })
              }
              value={editedData.timeSlot}
            >
              {availableTimeSlots[
                new Date(editedData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })
              ]?.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          ) : (
            <p>{editedData.timeSlot}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">{t("appointmentForm.notes")}</label>
          {isEditing ? (
            <textarea
              value={editedData.notes}
              onChange={(e) =>
                setEditedData({ ...editedData, notes: e.target.value })
              }
            />
          ) : (
            <p>{editedData.notes}</p>
          )}
        </div>
      </section>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
      {isEditing ? (
        <div>
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="edit" onClick={handleEdit}>
          edit
        </button>
      )}
    </div>
  );
};

export default AppointmentDetails;
