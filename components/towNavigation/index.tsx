import React from 'react';
import cn from "classnames"
import Link from 'next/link';
import style from "./index.module.css"

type Props = {
    options?
}

export default function TowNavigation({ options }: Props) {
    return <div className={style.container}>
        {options.map((i, idx) => {
            return <div className={style.item} key={idx}>
                <Link href={i.link}>
                    {i.label}
                </Link>
            </div>
        })}
    </div>
}