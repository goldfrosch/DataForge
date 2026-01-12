import { MainPage } from "./pages/MainPage";
import { DefaultLayout } from "./layouts/DefaultLayout";
import "./App.css";

function App() {
  return (
    <DefaultLayout>
      <MainPage />
    </DefaultLayout>
  );
}

export default App;
