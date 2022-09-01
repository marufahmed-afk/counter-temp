import { useEffect, useState } from "react";
import { getOfferAmount, getOptInUrl } from "../../api/optin.api";
import Countdown from "../../components/Countdown/Countdown";
import useCountdown from "../../hooks/useCountdown";
import styles from "./OptInScreen.module.scss";

const OptInScreen = () => {
  const [url, setUrl] = useState("");

  const [amount, setAmount] = useState(0);

  const { over, loading } = useCountdown();

  const getAmount = async () => {
    try {
      const res = await getOfferAmount();
      setAmount(res.data.cash_value);
    } catch (error) {
      console.log("err", error);
    }
  };

  const getUrl = async () => {
    try {
      const res = await getOptInUrl();
      setUrl(res.data.jackpotjoyUrl);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getUrl();
    getAmount();
  }, []);

  // initial time 0 0 0 => button hidden
  // initial time 1 0 0 => button shown

  return (
    <main className={styles.OptInScreen}>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.OptInScreenBox}>
          {(over === "running" || over === "start") && (
            <>
              <div data-testid="topImg" className={styles.topImg} />
              <h2>
                Get your free <strong data-testid="amount">£{amount}</strong> now
              </h2>
            </>
          )}
          <div className={styles.OptInScreenActions}>
            <Countdown />
            {(over === "running" || over === "start") && (
              <a href={url} target="_blank" rel="noreferrer" data-testid="anchorTag">
                <button data-testid="optInBtn">
                  <h3>Opt. in</h3>
                </button>
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default OptInScreen;
