import { Link, useNavigate, useParams } from "react-router";
import EventForm from "../components/EventForm";

function EventDetailsPage({ events, onUpdateEvent, isEditing = false }) {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const selectedEvent = events.find(function (event) {
        return String(event.id) === eventId;
    });

    if (selectedEvent === undefined) {
        return (
            <section className="page-heading">
                <h1>Event Not Found</h1>

                <Link
                    className="details-button"
                    to="/events"
                >
                    Back to Events
                </Link>
            </section>
        );
    }

    if (isEditing) {
        async function handleUpdateAndReturn(updatedEvent) {
            await onUpdateEvent(updatedEvent);
            navigate(`/events/${updatedEvent.id}`);
        }

        return (
            <EventForm
                key={selectedEvent.id}
                eventToEdit={selectedEvent}
                onUpdateEvent={handleUpdateAndReturn}
            />
        );
    }

    return (
        <section className="event-details-page">
            <p className="event-category">
                {selectedEvent.category}
            </p>

            <h1>{selectedEvent.title}</h1>

            <p className="event-description">
                {selectedEvent.description}
            </p>

            <div className="details-box">
                <p>
                    <strong>Date:</strong> {selectedEvent.date}
                </p>

                <p>
                    <strong>Time:</strong> {selectedEvent.time}
                </p>

                <p>
                    <strong>Location:</strong> {selectedEvent.location}
                </p>
            </div>

            <Link
                className="details-button"
                to="/events"
            >
                Back to Events
            </Link>
        </section>
    );
}

export default EventDetailsPage;