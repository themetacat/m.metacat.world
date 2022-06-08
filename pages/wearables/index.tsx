import React from 'react';
import cn from "classnames"
import { useRouter, withRouter } from "next/router"

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
function wearables(r) {
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
        if (r.router.query.type) {
            if (r.router.query.type === "wearabledao") {
                router.replace(`/wearables/wearabledao?type=chinesered`)
            } else {
                router.replace(`/wearables/wearabledao?type=pfp`)
            }
        }
    }, [requestData, r])

    React.useEffect(() => {
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])

    const toTopic = React.useCallback((id, c, b) => {
        window.open(`/topic/${c}?type=${b === 1 ? "buildings" : "wearables"}`);
    }, []);
    return (
        <div className={style.container}>

            <Header onClick={handlerHeader} text={"Wearables"} nav={nav}></Header>
            <div className={cn(style.navContainer, fixedState ? style.fixed : null)} id="switch" onClick={() => { setNav(true) }}>
                <div className={style.bg} ></div>
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
            <div className={style.banner} onClick={() => { setNav(true) }}>
                <div className={style.title}>
                    Wearable Creators
                </div>
                <div className={style.text}>
                    <div className={style.hengxian}></div>
                    <div className={style.t}>IN METAVERSE WE BUILD</div>
                    <div className={style.hengxian}></div>
                </div>
            </div>

            <div className={style.cardList} onClick={() => { setNav(true) }}>
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

export default withRouter(wearables)