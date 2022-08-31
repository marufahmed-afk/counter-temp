import { makeTwoDigit } from '../../helpers/util.helper';
import useCountdown from '../../hooks/useCountdown';
import styles from './Countdown.module.scss';

const Countdown = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { time, over } = useCountdown();

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownTimer}>
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.h)}</h1>
          <small>Hours</small>
        </div>
        <h1>:</h1>
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.m)}</h1>
          <small>Minutes</small>
        </div>
        <h1>:</h1>
        <div className={styles.countdownTimerText}>
          <h1>{makeTwoDigit(time.s)}</h1>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
