import "@styles/globals.css";
import Navbar from "@components/Navbar";
import { UserContext } from "@lib/context";
import { useUserData } from "@lib/hooks";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <GeistProvider themeType="dark">
      <UserContext.Provider value={userData}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </GeistProvider>
  );
}

export default MyApp;
