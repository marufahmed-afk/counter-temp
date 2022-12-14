import OptInScreen from "../OptInScreen";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store";

// eslint-disable-next-line react/prop-types
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("OptInScreen", () => {
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={store}>
        <OptInScreen />
      </ReduxProvider>
    );
  });

  it("should render the top image div", async () => {
    const imageEl = await screen.findByTestId("topImg");
    expect(imageEl).toBeInTheDocument();
  });

  it("should render the amount of £10", async () => {
    const amountEl = await screen.findByTestId("amount");
    await waitFor(() => expect(amountEl.textContent).toBe("£10"));
  });

  it("url should match with db", async () => {
    const anchorEl = await screen.findByTestId("anchorTag");
    await waitFor(() => expect(anchorEl).toHaveAttribute("href", "https://www.jackpotjoy.com/"));
  });
});
