import "../styles/globals.css";

// INTERNAL IMPORT
import { ChatAppContect, ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar, Loader } from "../Components/index";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { isUserLoggedIn, loading } = useContext(ChatAppContect);

  //console.log("tim kiem nu cuoi",isUserLoggedIn)

  useEffect(() => {
    if (!isUserLoggedIn && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isUserLoggedIn && router.pathname !== "/login" && router.pathname !== "/UserRegister" && <NavBar />}
          <Component {...pageProps} />
        </>
      )}
    </>
  );
};
// const MyApp = ({ Component, pageProps }) => {
//   const router = useRouter();

//   const isUserLoggedIn = useState(ChatAppContect.isUserLoggedIn);
//   const loading = useState(ChatAppContect.loading);
//   console.log("tim kiem nu cuoi",isUserLoggedIn)

//   useEffect(() => {
//       if (!isUserLoggedIn && router.pathname !== "/login") {
//         console.log("tim kiem nu cuoi",isUserLoggedIn)
//         router.push("/login");
//       }
//   }, [isUserLoggedIn, router]);
//   return (
//     <ChatAppProvider>
//       <NavBar />
//       <Component {...pageProps} />
//     </ChatAppProvider>
//   );
// };




const WrappedMyApp = ({ Component, pageProps }) => (
  <ChatAppProvider>
    <MyApp Component={Component} pageProps={pageProps} />
  </ChatAppProvider>
);

export default WrappedMyApp;
