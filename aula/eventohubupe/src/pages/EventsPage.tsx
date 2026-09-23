import { useState } from "react";

import type { Event } from "../types/Event";

import CampusFilter from "../components/CampusFilter";
import EventItem from "../components/EventItem";
import EventModal from "../components/EventModal";

interface EventsPageProps {
  events: Event[];
  registrations: number[];
  onRegister: (eventId: number) => void;
}

export default function EventsPage({
  events,
  registrations,
  onRegister,
}: EventsPageProps) {

  const [selectedCampus, setSelectedCampus] =
    useState("Todos os campi");

  const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  const filteredEvents =
    selectedCampus === "Todos os campi"
      ? events
      : events.filter(
          (event) =>
            event.campus === selectedCampus
        );

  const handleRegister = (eventId: number) => {

    onRegister(eventId);

    setSelectedEvent(null);
  };

  return (
    <>

      <CampusFilter
        selected={selectedCampus}
        onChange={setSelectedCampus}
      />

      <div className="events-list">

        {filteredEvents.map((event) => (

          <EventItem
            key={event.id}
            event={event}
            isRegistered={registrations.includes(
              event.id
            )}
            onSelect={setSelectedEvent}
            onRegister={handleRegister}
          />

        ))}

      </div>

      {selectedEvent && (

        <EventModal
          event={selectedEvent}
          isRegistered={registrations.includes(
            selectedEvent.id
          )}
          onClose={() => setSelectedEvent(null)}
          onRegister={() =>
            handleRegister(selectedEvent.id)
          }
        />

      )}

    </>
  );
}