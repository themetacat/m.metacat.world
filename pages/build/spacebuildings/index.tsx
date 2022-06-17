import React from 'react';
import cn from "classnames"
import { useRouter } from "next/router"
import InfiniteScroll from 'react-infinite-scroll-component';

import Header from "../../../components/header"
import Cantact from '../../../components/cantact';
import BuilderCard from "../../../components/buildcard"
import ToTop from '../../../components/jump-to-top';
import Footer from '../../../components/footer';
import { getBuilderList } from '../../../service';
import { req_space_buildings_list } from "../../../service/z_api"

import style from "./index.module.css"

const TAB = [
    {
        label: 'Builders',
        type: 'builders',
    },
    {
        label: "Buildings",
        type: "buildings",
    },
    {
        label: 'Space Buildings',
        type: 'spacebuildings',
    },
];

export default function Builders() {
    const router = useRouter()
    const [tabState, setTabState] = React.useState("spacebuildings");
    const [headerText, setHeaderText] = React.useState("")
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(80)
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
            const result = await req_space_buildings_list(page, count)
            if (result.code === 100000) {
                setData(result.data)
            }
        }, [page, count])

    const scrollLoading = React.useCallback(async () => {
        const p = page + 1
        const result = await req_space_buildings_list(p, count)
        if (result.code === 100000) {
            setData([...data, ...result.data])
        }

    }, [page, count, data])

    const rander = React.useMemo(() => {
        return (
            <div className={style.list} onClick={() => { setNav(true) }}>
                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={true}
                    next={scrollLoading}
                    loader={<Footer length={data.length} />}
                >
                    {data.map((card) => {
                        return <BuilderCard {...card} mb={style.marginbottom}></BuilderCard>
                    })}
                </InfiniteScroll>
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
            <div className={cn(style.navContainer, fixedState ? style.fixed : null)} id="switch" onClick={() => { setNav(true) }}>
                <div className={style.bg}></div>
                {TAB.map((item, idx) => {
                    return (
                        <div className={cn(style.item, tabState === item.type ? style.action : null)} key={idx} onClick={() => {
                            changeTab(item.type)
                            setNav(true)
                        }}>
                            {item.label}
                        </div>
                    );
                })}

            </div>
            <div className={style.b} onClick={() => { setNav(true) }}>
                <img src="/images/BuildingsBanner.png" className={cn(style.banner)} />
            </div>

            <div>
                {rander}
            </div>
            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div>
    )
}