import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="relative h-full animate-fade-in-up bg-black bg-[url('/pattern.svg')]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
