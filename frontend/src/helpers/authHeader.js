import userService from "../services/user";

export function authHeader() {
  const user = userService.getCurrentUser();
  if (user && user.authBasic) {
    return {
      Authorization: `Basic ${user.authBasic}`,
    };
  }
  return {};
}
