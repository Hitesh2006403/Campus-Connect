import { useEffect, useRef } from "react";
import EventForm from "../components/EventForm";
import EventSection from "../components/EventSection";
import Hero from "../components/Hero";

function HomePage({
    events,
    onAddEvent,
    onUpdateEvent,
    onDeleteEvent,
    onStartEdit,
    editingEvent,
    onCancelEdit,
}){
    const formSectionRef = useRef(null);

    useEffect(() => {
        if (editingEvent && formSectionRef.current) {
            formSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [editingEvent]);

    return(
        <>
        <Hero title="Discover what is happening in Campus"
        description="Find workshops,sports,activities,club Meeting,and opportunities to connect with other students."/>
        <div ref={formSectionRef}>
            <EventForm
                onAddEvent={onAddEvent}
                onUpdateEvent={onUpdateEvent}
                eventToEdit={editingEvent}
                onCancelEdit={onCancelEdit}
            />
        </div>
        <EventSection
        events={events}
        onDeleteEvent={onDeleteEvent}
        onStartEdit={onStartEdit}/>
        </>
    );
}
export default HomePage;