import "./styles/App.scss";
import OptInScreen from "./app/features/OptIn/screens/OptInScreen/OptInScreen";
import { useAppSelector } from "./redux/store";
import Banner from "./components/atoms/Banner/Banner";

const App = () => {
  const { error } = useAppSelector((state) => ({
    error: state.optInReducer.error,
  }));

  return (
    <div className="App">
      <OptInScreen />
      {error && <Banner />}
    </div>
  );
};

export default App;
