import React from "react";
import cn from "classnames"
import { useRouter } from "next/router"
import Header from "../../../components/header"
import ToTop from '../../../components/jump-to-top';
import Cantact from '../../../components/cantact';

import { req_buid_builders_list } from "../../../service/z_api"

import InfoCard from "../../../components/info_card"

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
];

const TwoNav = [
    {
        type: "Institutions"
    },
    {
        type: "Individuals"
    }
]

export default function Buildings() {
    const router = useRouter()
    const [tabState, setTabState] = React.useState(TAB[0].type);
    const [headerText, setHeaderText] = React.useState("")
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [twoNavState, setTwoNavState] = React.useState("Institutions")
    const [individuals, setIndividuals] = React.useState([])
    const [institution, setInstitution] = React.useState([])
    const [fixedState, setFixedState] = React.useState(false)
    const [nav, setNav] = React.useState(null);
    const [anchor, setAnchor] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const requestData = React.useCallback(async () => {
        setLoading(true)
        const result = await req_buid_builders_list()
        if (result.code === 100000) {
            setIndividuals(result.data.individuals)
            setInstitution(result.data.institution)
        }
        setLoading(false)
    }, [])

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

    const changeTab = React.useCallback((t) => {
        setTabState(t)
        router.replace(`/build/${t}`)
    }, [])

    const changeTwoNavState = React.useCallback((t) => {
        setTwoNavState(t)
    }, [])

    React.useEffect(() => {
        const listener = () => {
            if (document.getElementById('switch') && window.scrollY > 204) {
                if (!anchor) {
                    setFixedState(true);
                } else {
                    setAnchor(false)
                }
            } else {
                setFixedState(false);
            }
        };
        document.addEventListener('scroll', listener);
        return () => document.removeEventListener('scroll', listener);
    }, [anchor]);

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
        window.open(`/topic/${id}?type=buildings`);
    }, []);
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
            <div className={style.bg}><img src="/images/buildersBanner.png" /></div>
            <div className={cn(style.twoNav, fixedState ? style.fix : null)}>
                {
                    TwoNav.map((i, idx) => {
                        return <a href={i.type === "Institutions" ? "#Institutions" : "#Individuals"}>
                            <div key={idx} className={cn(style.twoNavItem, twoNavState === i.type ? style.action : null)} onClick={() => {
                                changeTwoNavState(i.type)
                                setFixedState(false);
                                setAnchor(true)
                            }}>
                                {i.type}
                            </div>
                        </a>
                    })
                }
            </div>
            <div className={style.cardList}>
                <div className={style.title} >
                    <div className={style.Institutions} id="Institutions"></div>
                    <div></div>
                    Institutions
                </div>
                <div className={style.c}>
                    {loading ? <img src="/images/loading.png" className={style.loading} /> : institution.map((card, idx) => {
                        return <InfoCard {...card} key={idx} onClick={toTopic}></InfoCard>
                    })}
                </div>
                <div className={style.title}>
                    <div className={style.Individuals} id="Individuals"></div>
                    <div></div>
                    Individuals
                </div>
                <div className={style.c}>
                    {loading ? <img src="/images/loading.png" className={style.loading} /> : individuals.map((card, idx) => {
                        return <InfoCard {...card} key={idx} onClick={toTopic}></InfoCard>
                    })}
                </div>
            </div>

            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div>
    )
}
