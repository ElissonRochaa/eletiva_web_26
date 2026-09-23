import type { Event } from "../types/Event";

interface EventModalProps {
  event: Event;
  isRegistered: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export default function EventModal({
  event,
  isRegistered,
  onClose,
  onRegister,
}: EventModalProps) {

  const isFull = event.availableSpots === 0;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="event-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-date">

          <strong>
            {event.day}
          </strong>

          <span>
            {event.month}
          </span>

        </div>

        <div className="modal-campus">
          Campus {event.campus}
        </div>

        <h2>
          {event.title}
        </h2>

        <p className="modal-description">
          {event.description}
        </p>

        <div className="modal-details">

          <div>
            <span>Local</span>
            <strong>{event.location}</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>
              {event.startTime} às {event.endTime}
            </strong>
          </div>

          <div>
            <span>Total de vagas</span>
            <strong>{event.totalSpots}</strong>
          </div>

          <div>
            <span>Vagas disponíveis</span>
            <strong>{event.availableSpots}</strong>
          </div>

        </div>

        <div className="modal-footer">

          {isRegistered ? (

            <div className="already-registered">
              ✓ Você já está inscrita neste evento.
            </div>

          ) : isFull ? (

            <button
              className="disabled-button"
              disabled
            >
              Evento lotado
            </button>

          ) : (

            <button
              className="register-main-button"
              onClick={onRegister}
            >
              Inscrever-se no evento
            </button>

          )}

        </div>

      </div>

    </div>
  );
}