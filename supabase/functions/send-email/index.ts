import React from 'react';

import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import { MagicLinkEmail } from './_templates/magic-link.tsx';
import { SignUpEmail } from './_templates/sign-up.tsx';
import { PasswordRecoveryEmail } from './_templates/password-recovery.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string;

Deno.serve(async (req) => {
  const emailData = {
    magiclink: {
      template: MagicLinkEmail,
      subject: '以此連結登入',
    },
    signup: {
      template: SignUpEmail,
      subject: '歡迎加入',
    },
    recovery: {
      template: PasswordRecoveryEmail,
      subject: '重設您的密碼',
    },
  };

  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);
  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string;
      };
      email_data: {
        token: string;
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
        site_url: string;
        token_new: string;
        token_hash_new: string;
      };
    };

    const html = await renderAsync(
      React.createElement(emailData[email_action_type].template, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token,
        token_hash,
        redirect_to,
        email_action_type,
      })
    );

    const { error } = await resend.emails.send({
      from: 'PTPE <team@email.ptpe.one>',
      to: [user.email],
      subject: emailData[email_action_type].subject,
      html,
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code,
          message: error.message,
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const responseHeaders = new Headers();
  responseHeaders.set('Content-Type', 'application/json');
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: responseHeaders,
  });
});
