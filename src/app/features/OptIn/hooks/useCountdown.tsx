import { useEffect, useState } from "react";
import { fetchCurrentTime, updateCurrentTime } from "../api/optin.api";
import { SetTimeDef } from "../types/optin.types";

const useCountdown = () => {
  const [over, setOver] = useState<string>("start");
  const [loading, setLoading] = useState(false);
  const [[h, m, s], setTime] = useState([0, 0, 0]);

  const getTimerData = async () => {
    try {
      setLoading(true);
      const res = await fetchCurrentTime();
      const { hour, minutes, seconds } = res.data;
      setTime([hour, minutes, seconds]);
      setLoading(false);
    } catch (error) {
      console.log("err", error);
    }
  };

  const saveTimerData = async (timerData: SetTimeDef) => {
    try {
      await updateCurrentTime(timerData);
    } catch (error) {
      console.log("err", error);
    }
  };

  const updateTime = ([hour, minutes, seconds]: [number, number, number]) => {
    setTime([hour, minutes, seconds]);
    saveTimerData({
      hour,
      minutes,
      seconds,
    });
  };

  const tick = () => {
    if (!loading) {
      if (h === 0 && m === 0 && s === 0) setOver("end");
      else if (m === 0 && s === 0) {
        setOver("running");
        updateTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setOver("running");
        updateTime([h, m - 1, 59]);
      } else {
        setOver("running");
        updateTime([h, m, s - 1]);
      }
    }
  };

  useEffect(() => {
    getTimerData();
  }, []);

  // timer
  let timerID: NodeJS.Timer;
  useEffect(() => {
    timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return { time: { h, m, s }, over, loading };
};

export default useCountdown;
