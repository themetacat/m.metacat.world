import React from 'react';

import cn from 'classnames';


import Header from '../../components/header';
import Cantact from '../../components/cantact';
import ToTop from '../../components/jump-to-top';
import Tab from '../../components/tab';
import Card from '../../components/wearabledaoCard'
import { getDaoWearableList, getOkxWearableList } from '../../service';

import style from './index.module.css';

// const TAB = [
//     {
//         label: "WearableDao"
//     },
//     // {
//     //     label: "Wearables for OKX"
//     // }
// ]

export default function WearableDao() {
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [tabState, setTabState] = React.useState("WearableDao")
    const [text, setText] = React.useState("")
    const [data, setData] = React.useState([])

    const [fixedState, setFixedState] = React.useState(false);


    const [allScene, setAllScene] = React.useState([]);
    const renderer = React.useRef(null);
    const canvaRef = React.useRef(null);
    const animationRef = React.useRef(null);
    const offsetY = React.useRef(null);

    const reqData = React.useCallback(
        async () => {
            const result = await getDaoWearableList()
            if (result.code === 100000) {
                setData(result.data)
            }
        }, [])

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
    

    const rander = React.useMemo(() => {
        return (
            <Card card={data}></Card>
        )
    }, [data])

    const changeTab = React.useCallback(
        (label) => {
            setTabState(label)
        }, [])

    const search = React.useCallback((t) => {
        console.log(t)
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
        <div>
            <Header onClick={handlerHeader} text={"WerrableDao"} />

            <div className={style.nav}>
                {/* <div className={style.tab}>
                    {TAB.map((item) => {
                        return (
                            <Tab
                                key={item.label}
                                action={tabState === item.label}
                                label={item.label}
                                onClick={() => {
                                    changeTab(item.label);
                                }}
                                color={style.tabColor}
                            />
                        );
                    })}
                </div> */}
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
            </div>
            <div className={(cn(style.search, fixedState ? style.fix : null))} id="switch">
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