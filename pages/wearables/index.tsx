import React from 'react';
import cn from "classnames"
import { useRouter } from "next/router"

import style from "./index.module.css";
import Header from '../../components/header';
import ToTop from '../../components/jump-to-top';
import Cantact from '../../components/cantact';
import InfoCard from "../../components/info_card"

import { req_wearable_creators } from '../../service/z_api';

const TAB = [
    {
        label: 'Creators',
        type: 'creators',
        link: '/wearables',
    },
    {
        label: 'WearableDao',
        type: 'wearabledao',
        link: '/wearables/wearabledao',
    },
]
export default function wearables() {
    const router = useRouter()
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);

    const [fixedState, setFixedState] = React.useState(false)
    const [tabState, setTabState] = React.useState("creators")
    const [nav, setNav] = React.useState(null);
    const [data, setData] = React.useState([])

    const requestData = React.useCallback(async () => {
        const result = await req_wearable_creators()
        if (result.code === 100000) {
            setData(result.data)
        }
    }, [])
    const handlerHeader = React.useCallback((label, t) => {
        if (label === 'Contact Us') {
            setContact(true);
        }
        setNav(t)
    }, []);
    const changeContactState = React.useCallback((state, wxstate) => {
        setContact(state);
        setWxState(wxstate);
    }, []);
    const zhezhao = React.useMemo(() => {
        return <Cantact onClick={changeContactState}></Cantact>;
    }, [contact]);

    const changeTab = React.useCallback((t, l) => {

        router.replace(l)
    }, [])
    React.useEffect(() => {
        const listener = () => {
            if (document.getElementById('switch') && window.scrollY > 204) {
                setFixedState(true);
            } else {
                setFixedState(false);
            }
        };
        document.addEventListener('scroll', listener);
        return () => document.removeEventListener('scroll', listener);
    }, [fixedState]);
    
    React.useEffect(() => {
        requestData()
    }, [requestData])

    React.useEffect(() => {
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])

    const toTopic = React.useCallback((id, c) => {
        window.open(`/topic/${c}`);
    }, []);
    return (
        <div>

            <Header onClick={handlerHeader} text={"Wearables"} nav={nav}></Header>
            <div className={cn(style.navContainer, fixedState ? style.fixed : null)} id="switch">
                <div className={style.bg}></div>
                {TAB.map((item, idx) => {
                    return (
                        <div className={cn(style.item, tabState === item.type ? style.action : null)} key={idx} onClick={() => {
                            changeTab(item.type, item.link)
                        }}>
                            {item.label}
                        </div>
                    );
                })}

            </div>
            <div className={style.bg}><img src="/images/creartorsBanner.png" /></div>

            <div className={style.cardList}>
                {data.map((card, idx) => {
                    return <InfoCard {...card} key={idx} onClick={toTopic}></InfoCard>
                })}
            </div>
            {contact ? zhezhao : null}

            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}

            <ToTop></ToTop>
        </div>
    )
}