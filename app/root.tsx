import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
// Import rootAuthLoader
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";

import "./tailwind.css";
import { Footer } from "./components/Footer";
// import Header from "./components/Header";

// Export as the root route loader (opcja ta lub zakomentowana nizej - gdybyśmy potrzebowali sprawdzac usera)
export const loader: LoaderFunction = (args) => rootAuthLoader(args);

// Imports
// If you need to load in additonal data, you can pass your loader directly to the rootAuthLoader:

// export const loader: LoaderFunction = args => {
//   return rootAuthLoader(args, ({ request }) => {
//     const { sessionId, userId, getToken } = request.auth;
//     // fetch data
//     return { yourData: 'here' };
//   });
// };

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <Header /> */}
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default ClerkApp(App);
