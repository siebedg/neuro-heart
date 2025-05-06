import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { app } from "./config";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdEgiIrAAAAAOkhIhWdijYFJ8XxC0OJD82v_2vJ"),
  isTokenAutoRefreshEnabled: true,
});
