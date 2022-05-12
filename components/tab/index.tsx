import React from 'react';
import cn from "classnames"

import style from "./index.module.css"

type Props = {
    action: boolean,
    icon: string,
    label: string,
    onClick?
}

export default ({ action, icon, label, onClick }: Props) => {
    return (
        <div className={cn(action ? style.container : style.container2)} onClick={onClick}>
            <div className={style.labelorIcon}>
                <img src={icon} />
                <div>{label}</div>
            </div>
        </div>
    )
}