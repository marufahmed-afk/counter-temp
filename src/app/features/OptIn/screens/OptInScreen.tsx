import { useEffect, useState } from 'react';
import { getOfferAmount, getOptInUrl } from '../api/optin.api';
import Countdown from '../components/Countdown/Countdown';
import styles from './OptInScreen.module.scss';

const OptInScreen = () => {
  const [url, setUrl] = useState('');

  const [amount, setAmount] = useState(0);

  const getAmount = async () => {
    try {
      const res = await getOfferAmount();
      setAmount(res.data.cash_value);
    } catch (error) {
      console.log('err', error);
    }
  };

  const getUrl = async () => {
    try {
      const res = await getOptInUrl();
      setUrl(res.data.jackpotjoyUrl);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    getUrl();
    getAmount();
  }, []);

  return (
    <main className={styles.OptInScreen}>
      <div className={styles.OptInScreenBox}>
        <div className={styles.topImg} />
        <h2>
          Get your free <strong>£{amount}</strong> now{' '}
        </h2>
        <Countdown />
        <a href={url} target="_blank" rel="noreferrer">
          <button>
            <h3>Opt. in</h3>
          </button>
        </a>
      </div>
    </main>
  );
};

export default OptInScreen;
