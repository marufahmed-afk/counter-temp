import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { useEffect } from "react";
import { getCountdownData, saveCountdown, setCountdown } from "../redux/optIn.slice";

const useCountdown = () => {
  const dispatch = useAppDispatch();

  const { countdown, error } = useAppSelector((state) => ({
    countdown: state.optInReducer.countdown,
    error: state.optInReducer.error,
  }));

  const [h, m, s] = countdown;

  // timer
  let timerID: any;

  useEffect(() => {
    timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const updateTime = async ([hour, minutes, seconds]: [number, number, number]) => {
    dispatch(setCountdown([hour, minutes, seconds])); // set state countdown
    const response = await dispatch(saveCountdown({ hour, minutes, seconds })); // save updated time to db

    if (saveCountdown.rejected.match(response)) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (error) {
      clearInterval(timerID);
    }
  }, [error]);

  const tick = () => {
    if (h === 0 && m === 0 && s === 0) return;
    else if (m === 0 && s === 0) {
      updateTime([h - 1, 59, 59]);
    } else if (s == 0) {
      updateTime([h, m - 1, 59]);
    } else {
      updateTime([h, m, s - 1]);
    }
  };

  useEffect(() => {
    dispatch(getCountdownData());
  }, []);

  return { time: { h, m, s } };
};

export default useCountdown;
