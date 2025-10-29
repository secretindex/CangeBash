const mockConversas = [
  {
    conversaId: "conv_123456789",
    cliente: {
      nome: "Maria Silva",
      numero: "+5511999999999",
      avatar: "https://ui-avatars.com/api/?name=Maria+Silva"
    },
    atendente: {
      nome: "Suporte Ana",
      numero: "suporte@empresa.com" // ou ID interno
    },
    status: "aguardando_resposta",
    prioridade: "alta",
    etiquetas: ["urgente", "dúvida técnica"],
    canal: "whatsapp",
    criadoEm: "2025-04-05T08:10:00Z",
    ultimaAtualizacao: "2025-04-05T08:35:00Z",
    mensagens: [
      {
        id: "msg_001",
        from: "cliente", // ou "atendente"
        mensagem: "Olá, estou com problema no login do app.",
        sentAt: "2025-04-05T08:10:00Z",
        updatedAt: "2025-04-05T08:10:00Z",
        lida: true
      },
      {
        id: "msg_002",
        from: "atendente",
        mensagem: "Olá Maria! Pode me dizer qual erro aparece na tela?",
        sentAt: "2025-04-05T08:35:00Z",
        updatedAt: "2025-04-05T08:35:00Z",
        lida: true
      },
      {
        id: "msg_003",
        from: "cliente",
        mensagem: "Aparece 'credenciais inválidas', mas eu tenho certeza que está certo.",
        sentAt: "2025-04-05T08:37:00Z",
        updatedAt: "2025-04-05T08:37:00Z",
        lida: false
      }
    ]
  },
  {
    conversaId: "conv_987654321",
    cliente: {
      nome: "João Pedro",
      numero: "+5511888888888",
      avatar: "https://ui-avatars.com/api/?name=João+Pedro"
    },
    atendente: null, // ainda não atribuído
    status: "nova",
    prioridade: "normal",
    etiquetas: ["orçamento"],
    canal: "whatsapp",
    criadoEm: "2025-04-05T09:15:00Z",
    ultimaAtualizacao: "2025-04-05T09:15:00Z",
    mensagens: [
      {
        id: "msg_101",
        from: "cliente",
        mensagem: "Bom dia! Vocês fazem instalação de ar condicionado?",
        sentAt: "2025-04-05T09:15:00Z",
        updatedAt: "2025-04-05T09:15:00Z",
        lida: false
      }
    ]
  }
];

export default mockConversas;