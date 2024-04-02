export const createResponse = (status, message) => {
  return {
    status,
    meta: {
      message,
    },
  };
};
