import type { Event } from "../types/Event";

interface EventItemProps {
  event: Event;
  isRegistered: boolean;
  onSelect: (event: Event) => void;
  onRegister: (eventId: number) => void;
}

export default function EventItem({
  event,
  isRegistered,
  onSelect,
  onRegister,
}: EventItemProps) {

  const isFull = event.availableSpots === 0;

  return (
    <article className="event-item">

      <button
        className="event-content"
        onClick={() => onSelect(event)}
      >

        <div className="event-date">

          <span className="event-day">
            {event.day}
          </span>

          <span className="event-month">
            {event.month}
          </span>

        </div>

        <div className="event-information">

          <h2>
            {event.title}
          </h2>

          <p>
            {event.location}
            <span> · </span>
            Campus {event.campus}
          </p>

        </div>

      </button>

      <div className="event-right">

        <div
          className={
            isFull
              ? "event-spots full"
              : "event-spots"
          }
        >

          {isFull ? (
            <>
              <strong>Lotado</strong>
              <span>0 vagas</span>
            </>
          ) : (
            <>
              <strong>
                {event.availableSpots}
              </strong>

              <span>
                vagas restantes
              </span>
            </>
          )}

        </div>

        {isRegistered ? (

          <span className="registered">
            ✓ Inscrito
          </span>

        ) : !isFull ? (

          <button
            className="register-button"
            onClick={() => onRegister(event.id)}
          >
            Inscrever-se
          </button>

        ) : (

          <span className="event-arrow">
            →
          </span>

        )}

      </div>

    </article>
  );
}