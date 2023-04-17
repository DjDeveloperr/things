import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

export interface AppProps {
  title?: string;
  description?: string;
  image?: string;
  children?: ComponentChildren;
}

export function App(props: AppProps) {
  return (
    <div class="app">
      <Head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/style.css" />
        <meta name="charset" content="utf-8" />
        <meta
          name="mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="og:title" content={props.title ?? "K-List"} />
        <meta name="og:type" content="article" />
        <meta
          name="og:description"
          content={props.description ?? "keep track of things to do"}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        {props.image ? <meta name="og:image" content={props.image} /> : null}
      </Head>
      {props.children}
    </div>
  );
}
