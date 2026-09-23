import type { Event } from "../types/Event";

interface RegistrationsPageProps {
  events: Event[];
  registrations: number[];
}

export default function RegistrationsPage({
  events,
  registrations,
}: RegistrationsPageProps) {

  const registeredEvents = events.filter(
    (event) =>
      registrations.includes(event.id)
  );

  return (
    <section className="registrations-page">

      <div className="page-title">

        <div>
          <h1>Minhas inscrições</h1>

          <p>
            Confira os eventos nos quais você está inscrita.
          </p>
        </div>

        <span className="registration-count">
          {registeredEvents.length}
        </span>

      </div>

      {registeredEvents.length === 0 ? (

        <div className="empty-registration">

          <h2>
            Você ainda não possui inscrições
          </h2>

          <p>
            Acesse a aba Eventos para encontrar
            eventos disponíveis.
          </p>

        </div>

      ) : (

        <div className="registration-list">

          {registeredEvents.map((event) => (

            <article
              className="registration-item"
              key={event.id}
            >

              <div className="registration-date">

                <strong>
                  {event.day}
                </strong>

                <span>
                  {event.month}
                </span>

              </div>

              <div className="registration-info">

                <h2>
                  {event.title}
                </h2>

                <p>
                  {event.location}
                  {" · "}
                  Campus {event.campus}
                </p>

                <span className="confirmed">
                  ✓ Inscrição confirmada
                </span>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}