
//Validating Email
export const validEmail = (email) => {
  return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

