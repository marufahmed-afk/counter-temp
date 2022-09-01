import "./styles/App.scss";
import OptInScreen from "./app/features/OptIn/screens/OptInScreen/OptInScreen";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <OptInScreen />
      </div>
    </Provider>
  );
};

export default App;
