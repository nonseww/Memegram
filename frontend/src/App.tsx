import { AppRoute } from "./routes/AppRoute";
import { AppProvider } from "./services/AppProvider";
import { GlobalUi } from "./ui/GlobalUi";

function App() {
  return (
    <AppProvider>
      <GlobalUi />
      <AppRoute />
    </AppProvider>
  );
}

export default App;
