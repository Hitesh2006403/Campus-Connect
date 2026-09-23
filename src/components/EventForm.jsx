import { useState } from "react";

function toDateInputValue(date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const match = date.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const monthIndex = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
    ].indexOf(match[2].toLowerCase());

    if (monthIndex !== -1) {
      return `${match[3]}-${String(monthIndex + 1).padStart(2, "0")}-${String(match[1]).padStart(2, "0")}`;
    }
  }

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toISOString().slice(0, 10);
}

function toTimeInputValue(time) {
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }

  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return "";
  }

  let hours = Number(match[1]);
  if (match[3].toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (match[3].toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${match[2]}`;
}

function getFormData(eventToEdit) {
  if (!eventToEdit) {
    return {
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
    };
  }

  return {
    ...eventToEdit,
    date: toDateInputValue(eventToEdit.date),
    time: toTimeInputValue(eventToEdit.time),
  };
}

function EventForm({ onAddEvent, onUpdateEvent, eventToEdit }) {
  const emptyForm = getFormData();

  const [formData, setFormData] = useState({
    ...getFormData(eventToEdit),
  });

  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.date === "" ||
      formData.time === "" ||
      formData.location === "" ||
      formData.description === ""
    ) {
      setFormError("Please fill in every field.");
      return;
    }

      const eventData = {
        ...(eventToEdit || { id: Date.now() }),
        ...formData,
      };

      try {
        if (eventToEdit) {
          await onUpdateEvent(eventData);
        } else {
          await onAddEvent(eventData);
        }

        setFormData(emptyForm);
        setFormError("");
      } catch {
        setFormError(
          `Event could not be ${eventToEdit ? "updated" : "added"}. Please check that the backend is running.`,
        );
      }
    }

    return (
      <section className="event-form-section">
        <p className="section-label">{eventToEdit ? "Edit Activity" : "Create an Activity"}</p>

        <h2>{eventToEdit ? "Update Campus Event" : "Add a New Campus Event"}</h2>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title</label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: React Workshop"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Club">Club</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>

            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>

            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="location">Location</label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Seminar Hall"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event"
            />
          </div>

          {formError !== "" && <p className="form-error">{formError}</p>}

          <button className="submit-button" type="submit">
            {eventToEdit ? "Update Event" : "Add Event"}
          </button>
        </form>
      </section>
    );
  }

  export default EventForm;