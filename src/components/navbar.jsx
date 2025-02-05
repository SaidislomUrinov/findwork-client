import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Drawer, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Spinner, } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../utils/i18n'
import { BiLogIn, BiLogOut, BiSolidUser } from "react-icons/bi";
import { FaAlignLeft, FaArrowRight, FaBars, FaBuilding, FaEnvelope, FaFilePdf, FaGlobe, FaListUl, FaSuitcase, FaUser } from "react-icons/fa";
import uzIcon from '../assets/uz.png';
import ruIcon from '../assets/ru.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCirclePlus, FaXmark } from "react-icons/fa6";
import { fetchData } from "../utils/requests";
import { updateUser } from "../contexts/user";
import { errorMsg, successMsg } from "../utils/msg";
function Navbar() {
    const nv = useNavigate();
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang)
    };
    const { _id, role } = useSelector(e => e?.user);
    console.log(role)
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    // 
    const [stats, setStats] = useState({
        vacancies: 0,
        companies: 0,
        categories: 0
    });
    const p = useLocation().pathname;
    useEffect(() => {
        closeDrawer();
    }, [p])
    // 
    useEffect(() => {
        fetchData('GET', '/user/getStats').then((res) => {
            const { ok, data } = res.data;
            if (ok) {
                setStats(data);
            }
        })
    }, []);
    const dp = useDispatch();
    const [disabled, setDisabled] = useState(false);
    async function updateRole(role) {
        try {
            setDisabled(true);
            const { ok, msg } = (await fetchData('POST', '/user/updateRole', {}, { role })).data;
            if (!ok) throw new Error(`role.${msg}`);
            dp(updateUser({ role }));
            successMsg(t(msg));
        } catch (error) {
            errorMsg(t(error.message))
        } finally {
            setDisabled(false);
        }
    };
    // 
    const [myStats, setMyStats] = useState({
        vacancies: 0,
        applications: 0
    });
    useEffect(() => {
        if (role) {
            fetchData('GET', `/user/getMyStats`).then(res => {
                const { ok, data } = res.data;
                if (ok) {
                    setMyStats(data);
                }
            })
        }
    }, [role]);
    // 
    function logOut() {
        localStorage.removeItem('access');
        setTimeout(() => {
            nv('/');
            window.location.reload();
        }, 500);
    }
    return (
        <>
            <div className="w-full h-[70px] fixed top-0 left-0 flex items-center justify-center z-[3]">
                <div className="flex items-center justify-between w-full max-w-7xl bg-white px-[2%] h-[70px] rounded-b-[10px]">
                    {/*  */}
                    <IconButton variant="text" className="text-[20px] lg:hidden" onClick={openDrawer}>
                        <FaBars />
                    </IconButton>
                    {/*  */}
                    <Link to={'/'} className="text-[20px] font-lexend font-bold text-indigo-500" >
                        ISHIM.UZ
                    </Link>
                    {/*  */}
                    <div className="flex items-center justify-center gap-[10px]">
                        {/*  */}
                        <div className="hidden items-center justify-center lg:flex gap-[30px]">
                            <Link className="text-[14px]" to={'/vacancies'}>
                                {t('navbar.vacancies')}({stats.vacancies})
                            </Link>
                            <Link className="text-[14px]" to={'/categories'}>
                                {t('navbar.categories')}({stats.categories})
                            </Link>
                            <Link className="text-[14px]" to={'/companies'}>
                                {t('navbar.companies')}({stats.companies})
                            </Link>
                            {_id && <Menu>
                                <MenuHandler>
                                    <Button variant="text" color="blue-gray" size="sm">
                                        {t('navbar.more')}
                                        <FaAlignLeft />
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    {role === 'employer' &&
                                        <div>
                                            <Button onClick={() => updateRole('staff')} loading={disabled} size="sm" variant="text" color="indigo">
                                                <FaUser />
                                                {t(`navbar.staff`)}
                                                <FaArrowRight className="rotate-[-45deg]" />
                                            </Button>
                                            {/*  */}
                                            <MenuItem onClick={() => nv('/employer/vacancies')} className="flex items-center justify-start gap-1">
                                                <FaSuitcase />
                                                {t('navbar.myvacancies')}({myStats.vacancies})
                                            </MenuItem>
                                            <MenuItem onClick={() => nv('/employer/applications')} className="flex items-center justify-start gap-1">
                                                <FaEnvelope />
                                                {t('navbar.applications')}({myStats.applications})
                                            </MenuItem>
                                            <MenuItem onClick={() => nv('/employer/create')} className="flex items-center justify-start text-green-500 gap-1">
                                                <FaCirclePlus />
                                                {t('navbar.addvacancy')}
                                            </MenuItem>
                                        </div>
                                    }
                                    {role === 'staff' && <div>
                                        <Button onClick={() => updateRole('employer')} loading={disabled} size="sm" variant="text" color="indigo">
                                            <FaUser />
                                            {t(`navbar.employer`)}
                                            <FaArrowRight className="rotate-[-45deg]" />
                                        </Button>
                                        <MenuItem onClick={() => nv('/staff/applications')} className="flex items-center justify-start gap-1">
                                            <FaEnvelope />
                                            {t('navbar.myapplications')}({myStats.applications})
                                        </MenuItem>
                                        <MenuItem onClick={() => nv('/staff/resume')} className="flex items-center justify-start gap-1">
                                            <FaFilePdf />
                                            {t('navbar.resume')}
                                        </MenuItem>
                                    </div>
                                    }
                                    <hr className="my-3" />
                                    <MenuItem onClick={logOut} className="flex items-center justify-start text-red-500 gap-1">
                                        <BiLogOut />
                                        {t('navbar.logout')}
                                    </MenuItem>
                                </MenuList>
                            </Menu>}
                        </div>
                        {/*  */}
                        <Menu>
                            <MenuHandler>
                                <IconButton className="rounded-full" variant="text" color="blue-gray">
                                    <FaGlobe className="text-[20px]" />
                                </IconButton>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem disabled={i18n.language === 'uz'} onClick={() => changeLanguage("uz")} className="flex items-center justify-start gap-1">
                                    <img className="w-[20px]" src={uzIcon} />
                                    O'zbekcha
                                </MenuItem>
                                <MenuItem disabled={i18n.language === 'ru'} onClick={() => changeLanguage("ru")} className="flex items-center justify-start gap-1">
                                    <img className="w-[20px]" src={ruIcon} />
                                    Русский
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        {/*  */}
                        {!_id ?
                            <>
                                <Button className="hidden md:flex rounded-full" onClick={() => nv('/auth')} color="indigo" variant="gradient">
                                    {t("navbar.auth")}
                                    <BiLogIn className="text-[20px]" />
                                </Button>
                                {/*  */}
                                <IconButton className="md:hidden rounded-full" onClick={() => nv('/auth')} color="indigo" variant="gradient">
                                    <BiLogIn className="text-[20px]" />
                                </IconButton>
                            </>
                            :
                            <>
                                <Button className="hidden md:flex rounded-full" onClick={() => nv('/profile')} color="indigo" variant="gradient">
                                    {t("navbar.profile")}
                                    <BiSolidUser className="text-[20px]" />
                                </Button>
                                {/*  */}
                                <IconButton className="md:hidden rounded-full" onClick={() => nv('/profile')} color="indigo" variant="gradient">
                                    <BiSolidUser className="text-[20px]" />
                                </IconButton>
                            </>
                        }
                    </div>
                </div>
            </div>
            <Drawer open={open} className="p-[10px] lg:hidden" onClose={closeDrawer}>
                <div className="flex items-center justify-between w-full px-[10px] rounded-[10px] h-[50px] bg-gray-100">
                    <Link to={'/'} className="text-[20px] font-lexend font-bold text-indigo-500" onClick={closeDrawer}>
                        ISHIM.UZ
                    </Link>
                    <IconButton onClick={closeDrawer} className="text-[20px]" variant="text">
                        <FaXmark />
                    </IconButton>
                </div>
                <List>
                    <ListItem onClick={() => nv('/vacancies')}>
                        <ListItemPrefix>
                            <FaSuitcase className="text-[18px]" />
                        </ListItemPrefix>
                        <p className="text-[14px]">{t('navbar.vacancies')}</p>
                        <ListItemSuffix>
                            <Chip color="indigo" value={`${stats.vacancies}`} size="sm" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                    {/*  */}
                    <ListItem onClick={() => nv('/categories')}>
                        <ListItemPrefix>
                            <FaListUl className="text-[18px]" />
                        </ListItemPrefix>
                        <p className="text-[14px]">{t('navbar.categories')}</p>
                        <ListItemSuffix>
                            <Chip color="indigo" value={`${stats.categories}`} size="sm" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                    {/*  */}
                    <ListItem onClick={() => nv('/companies')}>
                        <ListItemPrefix>
                            <FaBuilding className="text-[18px]" />
                        </ListItemPrefix>
                        <p className="text-[14px]">{t('navbar.companies')}</p>
                        <ListItemSuffix>
                            <Chip color="indigo" value={`${stats.companies}`} size="sm" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                    {/*  */}
                    {role === 'staff' &&
                        <>
                            <ListItem disabled={disabled} onClick={() => updateRole('employer')}>
                                <ListItemPrefix>
                                    {!disabled ? <FaUser className="text-[18px]" /> : <Spinner />}
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.employer')}</p>
                                <ListItemSuffix>
                                    <FaArrowRight className="rotate-[-45deg] text-indigo-500" />
                                </ListItemSuffix>
                            </ListItem>
                            {/*  */}
                            <ListItem onClick={() => nv('/staff/applications')}>
                                <ListItemPrefix>
                                    <FaEnvelope className="text-[18px]" />
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.myapplications')}</p>
                                <ListItemSuffix>
                                    <Chip color="indigo" value={`${myStats.applications}`} size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem onClick={() => nv('/staff/resume')}>
                                <ListItemPrefix>
                                    <FaFilePdf className="text-[18px]" />
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.resume')}</p>
                            </ListItem>
                        </>
                    }
                    {role === 'employer' &&
                        <>
                            <ListItem disabled={disabled} onClick={() => updateRole('staff')}>
                                <ListItemPrefix>
                                    {!disabled ? <FaUser className="text-[18px]" /> : <Spinner />}
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.staff')}</p>
                                <ListItemSuffix>
                                    <FaArrowRight className="rotate-[-45deg] text-indigo-500" />
                                </ListItemSuffix>
                            </ListItem>
                            {/*  */}
                            {/*  */}
                            <ListItem onClick={() => nv('/employer/applications')}>
                                <ListItemPrefix>
                                    <FaEnvelope className="text-[18px]" />
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.applications')}</p>
                            </ListItem>
                            <ListItem onClick={() => nv('/employer/vacancies')}>
                                <ListItemPrefix>
                                    <FaSuitcase className="text-[18px]" />
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.myvacancies')}</p>
                                <ListItemSuffix>
                                    <Chip color="indigo" value={`${myStats.vacancies}`} size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem className="text-green-500" onClick={() => nv('/employer/addvacancy')}>
                                <ListItemPrefix>
                                    <FaCirclePlus className="text-[18px]" />
                                </ListItemPrefix>
                                <p className="text-[14px]">{t('navbar.addvacancy')}</p>
                                <ListItemSuffix>
                                    <Chip color="indigo" value={`${myStats.applications}`} size="sm" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                        </>
                    }
                    <hr className="my-3" />
                    <ListItem onClick={logOut} className="flex items-center justify-start text-red-500 gap-1">
                        <ListItemPrefix>
                            <BiLogOut className="text-[18px]" />
                        </ListItemPrefix>
                        {t('navbar.logout')}
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;