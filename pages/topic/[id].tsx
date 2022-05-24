import React from 'react';
import cn from "classnames"
import style from "./index.module.css"
import Header from '../../components/header';
import Cantact from '../../components/cantact';
import ToTop from '../../components/jump-to-top';
import Card from '../../components/card';

import { getTopicDetail, refreshToken, getBaseInfo } from '../../service';
import api from '../../lib/api';


export default function Topic({ base_info, parcel_list, traffic_list }) {
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);

    const [baseInfo, setBaseInfo] = React.useState(base_info);
    const [parcelList, setParcelList] = React.useState(parcel_list);
    const [trafficList, setTrafficList] = React.useState(traffic_list);
    const [nav, setNav] = React.useState(null);

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

    const zhezhao = React.useMemo(() => {
        return <Cantact onClick={changeContactState}></Cantact>;
    }, [contact]);
    return (
        <div>
            <Header onClick={handlerHeader} text={"Builders"} nav={nav}></Header>
            <img src="/images/topic_banner.jpg" className={cn(style.banner, style.mt)} />

            <div className={style.info}>
                <img src={baseInfo.logo_url} className={style.logo} />
                <div className={style.name}>{baseInfo.name}</div>
                <div className={style.lianxi}>
                    <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.website)
                    }}>
                        <img src="/images/topic_home.png" />
                        <div>Home</div>
                    </div>
                    <div className={style.shuxian}></div>
                    <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.twitter)
                    }}>
                        <img src="/images/topic_twitter.png" />
                        <div>Twitter</div>
                    </div>
                    <div className={style.shuxian}></div>
                    <div className={style.item} onClick={() => {
                        jumpToUrl(baseInfo.discord)
                    }}>
                        <img src="/images/topic_vector.png" />
                        <div>Discord</div>
                    </div>
                </div>

                <div className={style.text}>{baseInfo.description}</div>
            </div>
            <div className={style.list}>
                {parcelList.map((item, index) => {
                    return <Card mt={style.marginbottom} {...item} key={index} />;
                })}
            </div>
            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div>
    )
}

export async function getServerSideProps(context) {
    const topic = Number(context.params.id);
    const res = await api.getTopicDetail(topic);
    const { base_info, parcel_list, traffic_list } = res.data;
    return {
        props: {
            base_info,
            parcel_list,
            traffic_list,
        }, // will be passed to the page component as props
    };
}
