// ============================================================
// EVENTOHUB UPE - SCRIPT
// ============================================================

// Dados mockados dos eventos
const events = [
  {
    id: 1,
    day: "10",
    month: "OUT",
    title: "Semana da Computação UPE",
    location: "Auditório Central",
    campus: "Recife",
    vacancies: 28,
    dateFull: "10 de outubro",
    description:
      "Uma programação especial com palestras, minicursos e atividades voltadas à comunidade acadêmica e profissional de Computação da UPE."
  },

  {
    id: 2,
    day: "15",
    month: "OUT",
    title: "Feira de Extensão UPE",
    location: "Praça de Eventos",
    campus: "Garanhuns",
    vacancies: 24,
    dateFull: "15 de outubro",
    description:
      "Evento que reúne projetos de extensão, iniciativas acadêmicas e ações desenvolvidas pela comunidade universitária."
  },

  {
    id: 3,
    day: "20",
    month: "OUT",
    title: "Hackathon UPE",
    location: "Laboratório 3",
    campus: "Recife",
    vacancies: 0,
    dateFull: "20 de outubro",
    description:
      "Maratona de inovação e desenvolvimento de soluções para desafios reais, reunindo estudantes e profissionais."
  },

  {
    id: 4,
    day: "25",
    month: "OUT",
    title: "Roda de Conversa: Carreiras em Dados",
    location: "Auditório Central",
    campus: "Recife",
    vacancies: 42,
    dateFull: "25 de outubro",
    description:
      "Conversa com profissionais da área de dados sobre carreira, mercado de trabalho, competências e oportunidades."
  }
];


// ============================================================
// ESTADO DA APLICAÇÃO
// ============================================================

let registrations = [];
let selectedCampus = "Todos os campi";
let selectedEventId = null;


// ============================================================
// ELEMENTOS DO DOM
// ============================================================

const eventsList = document.getElementById("eventsList");
const registrationsList = document.getElementById("registrationsList");

const modal = document.getElementById("modal");

const registrationCount =
  document.getElementById("registrationCount");

const toast = document.getElementById("toast");


// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

function getEvent(id) {
  return events.find(function (event) {
    return event.id === id;
  });
}


// ============================================================
// RENDERIZAÇÃO DOS EVENTOS
// ============================================================

function renderEvents() {

  const filteredEvents = events.filter(function (event) {

    return (
      selectedCampus === "Todos os campi" ||
      event.campus === selectedCampus
    );

  });


  if (filteredEvents.length === 0) {

    eventsList.innerHTML = `
      <div class="empty-state">
        Nenhum evento encontrado para este campus.
      </div>
    `;

    return;
  }


  eventsList.innerHTML = filteredEvents
    .map(function (event) {

      const isRegistered =
        registrations.includes(event.id);

      const isFull =
        event.vacancies <= 0;


      return `
        <article
          class="event-row"
          data-event-id="${event.id}"
        >

          <!-- DATA -->
          <div class="event-date">

            <span class="event-day">
              ${event.day}
            </span>

            <span class="event-month">
              ${event.month}
            </span>

          </div>


          <!-- INFORMAÇÕES -->
          <div class="event-info">

            <h2 class="event-title">
              ${event.title}
            </h2>

            <p class="event-meta">

              ${event.location}

              <span class="dot">
                ·
              </span>

              Campus ${event.campus}

            </p>

          </div>


          <!-- VAGAS / INSCRIÇÃO -->
          <div
            class="event-status ${
              isFull ? "full" : ""
            }"
          >

            ${
              isFull
                ? `
                  <span class="vacancy-number">
                    Lotado
                  </span>

                  <span class="vacancy-label">
                    0 vagas
                  </span>
                `
                : `
                  <span class="vacancy-number">
                    ${event.vacancies}
                  </span>

                  <span class="vacancy-label">
                    vagas restantes
                  </span>
                `
            }


            <div class="event-actions">

              <button
                class="register-btn"
                type="button"
                data-register-id="${event.id}"

                ${
                  isFull || isRegistered
                    ? "disabled"
                    : ""
                }
              >

                ${
                  isRegistered
                    ? "Inscrito"
                    : isFull
                    ? "Lotado"
                    : "Inscrever-se"
                }

              </button>

            </div>

          </div>


          <!-- SETA -->
          <div class="arrow">
            →
          </div>

        </article>
      `;
    })
    .join("");


  // ==========================================================
  // CLIQUE NO EVENTO
  // ==========================================================

  document
    .querySelectorAll(".event-row")
    .forEach(function (row) {

      row.addEventListener("click", function (event) {

        // Se clicou no botão de inscrição,
        // não abre o modal.
        if (
          event.target.closest("[data-register-id]")
        ) {
          return;
        }


        const eventId =
          Number(row.dataset.eventId);


        openModal(eventId);

      });

    });


  // ==========================================================
  // BOTÕES DE INSCRIÇÃO
  // ==========================================================

  document
    .querySelectorAll("[data-register-id]")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();


          const eventId =
            Number(button.dataset.registerId);


          register(eventId);

        }
      );

    });
}


// ============================================================
// RENDERIZAÇÃO DAS INSCRIÇÕES
// ============================================================

function renderRegistrations() {

  const myEvents = registrations
    .map(function (id) {

      return getEvent(id);

    })
    .filter(function (event) {

      return event !== undefined;

    });


  // Nenhuma inscrição
  if (myEvents.length === 0) {

    registrationsList.innerHTML = `
      <div class="empty-state">

        Você ainda não possui inscrições.

        <br>

        Volte para
        <strong>Eventos</strong>
        e escolha uma atividade.

      </div>
    `;

    return;
  }


  // Lista de inscrições
  registrationsList.innerHTML = myEvents
    .map(function (event) {

      return `
        <article class="registration-card">

          <div>

            <h3>
              ${event.title}
            </h3>

            <p>
              ${event.dateFull}
              ·
              ${event.location}
              ·
              Campus ${event.campus}
            </p>

          </div>


          <button
            class="cancel-btn"
            data-cancel-id="${event.id}"
            type="button"
          >
            Cancelar inscrição
          </button>

        </article>
      `;
    })
    .join("");


  // ==========================================================
  // CANCELAR INSCRIÇÃO
  // ==========================================================

  registrationsList
    .querySelectorAll("[data-cancel-id]")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const eventId =
            Number(button.dataset.cancelId);


          cancelRegistration(eventId);

        }
      );

    });
}


// ============================================================
// ATUALIZAR CONTADOR DE INSCRIÇÕES
// ============================================================

function updateRegistrationCount() {

  registrationCount.textContent =
    registrations.length;


  if (registrations.length > 0) {

    registrationCount.style.display =
      "inline-block";

  } else {

    registrationCount.style.display =
      "none";

  }
}


// ============================================================
// REALIZAR INSCRIÇÃO
// ============================================================

function register(id) {

  const event = getEvent(id);


  // Evento não encontrado
  if (!event) {
    return;
  }


  // Evento sem vagas
  if (event.vacancies <= 0) {

    showToast(
      "Este evento está lotado."
    );

    return;
  }


  // Usuário já inscrito
  if (registrations.includes(id)) {

    showToast(
      "Você já está inscrita neste evento."
    );

    return;
  }


  // Diminui uma vaga
  event.vacancies -= 1;


  // Adiciona inscrição
  registrations.push(id);


  // Atualiza tela
  updateRegistrationCount();

  renderEvents();

  renderRegistrations();


  // Atualiza modal caso esteja aberto
  if (selectedEventId === id) {

    fillModal(event);

  }


  showToast(
    `Inscrição realizada em "${event.title}".`
  );
}


// ============================================================
// CANCELAR INSCRIÇÃO
// ============================================================

function cancelRegistration(id) {

  const event = getEvent(id);


  if (!event) {
    return;
  }


  // Remove inscrição
  registrations =
    registrations.filter(function (item) {

      return item !== id;

    });


  // Devolve a vaga
  event.vacancies += 1;


  // Atualiza interface
  updateRegistrationCount();

  renderEvents();

  renderRegistrations();


  // Atualiza modal
  if (selectedEventId === id) {

    fillModal(event);

  }


  showToast(
    `Inscrição cancelada em "${event.title}".`
  );
}


// ============================================================
// ABRIR MODAL
// ============================================================

function openModal(id) {

  const event = getEvent(id);


  if (!event) {
    return;
  }


  selectedEventId = id;


  fillModal(event);


  modal.classList.remove("hidden");


  document.body.style.overflow =
    "hidden";
}


// ============================================================
// PREENCHER MODAL
// ============================================================

function fillModal(event) {

  const modalDate =
    document.getElementById("modalDate");

  const modalCampus =
    document.getElementById("modalCampus");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalLocation =
    document.getElementById("modalLocation");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalVacancies =
    document.getElementById("modalVacancies");

  const modalDateFull =
    document.getElementById("modalDateFull");

  const modalRegister =
    document.getElementById("modalRegister");


  // Data
  modalDate.textContent =
    `${event.day} ${event.month}`;


  // Campus
  modalCampus.textContent =
    `Campus ${event.campus}`;


  // Título
  modalTitle.textContent =
    event.title;


  // Local
  modalLocation.textContent =
    `${event.location} · Campus ${event.campus}`;


  // Descrição
  modalDescription.textContent =
    event.description;


  // Vagas
  modalVacancies.textContent =
    event.vacancies;


  // Data completa
  modalDateFull.textContent =
    event.dateFull;


  // Estado da inscrição
  const isRegistered =
    registrations.includes(event.id);


  const isFull =
    event.vacancies <= 0;


  if (isRegistered) {

    modalRegister.disabled =
      true;

    modalRegister.textContent =
      "Você está inscrita";

  }

  else if (isFull) {

    modalRegister.disabled =
      true;

    modalRegister.textContent =
      "Evento lotado";

  }

  else {

    modalRegister.disabled =
      false;

    modalRegister.textContent =
      "Inscrever-se";


    modalRegister.onclick =
      function () {

        register(event.id);

      };
  }
}


// ============================================================
// FECHAR MODAL
// ============================================================

function closeModal() {

  modal.classList.add("hidden");


  document.body.style.overflow =
    "";


  selectedEventId =
    null;
}


// ============================================================
// TOAST / NOTIFICAÇÃO
// ============================================================

function showToast(message) {

  toast.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
    setTimeout(function () {

      toast.classList.remove(
        "show"
      );

    }, 2800);
}


// ============================================================
// FILTROS DE CAMPUS
// ============================================================

document
  .querySelectorAll(".filter")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        // Remove ativo
        document
          .querySelectorAll(".filter")
          .forEach(function (item) {

            item.classList.remove(
              "active"
            );

          });


        // Ativa botão clicado
        button.classList.add(
          "active"
        );


        // Atualiza campus
        selectedCampus =
          button.dataset.campus;


        // Renderiza novamente
        renderEvents();

      }
    );

  });


// ============================================================
// MENU PRINCIPAL
// ============================================================

document
  .querySelectorAll(".nav-link")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        // Remove ativo dos menus
        document
          .querySelectorAll(".nav-link")
          .forEach(function (item) {

            item.classList.remove(
              "active"
            );

          });


        // Ativa menu clicado
        button.classList.add(
          "active"
        );


        const isEvents =
          button.dataset.view ===
          "eventos";


        const eventsView =
          document.getElementById(
            "eventsView"
          );


        const registrationsView =
          document.getElementById(
            "registrationsView"
          );


        // Alterna telas
        eventsView.classList.toggle(
          "hidden",
          !isEvents
        );


        registrationsView.classList.toggle(
          "hidden",
          isEvents
        );


        // Atualiza inscrições
        if (!isEvents) {

          renderRegistrations();

        }

      }
    );

  });


// ============================================================
// FECHAR MODAL
// ============================================================

document
  .querySelectorAll("[data-close-modal]")
  .forEach(function (element) {

    element.addEventListener(
      "click",
      closeModal
    );

  });


// ============================================================
// FECHAR MODAL COM ESC
// ============================================================

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      !modal.classList.contains(
        "hidden"
      )
    ) {

      closeModal();

    }

  }
);


// ============================================================
// BOTÃO SAIR
// ============================================================

const logoutButton =
  document.querySelector(
    ".logout-btn"
  );


if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    function () {

      showToast(
        "Sessão encerrada (demonstração)."
      );

    }
  );

}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

renderEvents();

renderRegistrations();

updateRegistrationCount();