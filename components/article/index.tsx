import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import style from './index.module.css';

type Props = {
  mt: string;
  author: string;
  cover_img_url: string;
  desc: string;
  id: number;
  link_url: string;
  source: string;
  time: string
  title: string
};

dayjs.extend(utc);
export default function Event({
  mt,
  author,
  cover_img_url,
  desc,
  id,
  link_url,
  source,
  time,
  title
}: Props) {
  const toParcel = React.useCallback(() => {
    window.open(link_url);
  }, [link_url]);


  return (
    <div className={cn(style.container, mt)} onClick={toParcel}>
      <img src={cover_img_url} className={style.img} />
      <div className={style.detail}>
        <div className={style.title}>{title}</div>
        <div className={style.d}>
            <div>{time}</div>
            <div className={style.source}>{source}</div>
            <div>{author}</div>
        </div>
        <div className={style.text}>{desc}</div>

      </div>
    </div>
  );
}
