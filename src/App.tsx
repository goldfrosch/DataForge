import { MainPage } from "./pages/MainPage";
import { DefaultLayout } from "./layouts/DefaultLayout";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <MainPage />
      </DefaultLayout>
    </QueryClientProvider>
  );
}

export default App;
