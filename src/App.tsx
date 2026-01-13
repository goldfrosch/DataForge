import { MainPage } from "./pages/MainPage";
import { DefaultLayout } from "./layouts/DefaultLayout";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DatabasePage } from "./pages/DatabasePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/database/:uuid" element={<DatabasePage />} />
          </Routes>
        </BrowserRouter>
      </DefaultLayout>
    </QueryClientProvider>
  );
}

export default App;
