import React from 'react';

import cn from 'classnames';
import { useRouter } from 'next/router';
import Header from '../../../components/header';
import Cantact from '../../../components/cantact';
import ToTop from '../../../components/jump-to-top';

import style from './index.module.css';

import api from '../../../lib/api';

export default function Detail({ artwork, artist, id }) {
    const router = useRouter()
    console.log(artwork, artist, id)
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [tabState, setTabState] = React.useState("WearableDao")
    const [text, setText] = React.useState("")

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

    const toWearableDao = React.useCallback(() => {
        router.replace("/wearabledao")
    }, [])

    const toOpensea = React.useCallback(() => {
        window.open(artwork.opensea_url);
    }, []);

    
    
    return <div>
        <Header onClick={handlerHeader} text={"WerrableDao"} />
        <div className={style.nav}>
            <div onClick={toWearableDao}>Wearables</div>
            <img src="/images/you.png" />
            <div className={style.name}>{artwork.name}</div>
        </div>
        <div className={style.container}>
            <div className={style.card}>
                <img src="/images/Nomal.png" onClick={toOpensea} />
            </div>
        </div>
        <div className={style.detail}>
            
        </div>
        {contact ? zhezhao : null}
        {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
        <ToTop></ToTop>
    </div>
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await api.getDaoWearableDetail(id);
    const { artwork, artist } = res.data[0];
    return {
        props: {
            artwork,
            artist,
            id,
        }, // will be passed to the page component as props
    };
}
