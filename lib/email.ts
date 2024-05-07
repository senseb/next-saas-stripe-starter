import { env } from '@/env.mjs';
import { Resend } from 'resend';

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest = async (
  params
) => {
  let { identifier: email, url, provider: { from } } = params;
  try {
    await resend.emails.send({
      from: from,
      to: email,
      subject: 'Login Link to your Account',
      html: '<p>Click the magic link below to sign in to your account:</p>\
             <p><a href="' + url + '"><b>Sign in</b></a></p>',
    });
  } catch (error) {
    console.log({ error });
  }
};