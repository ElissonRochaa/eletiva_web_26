import type { Event } from "../types/Event";

export const eventsInitial: Event[] = [
  {
    id: 1,
    title: "Semana da Computação UPE",
    day: "10",
    month: "OUT",
    location: "Auditório Central",
    campus: "Recife",
    description:
      "A Semana da Computação UPE reúne estudantes, professores e profissionais para discutir tecnologia, inovação, inteligência artificial, desenvolvimento de software e tendências da área de Computação.",
    startTime: "08:00",
    endTime: "18:00",
    totalSpots: 50,
    availableSpots: 28,
  },

  {
    id: 2,
    title: "Feira de Extensão UPE",
    day: "15",
    month: "OUT",
    location: "Praça de Eventos",
    campus: "Garanhuns",
    description:
      "Evento destinado à apresentação dos principais projetos de extensão desenvolvidos pela comunidade acadêmica da UPE.",
    startTime: "09:00",
    endTime: "17:00",
    totalSpots: 40,
    availableSpots: 24,
  },

  {
    id: 3,
    title: "Hackathon UPE",
    day: "20",
    month: "OUT",
    location: "Laboratório 3",
    campus: "Recife",
    description:
      "Competição de desenvolvimento colaborativo na qual equipes deverão criar soluções inovadoras para desafios propostos pela universidade.",
    startTime: "08:00",
    endTime: "20:00",
    totalSpots: 30,
    availableSpots: 0,
  },

  {
    id: 4,
    title: "Roda de Conversa: Carreiras em Dados",
    day: "25",
    month: "OUT",
    location: "Auditório Central",
    campus: "Recife",
    description:
      "Uma conversa com profissionais da área de dados sobre mercado de trabalho, carreira, formação e oportunidades profissionais.",
    startTime: "14:00",
    endTime: "17:00",
    totalSpots: 60,
    availableSpots: 42,
  },
];