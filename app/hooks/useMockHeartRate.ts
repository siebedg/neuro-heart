import { useEffect, useState } from "react";
import startMockHeartRate from "../utils/mockHeartRate";


export default function useMockHeartRate() {
  const [hr, setHr] = useState(75);

  useEffect(() => {
    const interval = startMockHeartRate(setHr);

    return () => clearInterval(interval);
  }, []);

  return hr;
}
