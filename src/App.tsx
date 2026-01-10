import { MainPage } from "./pages/MainPage";
import "./App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <MainPage />
    </DefaultLayout>
  );
}

export default App;
