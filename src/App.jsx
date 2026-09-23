import {useState, useEffect} from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AboutPage from "./pages/AboutPage";
function App() {
    const [events, setEvents] = useState([]);
    const [eventError, setEventError] = useState("");
    const [editingEventId, setEditingEventId] = useState(null);

    const editingEvent =
        events.find((event) => event.id === editingEventId) ?? null;

    async function fetchEvents() {
        const response = await fetch("http://localhost:5000/api/events");

        if (!response.ok) {
            throw new Error("Unable to load events.");
        }

        return response.json();
    }

    useEffect(()=>{
            fetchEvents()
            .then((data) => setEvents(data))
            .catch(() => {
                setEventError("The events service is unavailable. Start the backend and try again.");
            });
        }, []);

    async function handleAddEvent(newEvent) {
       const response = await fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
       });

       if (!response.ok) {
            throw new Error("Unable to add event.");
       }

    setEvents(await fetchEvents());
       setEventError("");
    }

    async function handleUpdateEvent(updatedEvent) {
        const response = await fetch(`http://localhost:5000/api/events/${updatedEvent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEvent),
        });

        if (!response.ok) {
            throw new Error("Unable to update event.");
        }

        setEvents(await fetchEvents());
        setEventError("");
        setEditingEventId(null);
    }

    function handleStartEdit(eventId) {
        setEditingEventId(eventId);
    }

    function handleCancelEdit() {
        setEditingEventId(null);
    }

    function handleDeleteEvent(eventId) {
       fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE"
       })
       .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to delete event.");
            }
            return fetchEvents().then((data) => setEvents(data));
       })
       .catch(() => {
            setEventError("The event could not be changed. Check that the backend is running.");
       });
    }

    return (
        <div>
            <Navbar />

            {eventError && <p className="api-error">{eventError}</p>}

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            events={events}
                            onAddEvent={handleAddEvent}
                            onUpdateEvent={handleUpdateEvent}
                            onDeleteEvent={handleDeleteEvent}
                            onStartEdit={handleStartEdit}
                            editingEvent={editingEvent}
                            onCancelEdit={handleCancelEdit}
                        />
                    }
                />

                <Route
                    path="/events"
                    element={
                        <EventsPage
                            events={events}
                            onDeleteEvent={handleDeleteEvent}
                            onUpdateEvent={handleUpdateEvent}
                            onStartEdit={handleStartEdit}
                            editingEvent={editingEvent}
                            onCancelEdit={handleCancelEdit}
                        />
                    }
                />

                <Route
                    path="/events/:eventId/edit"
                    element={
                        <EventDetailsPage
                            events={events}
                            onUpdateEvent={handleUpdateEvent}
                            isEditing
                        />
                    }
                />

                <Route
                    path="/events/:eventId"
                    element={
                        <EventDetailsPage
                            events={events}
                        />
                    }
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;