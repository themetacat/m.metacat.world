import React from 'react';
import cn from "classnames"
import style from "./index.module.css"

type Props = {
    img_url_list?
    name?: string
    topic_id?: number
    mb?: string
    cover_img?: string
    detail_url?: string
}

export default function Card({ img_url_list, name, topic_id, mb, cover_img, detail_url }: Props) {
    return (
        <a onClick={() => {
            if (topic_id) {
                window.open(`/topic/${topic_id}`)
            } else {
                window.open(detail_url)
            }
        }} target="_blank">
            <div className={cn(style.container, mb)}>
                <div className={style.imgContainer}>
                    {img_url_list && img_url_list.length !== 0 ? img_url_list.map((i) => {
                        if (i === "https://poster-phi.vercel.app/metacat_logo.png") {
                            return <div className={style.i}><img src={i} className={style.img} /></div>
                        }
                        return <img src={i} className={style.img2} />

                    }) :
                        <img src={cover_img} className={style.img3} />
                    }
                </div>
                <div className={style.text}>
                    {name}
                </div>
            </div>
        </a>
    )
}