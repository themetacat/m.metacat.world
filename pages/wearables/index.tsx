import React from 'react';

import cn from 'classnames';
import { useRouter, withRouter } from "next/router"
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/header';
import Cantact from '../../components/cantact';
import ToTop from '../../components/jump-to-top';
import Tab from '../../components/tab';
import Card from '../../components/wearabledaoCard'
import { getDaoWearableList, getOkxWearableList } from '../../service';
import { req_pfp_list } from "../../service/z_api"
import style from './index.module.css';


const TAB = [
    {
        label: 'WearableDao',
        type: 'wearabledao',
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
    const [tabState, setTabState] = React.useState(r.router.query.type || "wearabledao")
    const [text, setText] = React.useState("")
    const [data, setData] = React.useState([])
    const [fixedState, setFixedState] = React.useState(false);



    const reqData = React.useCallback(
        async () => {
            let result = null
            if (tabState === "wearabledao") {
                result = await getDaoWearableList()
            }
            if (tabState === "pfp") {
                result = await req_pfp_list()
            }
            if (result && result.code === 100000) {
                setData(result.data)
            }
        }, [tabState])

    const handlerHeader = React.useCallback((label) => {
        if (label === 'Contact Us') {
            setContact(true);
        }
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
                <Card card={data} tabState={tabState} ></Card>
            </InfiniteScroll >
        )
    }, [data, tabState, scrollLoading])

    const changeTab = React.useCallback(
        (label) => {
            setTabState(label)
            reqData();
            router.replace(`/wearables?type=${label}`)
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


    return (
        <div className={style.container}>
            <Header onClick={handlerHeader} text={"Wearables"} />

            <div id="switch" className={cn(style.n,)}>
                <div className={cn(style.navContainer)}>
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
            </div>

            {tabState === "wearabledao" ? <div className={style.nav}>
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
            </div> : null}
            {tabState === "pfp" ? <div className={style.nav}>
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
            </div> : null}
            <div className={(cn(style.search, fixedState ? style.fx : null))} id="switch">
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