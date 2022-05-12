import React from 'react';

import cn from 'classnames';

import style from './index.module.css';

type Props = {
  mt: string;
  cover_img_url: string;
  description: string;
  name: string;
  opensea_url: string;
  parcel_page_url: string;
  type: string;
};

export default function Card({
  mt,
  cover_img_url,
  description,
  name,
  opensea_url,
  parcel_page_url,
  type,
}: Props) {
  const toParcel = React.useCallback(() => {
    window.open(parcel_page_url);
  }, [parcel_page_url]);

  const toOpensea = React.useCallback(() => {
    window.open(opensea_url);
  }, []);
  return (
    <div className={cn(style.container, mt)} onClick={toParcel}>
      <div className={style.container2}>
        <div className={style.banner}>
          <img src={cover_img_url} className={style.banner}></img>
          <div className={style.type}>{type}</div>
        </div>
        <div className={style.title}>
          <div>{name}</div>
          <img src="/images/Nomal.png" onClick={toOpensea} />
        </div>
        <div className={style.detailText}>{description}</div>
      </div>
    </div>
  );
}
