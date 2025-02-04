import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Drawer, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../utils/i18n'
import { BiLogIn, BiSolidUser } from "react-icons/bi";
import { FaBars, FaBuilding, FaGlobe, FaListUl, FaSuitcase } from "react-icons/fa";
import uzIcon from '../assets/uz.png';
import ruIcon from '../assets/ru.png';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { fetchData } from "../utils/requests";
function Navbar() {
    const nv = useNavigate();
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang)
    };
    const { _id } = useSelector(e => e?.user);
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
    }, [])
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
                                {t('navbar.vacancies')}( {stats.vacancies} )
                            </Link>
                            <Link className="text-[14px]" to={'/categories'}>
                                {t('navbar.categories')}( {stats.categories} )
                            </Link>
                            <Link className="text-[14px]" to={'/companies'}>
                                {t('navbar.companies')}( {stats.companies} )
                            </Link>
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
                                    {t("navbar.login")}
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
            <Drawer open={open} className="p-[10px]" onClose={closeDrawer}>
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
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;