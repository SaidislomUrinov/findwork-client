import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/requests";
import { errorMsg, successMsg } from "../utils/msg";
import { useTranslation } from "react-i18next";
import { updateUser } from "../contexts/user";
import { Spinner } from "@material-tailwind/react";
import { FaSadTear } from "react-icons/fa";

function Verify() {
    const { id } = useParams();
    const dp = useDispatch();
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
    const [load, setLoad] = useState(false);
    const nv = useNavigate();
    useEffect(() => {
        setLoad(false);
        fetchData('GET', `/user/verifyActivator`, { _id: id })
            .then((res) => {
                const { ok, data, msg, access } = res.data;
                if (!ok) {
                    setMessage(`auth.${msg}`);
                } else {
                    successMsg(t(`${msg}`));
                    localStorage.setItem('access', access);
                    setTimeout(() => {
                        dp(updateUser(data));
                        nv('/vacancies')
                    }, 500);
                }
            }).catch(() => {
                errorMsg(t('error'));
                setMessage(t('error'));
            }).finally(()=>{
                setLoad(true);
            })
    }, [id]);
    return (
        <div className="flex items-center justify-center flex-col w-full h-[70vh]">
            {!load &&
                <div className="flex items-center justify-center flex-col">
                    <Spinner color="indigo" className="w-[100px] h-[100px]" />
                </div>
            }{load && message &&
                <div className="flex items-center justify-center flex-col gap-[10px]">
                    <FaSadTear className="text-blue-gray-500 text-[100px]" />
                    <p className="text-center">{t(message)}</p>
                </div>
            }
        </div>
    );
}

export default Verify;