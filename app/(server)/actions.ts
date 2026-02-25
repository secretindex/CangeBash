"use server"

const fetchCards = async (flowId: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CANGE_API_URL}/api/cards?flow_id=${flowId}&token=${token}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      referer: `${process.env.NEXT_PUBLIC_CANGE_API_URL}`,
    },
  }).then((res) => res.json())

  return response

}

export { fetchCards }
