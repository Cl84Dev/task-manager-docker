import { Providers } from "../../providers";
import LoggedNavBar from "./components/LoggedNavBar";
import "../../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Gerenciador de Projetos - Projetos",
  description: "Projetos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoggedNavBar />
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
