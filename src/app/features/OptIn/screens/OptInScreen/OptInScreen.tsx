import { useEffect, useState } from "react";
import { getOfferAmount, getOptInUrl } from "../../api/optin.api";
import Countdown from "../../components/Countdown/Countdown";
import useCountdown from "../../hooks/useCountdown";
import styles from "./OptInScreen.module.scss";

import { useQuery } from "@tanstack/react-query";

const OptInScreen = () => {
  const { over, loading } = useCountdown();
  //react query
  const { data } = useQuery(["repoData"], () => getOfferAmount().then((res) => res.data));
  console.log(data?.cash_value);
  //react query

  const [url, setUrl] = useState("");

  const [amount, setAmount] = useState(0);

  const getAmount = async () => {
    console.log("calling");
    try {
      const res = await getOfferAmount();
      setAmount(res.data.cash_value);
      // throw new Error("some error");
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

  return (
    <main className={styles.OptInScreen}>
      <div className={styles.OptInScreenBox}>
        {!over && loading && (
          <>
            <div data-testid="topImg" className={styles.topImg} />
            <h2>
              Get your free <strong data-testid="amount">£{amount}</strong> now
            </h2>
          </>
        )}

        <div className={styles.OptInScreenActions}>
          <Countdown />

          <a href={url} target="_blank" rel="noreferrer" data-testid="anchorTag">
            <button data-testid="optInBtn">
              <h3>Opt. in</h3>
            </button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default OptInScreen;
