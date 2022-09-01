import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Countdown from "../Countdown";

describe("Countdown", () => {
  beforeEach(() => {
    render(<Countdown />);
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
