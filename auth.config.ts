import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { env } from "@/env.mjs"
// import { SendVerificationRequestParams } from 'next-auth/providers';

import type { NextAuthConfig } from "next-auth"
import { siteConfig } from "@/config/site"
import { getUserByEmail } from "@/lib/user";
import MagicLinkEmail from "@/emails/magic-link-email"
import { prisma } from "@/lib/db"
// import { resend, sendVerificationRequest } from "./lib/email"
import { resend } from "./lib/email"


// import resend from 'resend';
// import { SendVerificationRequestParams } from 'next-auth/providers';

// export const sendVerificationRequest = async (
//   params
// ) => {
//   let { identifier: email, url, provider: { from } } = params;
//   try {
//     await resend.emails.send({
//       from: from,
//       to: email,
//       subject: 'Login Link to your Account',
//       html: '<p>Click the magic link below to sign in to your account:</p>\
//              <p><a href="' + url + '"><b>Sign in</b></a></p>',
//     });
//   } catch (error) {
//     console.log({ error });
//   }
// };

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   }
      // }
    }),
    GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
    // EmailProvider({
    //   from: 'noreply@example.com',
    //   // Custom sendVerificationRequest() function
    //   sendVerificationRequest,
    // }),
    // export const sendVerificationRequest = async (
    //   params
    // ) => {
    //   let { identifier: email, url, provider: { from } } = params;

    // EmailProvider({
    //   // sendVerificationRequest: async ({ identifier, url, provider }) => {
    //   sendVerificationRequest: async (params) => {
    //     let { identifier: email, url, provider: { from } } = params;
    //     const user = await getUserByEmail(email);
    //     if (!user || !user.name) return null;

    //     const userVerified = user?.emailVerified ? true : false;
    //     const authSubject = userVerified ? `Sign-in link for ${siteConfig.name}` : "Activate your account";

    //     try {
    //       const { data, error } = await resend.emails.send({
    //         from: 'SaaS Starter App <onboarding@resend.dev>',
    //         to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
    //         subject: authSubject,
    //         react: MagicLinkEmail({
    //           firstName: user?.name as string,
    //           actionUrl: url,
    //           mailType: userVerified ? "login" : "register",
    //           siteName: siteConfig.name
    //         }),
    //         // Set this to prevent Gmail from threading emails.
    //         // More info: https://resend.com/changelog/custom-email-headers
    //         headers: {
    //           'X-Entity-Ref-ID': new Date().getTime() + "",
    //         },
    //       });

    //       if (error || !data) {
    //         throw new Error(error?.message)
    //       }

    //       // console.log(data)
    //     } catch (error) {
    //       throw new Error("Failed to send verification email.")
    //     }
    //   },
    // }),
  ],
} satisfies NextAuthConfig