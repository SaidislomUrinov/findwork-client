import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";
import { errorMsg, successMsg } from "../utils/msg";
import { fetchData } from "../utils/requests";

function Auth() {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const [disabled, setDisabled] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    async function submit() {
        try {
            if (!email) throw new Error("auth.invalid_email");
            setDisabled(true);
            const { msg, ok } = (await fetchData('POST', '/user/auth', {}, { email })).data;
            if (!ok) {
                throw new Error(msg);
            }
            setOpenModal(true);
            successMsg(t(`auth.${msg}`));
        } catch (error) {
            errorMsg(t(error.message));
        } finally {
            setDisabled(false);
        }
    };
    return (
        <div className="flex items-center justify-center w-full min-h-[50vh]">
            <div className="flex items-center flex-col justify-center w-[90%] sm:w-[400px] gap-[15px] rounded-[20px] border bg-white p-[20px]">
                {/*  */}
                <p className="font-bold w-full text-[20px]">{t?.(`auth.auth`)}</p>
                {/*  */}
                <Input size="lg" label={t('user.email')} required color="indigo" onChange={e => setEmail(e.target.value.trim().toLowerCase())} value={email} icon={<FaEnvelope />} />
                {/*  */}
                <Button size="lg" loading={disabled} onClick={submit} className="w-full" variant="gradient" color="indigo">
                    {t('submit')}
                </Button>
            </div>
        </div>
    );
}

export default Auth;