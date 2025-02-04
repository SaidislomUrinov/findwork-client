import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./utils/requests";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/msg";
import './utils/i18n';
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
function App() {
  const dp = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    fetchData('GET', '/user/verify').then((res) => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
      }
    }).catch(() => {
      errorMsg(t('error'));
    });
  }, []);
  return (
    <>
      <Navbar />
      <Toaster toastOptions={{ style: { zIndex: '9999', maxWidth: "600px" } }} />
    </>
  );
}

export default App;