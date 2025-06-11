import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface MagicLinkEmailProps {
  supabase_url: string;
  email_action_type: string;
  redirect_to: string;
  token_hash: string;
  token: string;
}

export const SignUpEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>確認註冊</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>確認註冊</Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>親愛的用戶：</Text>
        <Text style={{ ...text, marginBottom: '14px' }}>
          我們收到您的註冊請求。為了完成您的註冊流程，請點擊以下連結以驗證您的電子郵件地址：
        </Text>
        <Link
          href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          ［點擊此連結確認註冊］
        </Link>
        <Text style={{ ...text, marginBottom: '14px' }}>
          如有任何疑問或需要幫助，隨時聯繫我們的團隊。
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          如果您沒有嘗試註冊，請忽略此郵件。
        </Text>
        <Text style={footer}>
          <Link
            href="https://github.com/PTPE"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            PTPE
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default SignUpEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
