import React from 'react';
import cn from "classnames"
import style from "./index.module.css"

import Header from "../../components/header"
import Cantact from '../../components/cantact';
import BuilderCard from "../../components/buildcard"
import ToTop from '../../components/jump-to-top';

import { getBuilderList } from '../../service';

export default function Builders() {
    const [headerText, setHeaderText] = React.useState("")
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(50)
    const [data, setData] = React.useState([])

    const handlerHeader = React.useCallback((label) => {
        setHeaderText(label);
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
    return (
        <div className={style.container}>
            <Header onClick={handlerHeader} text={'Builders'}></Header>
            <img src="/images/builders_banner.png" className={cn(style.banner, style.mt)} />

            <div>
                {rander}
            </div>
            {contact ? zhezhao : null}
            {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
            <ToTop></ToTop>
        </div>
    )
}