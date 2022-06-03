import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import style from './index.module.css';

type Props = {
  mt: string;
  activity_time: string;
  cover_img: string;
  description: string;
  event_detail_url: string;
  event_parcel_url: string;
  name: string;
};

dayjs.extend(utc);
export default function Event({
  mt,
  activity_time,
  cover_img,
  description,
  event_detail_url,
  event_parcel_url,
  name,
}: Props) {
  const toParcel = React.useCallback(() => {
    window.open(event_parcel_url);
  }, [event_parcel_url]);

  const toDetail = React.useCallback(() => {
    window.open(event_detail_url);
  }, [event_detail_url]);

  const inTimeLine = React.useCallback(() => {
    if (!activity_time) {
      return false;
    }
    const times = activity_time.split('--');
    const start = times[0].trim();
    const end = times[1].trim();
    if (!start || !end) {
      return false;
    }
    const time1 = dayjs.utc(start);
    const time2 = dayjs.utc(end);
    const n = Date.now();
    if (time1.valueOf() <= n && time2.valueOf() >= n) {
      return true;
    }
    return false;
  }, [activity_time]);
  const hasEntry = inTimeLine();
  return (
    <div className={cn(style.container, mt)} onClick={toParcel}>
      <img src={cover_img} className={style.img} />
      <div className={style.detail}>
        <div className={style.title}>{name}</div>
        <div className={style.time}>{activity_time}</div>
        <div className={style.text}>{description}</div>
        {hasEntry ? (
          <div className={style.enter} onClick={toDetail}>
            Enter
          </div>
        ) : null}
      </div>
    </div>
  );
}
