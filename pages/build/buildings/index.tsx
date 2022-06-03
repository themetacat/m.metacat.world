import React from 'react';
import cn from "classnames"
import { useRouter } from "next/router"

import Header from "../../../components/header"
import Cantact from '../../../components/cantact';
import BuilderCard from "../../../components/buildcard"
import ToTop from '../../../components/jump-to-top';

import { getBuilderList } from '../../../service';

import style from "./index.module.css"

const TAB = [
    {
        label: 'Buliders',
        type: 'buliders',
    },
    {
        label: "Bulidings",
        type: "bulidings",
    },
];

export default function Builders() {
    const router = useRouter()
    const [tabState, setTabState] = React.useState("bulidings");
    const [headerText, setHeaderText] = React.useState("")
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(50)
    const [data, setData] = React.useState([])
    const [nav, setNav] = React.useState(null);
    const [fixedState, setFixedState] = React.useState(false)

    const handlerHeader = React.useCallback((label, t) => {
        setHeaderText(label);
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

    const reqData = React.useCallback(
        async () => {
            const result = await getBuilderList(page, count)
            if (result.code === 100000) {
                setData(result.data.list)
            }
        }, [page, count])

    const rander = React.useMemo(() => {
        return (
            <div className={style.list}>
                {data.map((card) => {
                    return <BuilderCard {...card} mb={style.marginbottom}></BuilderCard>
                })}
            </div>
        )
    }, [data])

    React.useEffect(() => {
        reqData()
    }, [reqData])

    const changeTab = React.useCallback((t) => {
        setTabState(t)
        router.replace(`/build/${t}`)
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
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])
    return (
        <div className={style.container}>
            <Header onClick={handlerHeader} text={'Build'} nav={nav}></Header>
            <div className={cn(style.navContainer, fixedState ? style.fixed : null)} id="switch">
                <div className={style.bg}></div>
                {TAB.map((item, idx) => {
                    return (
                        <div className={cn(style.item, tabState === item.type ? style.action : null)} key={idx} onClick={() => {
                            changeTab(item.type)
                        }}>
                            {item.label}
                        </div>
                    );
                })}

            </div>
            <img src="/images/buildingsBannner.png" className={cn(style.banner)} />

            <div>
                {rander}
            </div>
            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div>
    )
}