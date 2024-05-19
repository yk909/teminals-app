import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { PolkadotExtensionContextProvider } from '@/context/polkadotExtensionContext';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider, message, notification } from 'antd';

notification.config({
  placement: "topRight",
  duration: 3,
  maxCount: 3
});

message.config({
  top: 100,
  maxCount: 3
})



export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ConfigProvider>
      <SessionProvider session={session}>
        <PolkadotExtensionContextProvider>
          <Component {...pageProps} />
          <Analytics />
        </PolkadotExtensionContextProvider>
      </SessionProvider>
    </ConfigProvider>
  );
}
