import "./styles/App.scss";
import OptInScreen from "./app/features/OptIn/screens/OptInScreen/OptInScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <OptInScreen />
        <h2>hi</h2>
      </div>
    </QueryClientProvider>
  );
};

export default App;
