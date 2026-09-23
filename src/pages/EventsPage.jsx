import { useEffect, useRef } from "react";
import EventForm from "../components/EventForm";
import EventSection from "../components/EventSection";
function EventsPage({
    events,
    onDeleteEvent,
    onUpdateEvent,
    onStartEdit,
    editingEvent,
    onCancelEdit,
}) {
    const formSectionRef = useRef(null);

    useEffect(() => {
        if (editingEvent && formSectionRef.current) {
            formSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [editingEvent]);

    return (
        <>
            <section className="page-heading">
                <p className="section-label">
                    All Campus Activities
                </p>

                <h1>Events</h1>

                <p>
                    Explore all workshops, clubs, sports, and cultural activities
                </p>
            </section>

            {editingEvent && (
                <div ref={formSectionRef}>
                    <EventForm
                        eventToEdit={editingEvent}
                        onUpdateEvent={onUpdateEvent}
                        onCancelEdit={onCancelEdit}
                    />
                </div>
            )}

            <EventSection
                events={events}
                onDeleteEvent={onDeleteEvent}
                onStartEdit={onStartEdit}
            />
        </>
    );
}

export default EventsPage;