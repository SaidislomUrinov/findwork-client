import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../utils/i18n';
import { useTranslation } from "react-i18next";
import { FaCircleDot } from "react-icons/fa6";
import { fetchData } from "../utils/requests";
import { errorMsg, successMsg } from "../utils/msg";
import { updateUser } from "../contexts/user";
function SelectRole() {
    const { role } = useSelector(e => e.user);
    const { t } = useTranslation();
    const dp = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [select, setSelect] = useState('staff');
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        if (!role) {
            setTimeout(() => {
                setOpenModal(true);
            }, 2000);
        }
    }, [role]);
    async function submit() {
        try {
            setDisabled(true);
            const { ok, msg } = (await fetchData('POST', '/user/updateRole', {}, { role: select })).data;
            if (!ok) throw new Error(`role.${msg}`);
            dp(updateUser({ role }));
            setOpenModal(false);
            successMsg(t(msg));
        } catch (error) {
            errorMsg(t(error.message))
        }
    };
    return (
        <Dialog open={openModal} size="xs">
            <DialogHeader>
                <p>{t('role.title')}</p>
            </DialogHeader>
            <DialogBody className="border-y">
                <List>
                    <ListItem onClick={() => setSelect('staff')}>
                        <ListItemPrefix>
                            <FaCircleDot className={`${select === 'staff' ? 'text-indigo-500' : 'text-blue-gray-300'}`} />
                        </ListItemPrefix>
                        <p>{t('role.staff')}</p>
                    </ListItem>
                    <ListItem onClick={() => setSelect('employer')}>
                        <ListItemPrefix>
                            <FaCircleDot className={`${select === 'employer' ? 'text-indigo-500' : 'text-blue-gray-300'}`} />
                        </ListItemPrefix>
                        <p>{t('role.employer')}</p>
                    </ListItem>
                </List>
            </DialogBody>
            <DialogFooter>
                <Button loading={disabled} onClick={submit} color="indigo" size="lg" className="w-full">
                    {t('submit')}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default SelectRole;