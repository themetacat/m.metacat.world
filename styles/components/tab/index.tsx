import React from 'react';
import cn from 'classnames';

import style from './index.module.css';

type Props = {
  action: boolean;
  icon?: string;
  label: string;
  onClick?;
  color?
};

export default ({ action, icon, label, onClick, color }: Props) => {
  return (
    <div className={cn(color, action ? style.container : style.container2)} onClick={onClick}>
      <div className={style.labelorIcon}>
        {icon ? <img src={icon} /> : null}
        <div>{label}</div>
      </div>
    </div>
  );
};
