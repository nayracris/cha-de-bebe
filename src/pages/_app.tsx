import "../global.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";
import LoadingContext from "@/context/LoadingContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingContext>
      <AuthProvider>
        <Layout> {/* Agora sem a propriedade zoomLevel, pois ela é opcional */}
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </LoadingContext>
  );
}