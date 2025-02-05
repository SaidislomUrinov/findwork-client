import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./utils/requests";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/msg";
import './utils/i18n';
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Verify from "./components/verify";
import Loading from "./components/loading";
function App() {
  const dp = useDispatch();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
    fetchData('GET', '/user/verify').then((res) => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
      }
    }).catch(() => {
      errorMsg(t('error'));
    }).finally(() => {
      setLoad(true);
    })
  }, []);
  return (
    <>
      <Navbar />
      {!  load && <Loading />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify/:id" element={<Verify />} />
      </Routes>
      <Toaster toastOptions={{ style: { zIndex: '9999', maxWidth: "600px" } }} />
    </>
  );
}

export default App;