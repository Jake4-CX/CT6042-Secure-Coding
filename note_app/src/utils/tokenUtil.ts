
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateToken(length: number): string {
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

export function validateTokenFormat(token: string, length: number): boolean {
  if (token.length !== length) {
    return false;
  }

  for (let i = 0; i < token.length; i++) {
    if (!characters.includes(token.charAt(i))) {
      return false;
    }
  }

  return true;

}