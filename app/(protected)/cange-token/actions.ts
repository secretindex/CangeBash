"use server";

import axios from "axios";

export const handleAuthenticateToken = async (token: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CANGE_API_URL}/session`,
    {
      email: "caio@futuratec.srv.br",
      apikey: token,
    },
    {
      headers: {
        "Content-Type": "application/json",
        referer: process.env.NEXT_PUBLIC_CANGE_API_URL,
      },
    },
  );

  return response.data;
};
