import React from 'react';

import cn from 'classnames';
import { useRouter } from 'next/router';


import style from './index.module.less';

type Props = {
    mb?: string
    artist?
    artwork?
    id?
}
export default function Card({ mb, artist, artwork, id }: Props) {

    const router = useRouter()

    const toOpensea = React.useCallback(() => {
        window.open(artwork.opensea_url);
    }, []);

    const toDetail = React.useCallback(() => {
        router.replace(`/wearabledao/detail/${id}`)
    }, [])
    return <div className={cn(style.container, mb)}>
        <div className={style.zhanwei}>
            <img src="/images/Nomal.png" onClick={toOpensea} />
        </div>
        <div className={style.detail} onClick={toDetail}>
            <div className={style.title}>
                {artwork.name}
            </div>
            <div className={style.text}>Voxel Artist</div>
            <div className={style.name}>{artist.name}</div>

            <div className={style.toDetail} >
                Detail
                <img src="/images/you.png" />
            </div>
        </div>
    </div>
}