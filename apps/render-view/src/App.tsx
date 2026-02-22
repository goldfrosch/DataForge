import { useEffect } from "react";
import { MainPage } from "./pages/MainPage";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DatabasePage } from "./pages/DatabasePage";
import { useProjectStore } from "./hooks/UseStore.hook";
import { useLoadAllProjectsHook } from "./hooks/UseElectronEvent.hook";

import "./App.css";

function App() {
  const { initialProject } = useProjectStore();

  const { data, isSuccess } = useLoadAllProjectsHook();

  useEffect(() => {
    initialProject(data?.projects ?? []);
  }, [data?.projects, initialProject]);

  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/database/:uuid" element={<DatabasePage />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
}

export default App;
