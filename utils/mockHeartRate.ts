export default function startMockHeartRate(callback: (hr: number) => void) {
  let hr = 75;

  return setInterval(() => {
    const fluctuation = Math.floor(Math.random() * 10 - 5);
    hr = Math.max(55, Math.min(120, hr + fluctuation));

    callback(hr);
  }, 1000);
}

startMockHeartRate((hr) => console.log("Mocked HR:", hr));