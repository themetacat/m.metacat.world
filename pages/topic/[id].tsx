import React from 'react';
import cn from "classnames"
import InfiniteScroll from 'react-infinite-scroll-component';
import style from "./index.module.css"
import Header from '../../components/header';
import Cantact from '../../components/cantact';
import ToTop from '../../components/jump-to-top';
import Card from '../../components/card';
import WearableCard from '../../components/wearabledaoCard'

import { getTopicDetail, refreshToken, getBaseInfo } from '../../service';
import api from '../../lib/test';

const NAV = [
    {
        label: 'Buildings',
        type: 'buildings',
    },
    {
        label: 'Wearable',
        type: 'wearable',
    },
];


export default function Topic({ base_info, parcel_list, traffic_list, wearable }) {
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);

    const [baseInfo, setBaseInfo] = React.useState(base_info);
    const [parcelList, setParcelList] = React.useState(parcel_list);
    const [trafficList, setTrafficList] = React.useState(traffic_list);
    const [nav, setNav] = React.useState(null);
    const [tabState, setTabState] = React.useState(parcel_list ? "buildings" : "wearable")
    const [textState, setTextState] = React.useState(false)
    const [fixedState, setFixedState] = React.useState(false)
    const [searchText, setSearchText] = React.useState("")


    const f1 = fixedState && wearable ? style.fixed : null
    // const f2 = fixedState && !wearable ?  : null
    // const f3 = fixedState && wearable ?  : null
    const f4 = wearable && parcel_list.length !== 0 ? style.fixed3 : style.fixed2

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

    const jumpToUrl = React.useCallback(
        (uri) => {
            window.open(uri);
        },
        [null],
    );


    React.useEffect(() => {
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])

    const changeText = React.useCallback((e) => {
        setTextState(true)
        setSearchText(e.target.value)
    }, [])

    const zhezhao = React.useMemo(() => {
        return <Cantact onClick={changeContactState}></Cantact>;
    }, [contact]);


    const search = React.useCallback(() => {
        if (tabState === 'buildings') {
            if (parcelList) {
                if (searchText === '' || searchText === null) {
                    setParcelList(parcelList);
                    return;
                }
                const dataToShow = parcelList.filter((x) => {
                    return (
                        x.description.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1 ||
                        x.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
                    );
                });
                setParcelList(dataToShow);
            }
        }
        if (tabState === 'wearable') {
            if (parcelList) {
                if (searchText === '' || searchText === null) {
                    setParcelList(parcelList);
                    return;
                }
                const dataToShow = parcelList.filter((x) => {
                    return (
                        x.description.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1 ||
                        x.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
                    );
                });
                setParcelList(dataToShow);
            }
        }
    }, [searchText, parcelList, tabState]);

    const scrollLoading = React.useCallback(() => {
        console.log("")
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

    return (
        <div className={style.container}>
            <Header onClick={handlerHeader} text={"Build"} nav={nav}></Header>
            <div className={cn(style.info, style.mt)}>
                <img src={baseInfo.logo_url} className={style.logo} />
                <div className={style.name}>{baseInfo.name}</div>
                {base_info.country ? <div className={style.country}>country : {base_info.country}</div> : null}
                <div className={style.lianxi}>
                    {baseInfo.website ? <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.website)
                    }}>
                        <img src="/images/topic_home.png" />
                        <div>Home</div>
                    </div> : null}
                    {/* <div className={style.shuxian}></div> */}
                    {baseInfo.twitter ? <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.twitter)
                    }}>
                        <img src="/images/topic_twitter.png" />
                        <div>Twitter</div>
                    </div> : null}
                    {/* <div className={style.shuxian}></div> */}
                    {baseInfo.discord ? <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.discord)
                    }}>
                        <img src="/images/topic_vector.png" />
                        <div>Discord</div>
                    </div> : null}
                </div>

                <div className={cn(style.text)}>{baseInfo.description}
                </div>
            </div>
            {
                parcel_list && wearable ? <div className={cn(style.nav, f1)}>
                    {NAV.map((i, idx) => {
                        return <div className={cn(style.item, tabState === i.type ? style.ac : null)}
                            onClick={() => { setTabState(i.type) }}
                            key={idx}
                        >
                            {i.label}
                        </div>
                    })}
                </div> : null
            }
            <div className={(cn(style.search, fixedState ? f4 : null))} id="switch">
                <div className={style.input}>
                    <img src="/images/search.png" className={style.searchImg} />
                    <input type="text" placeholder="Search" value={searchText} onInput={changeText} />
                    <div className={style.btn} onClick={() => { search() }}>Search</div>
                    {searchText ? (
                        <img
                            src="/images/close.png"
                            className={style.close}
                            onClick={() => {
                                setSearchText('');
                            }}
                        />
                    ) : null}
                </div>
            </div>
            <div className={style.list}>
                {parcelList && tabState === "buildings" ? parcelList.map((item, index) => {
                    return <Card mt={style.marginbottom} {...item} key={index} />;
                }) : null}
                {wearable && tabState === "wearable" ? <InfiniteScroll
                    dataLength={wearable.length}
                    hasMore={true}
                    next={scrollLoading}
                    loader={<div className={style.bottom}></div>}
                >
                    <WearableCard card={wearable} tabState={tabState} ></WearableCard>
                </InfiniteScroll > : null}
            </div>
            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div >
    )
}

export async function getServerSideProps(context) {
    let res = null;
    if (Number(context.params.id)) {
        const topic = Number(context.params.id);
        res = await api.req_topic_detail(topic, undefined);
    } else {
        res = await api.req_topic_detail(undefined, context.params.id);
    }
    const { base_info, parcel_list, traffic_list, wearable } = res.data;
    return {
        props: {
            base_info,
            parcel_list,
            traffic_list,
            wearable,
        }, // will be passed to the page component as props
    };
}
