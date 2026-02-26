import { ToastContainer } from "react-toastify";
import { AppRouter } from "@/router";

const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer autoClose={3000} newestOnTop position="top-right" />
    </>
  );
};

export default App;
