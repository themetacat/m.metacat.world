import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import style from './index.module.css';

const page = [
  {
    label: 'Home',
  },
  {
    label: 'Builders',
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

type Props = {
  onClick?;
  text: string;
  nav?
};

export default function Header({ onClick, text, nav }: Props) {
  const [navState, setNavState] = React.useState(false);
  const [pageState, setPageState] = React.useState(text || page[0].label);

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
          <Link href="/" >
            {page[0].label}
          </Link >
        </li>
        <li className={cn(style.item, pageState === page[1].label ? style.action : null)}
          onClick={() => {
            onClick(page[1].label);
          }}>
          <Link href='/builders'>
            {page[1].label}
          </Link>
        </li>
        <li className={cn(style.item, pageState === page[2].label ? style.action : null)}
          onClick={() => {
            onClick(page[2].label);

          }}>
          <Link href='/wearables?type=wearabledao'>
            {page[2].label}
          </Link>
        </li>
        <li className={cn(style.item, pageState === page[3].label ? style.action : null)}
          onClick={() => {
            onClick(page[3].label);

          }}>
          <Link href='/learn?type=articles'>
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
  }, []);

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
