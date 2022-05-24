import React from 'react';
import cn from "classnames"
import { useRouter } from "next/router"

import style from "./index.module.css";

import Header from '../../components/header';
import Footer from '../../components/footer';
import Cantact from '../../components/cantact';
import ToTop from '../../components/jump-to-top';
import Search from '../../components/learnSearch';
import Article from '../../components/article';

import { req_learn_article_list, req_learn_report_list } from '../../service/z_api';

const Tab = [
    {
        label: "Articles",
        type: "articles"
    },
    {
        label: "MetaCat Report",
        type: "report"
    }
]

const ps = [
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'Chinese',
        value: 'zh',
    },
];

export default function Learn() {
    const router = useRouter()
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);

    const [tabState, setTabState] = React.useState(Tab[0].label)
    const [showLangState, setShowLangState] = React.useState(false);
    const [langState, setLangState] = React.useState(ps[0].value)
    const [langLabel, setLangLabel] = React.useState(ps[0].label);

    const [totalPage, setTotalPage] = React.useState(null);
    const [dataSource, setDataSource] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(50);
    const [searchText, setSearchText] = React.useState('');

    const [nav, setNav] = React.useState(null);

    const handlerHeader = React.useCallback((label, t) => {
        if (label === 'Contact Us') {
            setContact(true);
        }
        setNav(t)
    }, []);

    const requestData = React.useCallback(
        async (p, c, t, type) => {
            let result = null;
            if (type === 'Articles' && type) {
                result = await req_learn_article_list(p, c, t);
            }
            if (type === 'MetaCat Report' && type) {
                result = await req_learn_report_list(p, c, t);
            }
            if (result?.code === 100000 && result.data.list.length !== 0) {
                setDataSource(result.data.list);
                setTotalPage(result.data.total_page);
            }
        },
        [page, count, langState],
    );

    const changeContactState = React.useCallback((state, wxstate) => {
        setContact(state);
        setWxState(wxstate);
    }, []);
    const zhezhao = React.useMemo(() => {
        return <Cantact onClick={changeContactState}></Cantact>;
    }, [contact]);

    const changeTab = React.useCallback((i, t) => {
        setTabState(i)
        router.replace(`/learn?type=${t}`)
    }, [])

    const onSearchHandler = React.useCallback(
        async (text: string) => {
            if (text) {
                const d = dataSource.filter((item) => {
                    return (
                        item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
                        item.desc.toLocaleLowerCase().includes(text.toLocaleLowerCase())
                    );
                });
                setDataSource(d);
            } else {
                requestData(page, count, langState, tabState);
            }
            setSearchText(text);
            // const data = await requestData({
            //     tab: tabState,
            //     subTab: subTabState,
            //     query: text,
            //     page: 1,
            //     type: typeState,
            //     needUpdateTypeList: true,
            // });

            // setDataSource(data);
        },
        [],
    );

    const changeLangState = React.useCallback(
        (value, label) => {
            setLangState(value)
            setLangLabel(label)
        }, [])


    const rander = React.useMemo(() => {
        return <div>
            {dataSource.map((item, idx) => {
                return <Article mt={style.marginbottom} {...item} key={idx}></Article>
            })}
        </div>
    }, [dataSource])

    React.useEffect(() => {
        requestData(page, count, langState, tabState)
    }, [tabState, langState, page, count])


    React.useEffect(() => {
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])
    
    return (
        <div>
            <Header onClick={handlerHeader} text={"Learn"} nav={nav}></Header>
            <img src="/images/learn_banner.png" className={cn(style.banner, style.mt)} />
            <div className={style.nav}>
                <div className={style.bg}></div>
                {Tab.map((item, idx) => {
                    return <div className={cn(style.item, tabState === item.label ? style.action : null)} key={idx} onClick={() => {
                        changeTab(item.label, item.type)
                    }}>
                        {item.label}
                    </div>
                })}
            </div>
            <div className={style.search}>
                <div></div>
                <div className={style.toright}>

                    <Search onSearch={onSearchHandler}></Search>
                    <div className={style.language} onClick={() => { setShowLangState(!showLangState) }}>
                        {langLabel}
                        <img src={`/images/${showLangState ? 'Frame-up.png' : 'Frame-down.png'}`} />
                        <div className={style.l}>
                            {showLangState ? ps.map((item, idx) => {
                                return <div key={idx} className={style.itm} onClick={() => {
                                    changeLangState(item.value, item.label)
                                }}>
                                    {item.label}
                                </div>
                            }) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.cardContainer}>
                {rander}
            </div>
            {contact ? zhezhao : null}

            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}

            <ToTop></ToTop>
        </div>
    )
}