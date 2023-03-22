import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Suspense } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps<{session: Session}>) {
  return (
    <ErrorBoundary fallback={<div className='m-auto w-5/6 h-screenset text-center'>Could not fetch data.</div>}>
      <Suspense fallback={<div className='m-auto flex w-1/2 justify-center align-middle'>Loading...</div>}>
        <SessionProvider session={pageProps.session}>  
          <Component {...pageProps} />
        </SessionProvider>
      </Suspense>
    </ErrorBoundary>
  )
}
