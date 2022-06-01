import React from 'react';
import cn from "classnames";
import style from "./index.module.css";

type Props = {
    cls?: string;
    country?: string;
    discord?: string;
    logo_url: string;
    name?: string;
    topic_id?: number;
    twitter?: string;
    website?: string;
    onClick?;
};

export default function InfoCard({
    cls,
    country,
    discord,
    logo_url,
    name,
    topic_id,
    twitter,
    website,
    onClick,
}: Props) {
    return (
        <div className={style.container}
            onClick={() => {
                onClick(topic_id, country);
            }}
        >
            <div className={style.header}>
                <div className={style.img}>
                    <img src={logo_url} />
                </div>
                <div className={style.info}>
                    <div className={style.name}>
                        {name}
                    </div>
                    {country ? <div className={style.country}>
                        country:{country}
                    </div> : null}
                </div>

            </div>
            <div className={style.lianxi}>
                <a href={website}>
                    <div className={style.item}>
                        <img src="/images/icon/home.png" />
                        Home
                    </div>
                </a>
                <div className={style.shuxian}></div>
                <a href={twitter}>

                    <div className={style.item}>
                        <img src="/images/icon/twitter.png" />
                        Twiiter
                    </div>
                </a>
                <div className={style.shuxian}></div>
                <a href={discord}>
                    <div className={style.item}>
                        <img src="/images/icon/discord.png" />
                        Discord
                    </div>
                </a>
            </div>
        </div>
    )
}