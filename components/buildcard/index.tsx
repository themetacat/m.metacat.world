import React from 'react';
import cn from "classnames"
import style from "./index.module.css"

type Props = {
    img_url_list?
    name?: string
    topic_id?: number
    mb?: string
}

export default function Card({ img_url_list, name, topic_id, mb }: Props) {
    return (
        <a href={`/topic/${topic_id}`} target="_blank">
            <div className={cn(style.container, mb)}>
                <div className={style.imgContainer}>
                    {img_url_list.map((i) => {
                        if (i === "https://poster-phi.vercel.app/metacat_logo.png") {
                            return <div className={style.i}><img src={i} className={style.img} /></div>
                        } else {
                            return <img src={i} className={style.img2} />
                        }
                    })}
                </div>
                <div className={style.text}>
                    {name}
                </div>
            </div>
        </a>
    )
}