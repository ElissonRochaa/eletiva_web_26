import { NavLink } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">

        <div className="brand">
          <div className="brand-title">
            <span>Evento</span>
            <strong>Hub</strong>
            <span> UPE</span>
          </div>

          <div className="brand-subtitle">
            Olá, Maria Eduarda — veja o que está rolando nos campi.
          </div>
        </div>

        <nav className="navigation">

          <NavLink
            to="/eventos"
            className={({ isActive }) =>
              isActive
                ? "navigation-link active"
                : "navigation-link"
            }
          >
            Eventos
          </NavLink>

          <NavLink
            to="/inscricoes"
            className={({ isActive }) =>
              isActive
                ? "navigation-link active"
                : "navigation-link"
            }
          >
            Minhas inscrições
          </NavLink>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Sair
          </button>

        </nav>

      </div>
    </header>
  );
}