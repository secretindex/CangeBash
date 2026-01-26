const tickets = [
  {
    ticket_number: 964,
    client: {
      id: 35,
      name: "O'Kon LLC",
    },
    created_at: "2025-12-17T15:06:22Z",
    created_by_id: 1,
    created_by_way_of: "Tiflux Web",
    desk: {
      id: 22,
      name: "API",
    },
    followers: "steven.brekke@murazik.example",
    is_closed: false,
    is_revised: false,
    last_answer_type: null,
    priority: {
      id: 44,
      name: "Low",
    },
    reopen_count: 0,
    requestor: {
      id: null,
      email: "samuel@predovic.example",
      name: "teste",
      ramal: null,
      telephone: "+45892156478",
    },
    responsible: {
      id: 1,
      name: "The Hon. Dorie Tromp",
    },
    services_catalog: null,
    sla_info: {
      attend_expiration: "2025-12-18T16:36:00Z",
      attend_sla: true,
      attend_sla_solution: true,
      solve_expiration: "2025-12-25T10:36:00Z",
      solved_in_time: null,
      stage_expiration: "2025-12-18T09:06:00Z",
      stopped: false,
    },
    stage: {
      id: 67,
      name: "Pending",
    },
    status: {
      id: 64,
      name: "Opened",
    },
    title: "To be, or not to be: that is the question",
    updated_at: "2025-12-17T15:06:22Z",
    updated_by_id: 1,
  },
  {
    ticket_number: 963,
    client: {
      id: 35,
      name: "O'Kon LLC",
    },
    created_at: "2025-12-17T15:06:22Z",
    created_by_id: 1,
    created_by_way_of: "Tiflux Web",
    desk: {
      id: 19,
      name: "API",
    },
    followers: "britteny@gorczany.example",
    is_closed: false,
    is_revised: false,
    last_answer_type: null,
    priority: {
      id: 38,
      name: "Low",
    },
    reopen_count: 0,
    requestor: {
      id: null,
      email: "wiley@ondricka-kshlerin.test",
      name: "teste",
      ramal: null,
      telephone: "+45892156478",
    },
    responsible: {
      id: 1,
      name: "The Hon. Dorie Tromp",
    },
    services_catalog: null,
    sla_info: {
      attend_expiration: "2025-12-18T16:36:00Z",
      attend_sla: true,
      attend_sla_solution: true,
      solve_expiration: "2025-12-25T10:36:00Z",
      solved_in_time: null,
      stage_expiration: "2025-12-18T09:06:00Z",
      stopped: false,
    },
    stage: {
      id: 59,
      name: "N1",
    },
    status: {
      id: 55,
      name: "Opened",
    },
    title: "To be, or not to be: that is the question",
    updated_at: "2025-12-17T15:06:22Z",
    updated_by_id: 1,
  },
];

const ticketAnswers = [
  {
    id: 1,
    answer_origin: "tiflux_web",
    answer_time: "2026-01-21T20:52:15Z",
    author: "Admin",
    files_count: 1,
    name: "teste",
    user_id: 1,
  },
];

export { ticketAnswers };

export const ticketsData = tickets;
