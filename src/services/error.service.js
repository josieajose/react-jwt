const errorMessage = (error) => {
  const errorMessage =
    (error.response && error.response.data && error.response.data.message) ||
    error.toString();

  return errorMessage;
};

export default {
  errorMessage,
};
