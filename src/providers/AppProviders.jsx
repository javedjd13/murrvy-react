import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/ReduxToolkit/store";
import { queryClient } from "@/lib/react-query";

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default AppProviders;
