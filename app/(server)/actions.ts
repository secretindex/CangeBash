

const fetchCards = async (flowId: string, token: string) => {
  const response = await fetch(`/api/cards?flow_id=${flowId}&token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())

  return response

}

export { fetchCards }
