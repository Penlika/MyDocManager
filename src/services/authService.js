import { Auth } from 'aws-amplify';

export const signUp = async (email, password) => {
  return await Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
    },
  });
};

export const confirmSignUp = async (email, code) => {
  return await Auth.confirmSignUp(email, code);
};


export const signIn = async (email, password) => {
  const user = await Auth.signIn(email, password);
  return user.signInUserSession.idToken.jwtToken;
};

export const resetPassword = async (email) => {
  return await Auth.forgotPassword(email);
};

export const confirmPasswordReset = async (email, code, newPassword) => {
  return await Auth.forgotPasswordSubmit(email, code, newPassword);
};

export const signOut = async () => {
  return await Auth.signOut();
};
