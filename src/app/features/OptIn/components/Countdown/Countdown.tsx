import { makeTwoDigit } from "../../helpers/util.helper";
import useCountdown from "../../hooks/useCountdown";
import styles from "./Countdown.module.scss";

const Countdown = () => {
  const { time } = useCountdown();

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownTimer} data-testid="countdown">
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.h)}</h1>
          <small data-testid="hourText">Hours</small>
        </div>
        <h1>:</h1>
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.m)}</h1>
          <small data-testid="minutesText">Minutes</small>
        </div>
        <h1>:</h1>
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.s)}</h1>
          <small data-testid="secondsText">Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
