import React from 'react';

import cn from 'classnames';
import { useRouter, withRouter } from "next/router"
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../../components/header';
import Cantact from '../../../components/cantact';
import ToTop from '../../../components/jump-to-top';
import Tab from '../../../components/tab';
import Card from '../../../components/wearabledaoCard'
import { getDaoWearableList, getOkxWearableList } from '../../../service';
import { req_pfp_list } from "../../../service/z_api"
import style from './index.module.css';

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

const Nav = [
    {
        label: 'Chinese Red',
        type: 'chinesered',
    },
    {
        label: 'PFP',
        type: 'pfp',
    },
];


function Wearables(r) {
    const router = useRouter()
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [tabState, setTabState] = React.useState("wearabledao");
    const [navState, setNavState] = React.useState(r.router.query.type || "chinesered")
    const [text, setText] = React.useState("")
    const [data, setData] = React.useState([])
    const [fixedState, setFixedState] = React.useState(false);

    const [nav, setNav] = React.useState(null);


    const reqData = React.useCallback(
        async () => {
            let result = null
            if (navState === "chinesered") {
                result = await getDaoWearableList()
            }
            if (navState === "pfp") {
                result = await req_pfp_list()
            }
            if (result && result.code === 100000) {
                setData(result.data)
            }
        }, [navState])

    const handlerHeader = React.useCallback((label, t = false) => {
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

    const scrollLoading = React.useCallback(() => {
        console.log("")
    }, [])

    const rander = React.useMemo(() => {
        return (
            <InfiniteScroll
                dataLength={data.length}
                hasMore={true}
                next={scrollLoading}
                loader={<div className={style.bottom}></div>}
            >
                <Card card={data} tabState={navState} ></Card>
            </InfiniteScroll >
        )
    }, [data, navState, scrollLoading])

    const changeTab = React.useCallback(
        (label, l) => {
            setTabState(label)
            reqData();
            router.replace(l)
        }, [reqData])

    const search = React.useCallback((t) => {
        console.log("")
    }, [])
    const changeText = React.useCallback((e) => {
        setText(e.target.value)
    }, [])

    React.useEffect(() => {

        reqData()
    }, [reqData])


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
            <Header onClick={handlerHeader} text={"Wearables"} nav={nav} />

            <div id="switch" className={cn(fixedState ? style.fx : style.n)}>
                <div className={cn(style.navContainer)}>
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
            </div>

            {
                navState === "chinesered" ? <div className={style.nav}>
                    <img src="/images/group.png" />
                    <div className={style.title}>
                        WearableDao
                    </div>
                    <div className={style.td}>
                        <a href="https://twitter.com/WearableDao">
                            <div className={style.item}>
                                <img src="/images/topic_twitter.png" />
                                <div>Twitter</div>
                            </div>
                        </a>
                        <div className={style.shuxian}>
                        </div>
                        <a href="https://discord.gg/t3Wrb4JvDF">
                            <div className={style.item}>
                                <img src="/images/topic_vector.png" />
                                <div>Discord</div>
                            </div>
                        </a>
                    </div>
                    <div className={style.text}>
                        WearableDao was co-founded by MetaCat, MetaEstate and MetaLandscape to design and produce Wearables in Metaverse.
                    </div>
                </div> : null
            }
            {
                navState === "pfp" ? <div className={style.nav}>
                    <img src="/images/pfp.jpg" />
                    <div className={style.title}>
                        PFP
                    </div>
                    <div className={style.td}>
                        <a href="https://www.cryptovoxels.com/play?coords=N@409E,630N">
                            <div className={style.item}>
                                <img src='/images/pfp_home.svg' />
                                <div>Home</div>
                            </div>
                        </a>
                        <div className={style.shuxian}>
                        </div>
                        <a href="https://twitter.com/WearableDao">
                            <div className={style.item}>
                                <img src="/images/topic_twitter.png" />
                                <div>Twitter</div>
                            </div>
                        </a>
                    </div>
                    <div className={style.text}>
                        The PFP Metaverse Carnival, co-hosted by WearableDao, MetaEstate, MetaCat, MetaLandscape, and TingDao, will be grandly launched on May 20! The most interesting part of this event is that everyone can make their favorite NFTs into Wearables and wear them by participating in the event, so that NFTs can "live".
                    </div>
                </div> : null
            }
            <div className={cn(style.twoNav, fixedState ? style.fx2 : null)}>
                {Nav.map((i, idx) => {
                    return <div key={idx} className={cn(style.item, navState === i.type ? style.ac : null)} onClick={() => {
                        setNavState(i.type)
                    }}>
                        {i.label}
                    </div>
                })}
            </div>
            <div className={(cn(style.search, fixedState ? style.fx3 : null))} id="switch">
                <div className={style.input}>
                    <img src="/images/search.png" className={style.searchImg} />
                    <input type="text" placeholder="Search" value={text} onInput={changeText} />
                    <div className={style.btn} onClick={() => { search(text) }}>Search</div>
                    {text ? (
                        <img
                            src="/images/close.png"
                            className={style.close}
                            onClick={() => {
                                setText('');
                            }}
                        />
                    ) : null}
                </div>
            </div>
            <div className={style.cardList}>
                {rander}
            </div>

            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div >
    )
}



export default withRouter(Wearables)