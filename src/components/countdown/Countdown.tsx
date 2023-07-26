import React, { useEffect, useState } from "react";
import styles from "./Countdown.module.css";
function Countdown(props: {
  secondsBeforeExpiration: number;
  onExpire: () => void;
  isOn: boolean;
}) {
  const [seconds, setSeconds] = useState(props.secondsBeforeExpiration || 3);

  useEffect(() => {
    if (!props.isOn) {
      return;
    }
    if (seconds > 0) {
      let timeoutId = setTimeout(
        () => setSeconds((prevState) => prevState - 1),
        1000
      );
      return () => clearTimeout(timeoutId);
    } else {
      props.onExpire();
    }
  }, [seconds, setSeconds, props.isOn, props.onExpire, props]);

  return <div className={styles.countDown}>{seconds}</div>;
}

export default Countdown;
