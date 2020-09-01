export const getToken = async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  return response.json();
};

export const getQuestions = async (questionsQty, token) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${questionsQty}&token=${token}`,
  );
  return response.json();
};
