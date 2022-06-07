import React from 'react';
// import cn from 'classnames';

import style from './index.module.css';

const lianxi = [
  {
    label: 'Discord',
    icon: '/images/discord.png',
  },
  {
    label: 'Twitter',
    icon: '/images/twitter.png',
  },
  {
    label: 'Medium',
    icon: '/images/medium.png',
  },
  {
    label: 'Wechat',
    icon: '/images/weixin.png',
  },
  {
    label: "Mirror",
    icon: "/images/mirror.png",
  },
  {
    label: "YouTube",
    icon: "/images/YouTube.svg",
  },
  {
    label: 'metacat@tutanota.com',
    icon: '/images/youxiang.png',
  },
];

type Props = {
  onClick?;
};

export default function Cantact({ onClick }: Props) {
  const [cantactState, setCantactState] = React.useState(true);

  return (
    <div>
      {cantactState ? (
        <div className={style.lianxi}>
          <div className={style.title}>Contact Us</div>
          {/* {
                    lianxi.map((item) => {
                        return (
                            <div className={style.item}>
                                <img src={item.icon} />
                                <div>{item.label}</div>
                            </div>
                        )
                    })
                } */}
          <a href="https://discord.gg/yRt6be237P" target="_blank" data-tip="Discord">
            <div className={style.item}>
              <img src={lianxi[0].icon} />
              <div>{lianxi[0].label}</div>
            </div>
          </a>

          <a href="https://twitter.com/Metacat007" target="_blank" data-tip="Twitter">
            <div className={style.item}>
              <img src={lianxi[1].icon} />
              <div>{lianxi[1].label}</div>
            </div>
          </a>
          <a href="https://medium.com/@themetacat" target="_blank" data-tip="Medium">
            <div className={style.item}>
              <img src={lianxi[2].icon} />
              <div>{lianxi[2].label}</div>
            </div>
          </a>

          <div
            className={style.item}
            onClick={() => {
              onClick(true, true);
              setCantactState(false);
            }}
          >
            <img src={lianxi[3].icon} />
            <div>{lianxi[3].label}</div>
          </div>
          <a href="https://mirror.xyz/0xE069160b21d23fB8Edad4F8B42f6b91f7b77F22A">
            <div className={style.item}>
              <img src={lianxi[4].icon} />
              <div>{lianxi[4].label}</div>
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCeZkqQ-CsIxjKeQJx3zOSGA">
            <div className={style.item}>
              <img className={style.YouTube} src={lianxi[5].icon} />
              <div >{lianxi[5].label}</div>
            </div>
          </a>

          <a href="mailto:metacat@tutanota.com" data-tip="metacat@tutanota.com">
            <div className={style.item}>
              <img src={lianxi[6].icon} />
              <div>{lianxi[6].label}</div>
            </div>
          </a>
        </div>
      ) : null}

      <div
        className={style.zhezhao}
        onClick={() => {
          onClick(false, false);
        }}
      ></div>
    </div>
  );
}
