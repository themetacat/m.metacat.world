import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import style from './index.module.css';

import TwoNavigation from "../towNavigation"


const page = [
  {
    label: 'Home',
  },
  {
    label: 'Build',
  },
  {
    label: 'Wearables',
  },
  {
    label: 'Learn',
  },
  {
    label: 'Contact Us',
  },
];

const build = [
  {
    label: "Buliders",
    type: "buliders",
    link: '/build/buliders',
  },
  {
    label: "Bulidings",
    type: "bulidings",
    link: '/build/buildings',
  }
]
const wearable = [
  {
    label: 'Creators',
    type: 'creators',
    link: '/wearables',
  },
  {
    label: 'WearableDao',
    type: 'wearabledao',
    link: '/wearables/wearabledao',
  },
];

type Props = {
  onClick?;
  text: string;
  nav?
};

export default function Header({ onClick, text, nav }: Props) {
  const [navState, setNavState] = React.useState(false);
  const [pageState, setPageState] = React.useState(text || page[0].label);

  const [buildState, setBuildState] = React.useState(false)
  const [wearablesState, setWearableState] = React.useState(false)

  const changePage = React.useCallback(() => {
    setNavState(!navState);
  }, [navState]);
  React.useEffect(() => {
    setPageState(text);
  }, [text]);

  const rander = React.useMemo(() => {
    return (
      <>
        <li
          className={cn(style.item, pageState === page[0].label ? style.action : null)}
          onClick={() => {
            onClick(page[0].label);
          }}
        >
          <Link href="/" prefetch>
            {page[0].label}
          </Link >
        </li>
        <li className={cn(style.item, pageState === page[1].label ? style.action : null)}
          onClick={() => {
            onClick(page[1].label);
            setBuildState(!buildState)
            setWearableState(false)
          }}>
          {page[1].label}
          {buildState ? <TwoNavigation options={build}></TwoNavigation> : null}
        </li>
        <li className={cn(style.item, pageState === page[2].label ? style.action : null)}
          onClick={() => {
            onClick(page[2].label);
            setWearableState(!wearablesState)
            setBuildState(false)
          }}
        >
          {page[2].label}
          {wearablesState ? <TwoNavigation options={wearable}></TwoNavigation> : null}
        </li>
        <li className={cn(style.item, pageState === page[3].label ? style.action : null)}
          onClick={() => {
            onClick(page[3].label);

          }}>
          <Link href='/learn?type=articles' prefetch>
            {page[3].label}
          </Link>

        </li>
        <li
          className={cn(style.item, pageState === page[4].label ? style.action : null)}
          onClick={() => {
            onClick(page[4].label, true);
          }}
        >
          {page[4].label}
        </li>
      </>
    );
    // page.map((item) => {
    //     return <li key={item.label} onClick={() => {
    //         onClick(item.label)
    //         if (item.label === "Contact Us") {
    //             setNavState(false)
    //         }
    //     }} className={cn(style.item, pageState === item.label ? style.action : null)}>{item.label}</li>
    // })
  }, [buildState, wearablesState]);

  React.useEffect(() => {
    setNavState(!nav)
  }, [nav])
  return (
    <div className={style.container}>
      <div className={style.header_left}>
        <Link href="/">
          <img src="/images/logo.png" />
        </Link>
        <div className={style.title}>METACAT</div>
      </div>
      <div className={style.pr} onClick={() => {
        onClick(null, false)
      }}>
        <img src="/images/caidan.png" className={style.header_right} onClick={changePage} />
        {navState && !nav ? <ul className={style.pageList}>{rander}</ul> : null}
      </div>
    </div>
  );
}
