import { clearError } from "@app/app/features/OptIn/redux/optIn.slice";
import { useAppDispatch } from "@app/redux/store";
import styles from "./Banner.module.scss";

const Banner = () => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearError());
  };

  return (
    <div className={styles.banner}>
      <div className={styles.items}>
        <div>Error communicating with the server! Try refreshing...</div>
        <div className={styles.btnContainer} onClick={handleClear}>
          <strong className={styles.close}>X</strong>
        </div>
      </div>
    </div>
  );
};

export default Banner;
