import { AppRoute } from "./routes/AppRoute";
import { AppProvider } from "./services/AppProvider";

function App() {
  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
}

export default App;
