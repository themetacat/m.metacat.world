import React from 'react';
// import cn from 'classnames';

import style from './index.module.css';

type Props = {
  length: number
}

export default function Footer({ length }: Props) {
  return (
    <div className={style.container}>
      {length !== 0 ?
        <div className={style.loding}>
          <img src="/images/loading.png" className="animate-spin w-8 h-8" />
          <div>loading</div>
        </div> :
        <div className={style.content}>No more content~</div>
      }

    </div>
  );
}
