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
    is_buildings?: number
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
    is_buildings
}: Props) {
    return (
        <div className={style.container}
            onClick={() => {
                onClick(topic_id, name, is_buildings);
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
                        Country : {country}
                    </div> : null}
                </div>

            </div>
            <div className={style.lianxi}>
                {website ? <a href={website}>
                    <div className={style.item}>
                        <img src="/images/icon/home.png" />
                        Home
                    </div>
                </a> : null}
                {/* <div className={style.shuxian}></div> */}
                {twitter ? <a href={twitter}>

                    <div className={style.item}>
                        <img src="/images/icon/twitter.png" />
                        Twiiter
                    </div>
                </a> : null}
                {/* <div className={style.shuxian}></div> */}
                {discord ? <a href={discord}>
                    <div className={style.item}>
                        <img src="/images/icon/discord.png" />
                        Discord
                    </div>
                </a> : null}
            </div>
        </div>
    )
}