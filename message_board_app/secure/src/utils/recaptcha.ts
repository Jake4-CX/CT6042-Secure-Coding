import axios from "axios";

export async function verifyRecaptcha(recaptchaToken: string) {
  const response = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    {},
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    },
  );

  if (response.status === 200) {

    const data = response.data as {
      success: boolean,
      challenge_ts: string,
      hostname: string,
      score: number,
      action: string,
      'error-codes': string[]
    } | undefined;

    return data?.success ?? false;

  } else {
    return false;
  }
}