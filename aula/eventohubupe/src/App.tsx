import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";

import EventsPage from "./pages/EventsPage";
import RegistrationsPage from "./pages/RegistrationsPage";

import { eventsInitial } from "./data/events";

import type { Event } from "./types/Event";

const EVENTS_KEY = "eventohub_events";
const REGISTRATIONS_KEY = "eventohub_registrations";

function loadEvents(): Event[] {

  const savedEvents =
    localStorage.getItem(EVENTS_KEY);

  if (!savedEvents) {
    return eventsInitial;
  }

  return JSON.parse(savedEvents);
}

function loadRegistrations(): number[] {

  const savedRegistrations =
    localStorage.getItem(
      REGISTRATIONS_KEY
    );

  if (!savedRegistrations) {
    return [];
  }

  return JSON.parse(savedRegistrations);
}

function App() {

  const [events, setEvents] =
    useState<Event[]>(loadEvents);

  const [registrations, setRegistrations] =
    useState<number[]>(
      loadRegistrations
    );

  /*
   * Salva os eventos no navegador.
   */
  useEffect(() => {

    localStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(events)
    );

  }, [events]);

  /*
   * Salva as inscrições no navegador.
   */
  useEffect(() => {

    localStorage.setItem(
      REGISTRATIONS_KEY,
      JSON.stringify(registrations)
    );

  }, [registrations]);

  /*
   * Realiza a inscrição.
   */
  const handleRegister = (
    eventId: number
  ) => {

    /*
     * Evita inscrição duplicada.
     */
    if (
      registrations.includes(eventId)
    ) {
      return;
    }

    /*
     * Verifica se ainda existem vagas.
     */
    const event = events.find(
      (item) => item.id === eventId
    );

    if (!event) {
      return;
    }

    if (event.availableSpots <= 0) {
      return;
    }

    /*
     * Diminui uma vaga.
     */
    setEvents((currentEvents) =>

      currentEvents.map((event) =>

        event.id === eventId
          ? {
              ...event,
              availableSpots:
                event.availableSpots - 1,
            }
          : event

      )

    );

    /*
     * Adiciona o evento às inscrições.
     */
    setRegistrations((current) => [
      ...current,
      eventId,
    ]);
  };

  /*
   * Logout apenas demonstrativo.
   */
  const handleLogout = () => {
    alert("Saída realizada.");
  };

  return (
    <BrowserRouter>

      <Header
        onLogout={handleLogout}
      />

      <main className="main-container">

        <Routes>

          <Route
            path="/eventos"
            element={
              <EventsPage
                events={events}
                registrations={registrations}
                onRegister={handleRegister}
              />
            }
          />

          <Route
            path="/inscricoes"
            element={
              <RegistrationsPage
                events={events}
                registrations={registrations}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/eventos"
                replace
              />
            }
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;