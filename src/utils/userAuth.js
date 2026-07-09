const USER_TOKEN_KEY = "fugacity_user_token";
// Survives logout on purpose — lets the navbar tell a brand-new visitor
// (show "Register Now") apart from a returning, logged-out user (show "Login").
const HAS_ACCOUNT_KEY = "fugacity_has_account";

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN_KEY);
}

export function setUserToken(token) {
  localStorage.setItem(USER_TOKEN_KEY, token);
  localStorage.setItem(HAS_ACCOUNT_KEY, "true");
}

export function clearUserToken() {
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function hasAccountOnThisBrowser() {
  return localStorage.getItem(HAS_ACCOUNT_KEY) === "true";
}
