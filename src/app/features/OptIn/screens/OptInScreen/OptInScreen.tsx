import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { lazy, Suspense, useEffect } from "react";
// import Countdown from "../../components/Countdown/Countdown";
import { getAmount, getUrl } from "../../redux/optIn.slice";
import styles from "./OptInScreen.module.scss";

const Countdown = lazy(() => import("../../components/Countdown/Countdown"));

const OptInScreen = () => {
  const dispatch = useAppDispatch();

  const {
    amount,
    url,
    over,
    loading: isLoading,
  } = useAppSelector((state) => ({
    amount: state.optInReducer.amount,
    url: state.optInReducer.url,
    over: state.optInReducer.over,
    loading: state.optInReducer.loading,
  }));

  useEffect(() => {
    dispatch(getAmount());
    dispatch(getUrl());
  }, []);

  const loading = <h1 style={{ color: "black" }}>Loading...</h1>;

  return (
    <main className={styles.OptInScreen}>
      <Suspense fallback={loading}>
        <div className={styles.OptInScreenBox}>
          {over === false && (
            <>
              <div data-testid="topImg" className={styles.topImg} />
              <h2>
                Get your free <strong data-testid="amount">£{amount}</strong> now
              </h2>
            </>
          )}

          <div className={styles.OptInScreenActions}>
            <Countdown />
            {over === false && !isLoading && (
              <a href={url} target="_blank" rel="noreferrer" data-testid="anchorTag">
                <button data-testid="optInBtn">
                  <h3>Opt. in</h3>
                </button>
              </a>
            )}
          </div>
        </div>
      </Suspense>
    </main>
  );
};

export default OptInScreen;
