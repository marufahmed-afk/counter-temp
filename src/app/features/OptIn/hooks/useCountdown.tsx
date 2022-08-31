import { useEffect, useState } from 'react';
import { fetchCurrentTime, updateCurrentTime } from '../api/optin.api';
import { SetTimeDef } from '../types/optin.types';

const useCountdown = () => {
  //TODO: change to react query?

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([0, 0, 0]);

  const getTimerData = async () => {
    try {
      const res = await fetchCurrentTime();
      const { hour, minutes, seconds } = res.data;
      setTime([hour, minutes, seconds]);
      console.log(res.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  const saveTimerData = async (timerData: SetTimeDef) => {
    try {
      await updateCurrentTime(timerData);
    } catch (error) {
      console.log('err', error);
    }
  };

  const updateTime = ([hour, minutes, seconds]: [number, number, number]) => {
    setTime([hour, minutes, seconds]);
    saveTimerData({
      hour,
      minutes,
      seconds
    });
  };

  const tick = () => {
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      // setTime([h - 1, 59, 59]);
      updateTime([h - 1, 59, 59]);
    } else if (s == 0) {
      // setTime([h, m - 1, 59]);
      updateTime([h, m - 1, 59]);
    } else {
      // setTime([h, m, s - 1]);
      updateTime([h, m, s - 1]);
    }
  };

  let timerID: NodeJS.Timer;

  useEffect(() => {
    getTimerData();
  }, []);

  useEffect(() => {
    timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return { time: { h, m, s }, over };
};

export default useCountdown;
