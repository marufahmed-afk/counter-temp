import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Countdown from "../Countdown";
import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store";

// eslint-disable-next-line react/prop-types
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("Countdown", () => {
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={store}>
        <Countdown />
      </ReduxProvider>
    );
  });

  it("should render hour minute and seconds text", async () => {
    const hourTextEl = await screen.findByTestId("hourText");
    const minutesEl = await screen.findByTestId("minutesText");
    const secondsTextEl = await screen.findByTestId("secondsText");

    expect(hourTextEl).toBeInTheDocument();
    expect(minutesEl).toBeInTheDocument();
    expect(secondsTextEl).toBeInTheDocument();
  });

  it("should render the countdown timer", async () => {
    const countdownEl = await screen.findByTestId("countdown");

    expect(countdownEl).toBeInTheDocument();
  });
});
