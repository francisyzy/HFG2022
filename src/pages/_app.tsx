import { NavBar, Loading } from "@/components/ui";
import { Footer } from "@/components/ui/Footer";

import useAuth from "@/store/useAuth";
import { useDev } from "@/store/useDev";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { authStateLoading } = useAuth();

  return (
    <>
      <NavBar></NavBar>

      <main className="space">
        {authStateLoading ? (
          <Loading sizes={[2, 4, 3, 4, 3, 3, 3]}></Loading>
        ) : (
          <Component {...pageProps} />
        )}
      </main>

      <Footer></Footer>
    </>
  );
}

export default MyApp;
