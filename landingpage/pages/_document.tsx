import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/svg/LogoWhite.svg" />
        <link rel="shortcut icon" href="/assets/svg/LogoWhite.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
