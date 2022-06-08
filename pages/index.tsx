import React from 'react';

import cn from 'classnames';
import { v4 as uuid } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getCVEventList, getCVParcelList, getDCLEventList, getDCLParcelList } from '../service';

import Header from '../components/header';
import Tab from '../components/tab';
import Search from '../components/search';
import Card from '../components/card';
import ToTop from '../components/jump-to-top';
import style from './index.module.less';
import Cantact from '../components/cantact';
import Event from '../components/event';
import Footer from '../components/footer';



const TAB = [
  {
    label: 'Cryptovoxels',
    icon: '/images/Crypto Voxel.jpg',
    type: 'cryptovoxels',
  },
  {
    label: 'Decentraland',
    icon: '/images/Decentraland.jpg',
    type: 'decentraland',
  },
];

const TwoTAB = [
  {
    label: 'Parcel',
  },
  {
    label: 'Events',
  },
];

function MyApp() {
  const [tabState, setTabState] = React.useState(TAB[0].type);
  const [twoNavState, setTwoNavState] = React.useState(TwoTAB[0].label);
  const [classsifyState, setClassifyState] = React.useState(false);
  const [headerText, setHeaderText] = React.useState('');
  const [fixedState, setFixedState] = React.useState(false);
  const [contact, setContact] = React.useState(false);
  const [wxState, setWxState] = React.useState(false);

  const [searchText, setSearchText] = React.useState('');

  const [data, setData] = React.useState([]);
  const [typeTotal, setTypeTotal] = React.useState([]);

  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(50);
  const [type, setType] = React.useState('all');

  const [footerState, setFooterState] = React.useState(false);

  const [nav, setNav] = React.useState(null);

  const changeTwoNav = React.useCallback((label) => {
    setTwoNavState(label);
    setPage(1)
  }, []);
  const changeClassifyState = React.useCallback(() => {
    setClassifyState(!classsifyState);
  }, [classsifyState]);

  // const pullingUpHandler = React.useCallback(() => {
  //   setLoding(true)
  //   console.log(1)
  //   bscroll.finishPullUp()
  //   bscroll.refresh()
  //   setLoding(false)
  // }, [bscroll])
  // const scroll = React.useCallback(() => {
  //   const wrapper = document.getElementById("wrapper")
  //   const bs = new BScroll(wrapper, {
  //     pullUpLoad: true,
  //   })
  //   setBscroll(bs)
  //   bs.on('pullingUp', pullingUpHandler)
  // }, [pullingUpHandler])

  // React.useEffect(() => {
  //   const wrapper = document.getElementById("wrapper")
  //   const bs = new BetterScroll(wrapper, {
  //     pullUpLoad: true,
  //     scrollY: true,
  //   })
  // scroll()
  // }, [scroll])

  const handlerHeader = React.useCallback((label, t = false) => {
    setHeaderText(label);
    if (label === 'Contact Us') {
      setContact(true);
    }
    setNav(t)
  }, []);
  const changeContactState = React.useCallback((state, wxstate) => {
    setContact(state);
    setWxState(wxstate);
  }, []);

  const zhezhao = React.useMemo(() => {
    return <Cantact onClick={changeContactState}></Cantact>;
  }, [contact]);

  const reqCvParcelList = React.useCallback(
    async (state = false) => {
      const result = await getCVParcelList(1, 50, null, state ? "all" : type);
      if (result.code === 100000) {
        setData(result.data.parcel_list);
        if (typeTotal.length === 0 || state) {
          const typeArray = Object.keys(result.data.type_total).map((key) => {
            const value = result.data.type_total[key];
            return { name: key, value };
          });
          setTypeTotal(typeArray);
        }
      }
    },
    [typeTotal, type],
  );

  const reqCvEventList = React.useCallback(
    async () => {
      const result = await getCVEventList(1, 50);
      if (result.code === 100000) {
        setData(result.data.event_list);
        // setTypeTotal(result.data.type_total)
      }
    },
    [],
  );

  const reqDclParcelList = React.useCallback(
    async (state = false,) => {
      const result = await getDCLParcelList(1, 50, null, state ? "all" : type);
      if (result.code === 100000) {
        setData(result.data.parcel_list);
        if (typeTotal.length === 0 || state) {
          const typeArray = Object.keys(result.data.type_total).map((key) => {
            const value = result.data.type_total[key];
            return { name: key, value };
          });
          setTypeTotal(typeArray);
        }
      }
    },
    [typeTotal, type],
  );

  const reqDclEventList = React.useCallback(
    async () => {
      const result = await getDCLEventList(1, 50);
      if (result.code === 100000) {
        setData(data.concat(result.data.event_list));
        setData(result.data.event_list);
        // setTypeTotal(result.data.type_total)
      }
    },
    [],
  );

  const changeTab = React.useCallback(
    (t) => {
      setType('all');
      setTabState(t);
      setPage(1)
      if (t === 'cryptovoxels' && twoNavState === 'Parcel') {
        reqCvParcelList(true);
      }
      if (t === 'decentraland' && twoNavState === 'Parcel') {
        reqDclParcelList(true);
      }
      if (t === "cryptovoxels" && twoNavState === 'Events') {
        reqCvEventList()
      }
      if (t === "decentraland" && twoNavState === 'Events') {
        reqDclEventList()
      }
    },
    [twoNavState],
  );

  React.useEffect(() => {
    const listener = () => {
      if (document.getElementById('switch') && window.scrollY > 204) {
        setFixedState(true);
      } else {
        setFixedState(false);
      }
    };
    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [fixedState]);

  const scrollLoading = React.useCallback(
    async () => {
      if (tabState === 'cryptovoxels' && twoNavState === 'Parcel') {
        setTimeout(async () => {
          const p = page + 1
          const result = await getCVParcelList(p, count, null, type)
          setPage(p)
          if (result.data.parcel_list.length !== 0) {
            setData([...data, ...result.data.parcel_list])
          }
        }, 1000)
      }
      if (tabState === 'cryptovoxels' && twoNavState === 'Events') {
        setTimeout(async () => {
          const p = page + 1
          const result = await getCVEventList(p, count)
          setPage(p)
          if (result.data.event_list.length !== 0) {
            setData([...data, ...result.data.event_list])
          }
        }, 1000)
      }
      if (tabState === 'decentraland' && twoNavState === 'Parcel') {
        setTimeout(async () => {
          const p = page + 1
          const result = await getDCLParcelList(p, count, null, type)
          setPage(p)
          if (result.data.parcel_list.length !== 0) {
            setData([...data, ...result.data.parcel_list])
          }
        }, 1000)
      }
      if (tabState === 'decentraland' && twoNavState === 'Events') {
        setTimeout(async () => {
          const p = page + 1
          const result = await getDCLEventList(p, count)
          setPage(p)
          if (result.data.event_list.length !== 0) {
            setData([...data, ...result.data.event_list])
          }
        }, 1000)
      }
    }, [twoNavState, page, count, type, data]);

  const rander = React.useMemo(() => {
    if (twoNavState === 'Parcel' && data) {
      return (
        <div>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={scrollLoading}
            loader={<Footer length={data.length} />}
          >
            {data.map((item) => {
              return <Card mt={style.margintop} {...item} key={uuid()} Home={true} />;
            })}
          </InfiniteScroll>
        </div>
      );
    }
    if (twoNavState === 'Events' && data) {
      return (
        <div>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={scrollLoading}
            loader={<Footer length={data.length} />}
          >
            {data.map((item) => {
              return <Event mt={style.margintop} {...item} key={uuid()} />;
            })}
          </InfiniteScroll>
        </div>
      );
    }
  }, [data, scrollLoading]);

  const onSearchHandler = React.useCallback(
    (value) => {
      if (value) {
        const d = data.filter((item) => {
          if (item.description || item.name) {
            return (
              item.description?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
              item.name?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            );
          }
          return null;
        });
        setData(d);
      } else {
        if (tabState === 'cryptovoxels') {
          reqCvParcelList();
        }
        if (tabState === 'decentraland') {
          reqDclParcelList();
        }
      }
      setSearchText(value);
    },
    [data, reqCvParcelList, reqDclParcelList],
  );

  const changeClassify = React.useCallback((value) => {
    setType(value);
  }, []);

  React.useEffect(() => {
    if (tabState === 'cryptovoxels' && twoNavState === 'Parcel') {
      reqCvParcelList();
    }
    if (tabState === 'cryptovoxels' && twoNavState === 'Events') {
      reqCvEventList();
    }
    if (tabState === 'decentraland' && twoNavState === 'Parcel') {
      reqDclParcelList();
    }
    if (tabState === 'decentraland' && twoNavState === 'Events') {
      reqDclEventList();
    }
  }, [twoNavState]);


  React.useEffect(() => {
    setNav(true)
    window.addEventListener("scroll", function () {
      setNav(true)
    })
  }, [])

  return (
    <div className={style.container} >
      <Header onClick={handlerHeader} text={headerText} nav={nav}></Header>

      <img src="/images/homeBanner.png" className={cn(style.banner, style.mt)} onClick={() => { setNav(true) }}/>

      <div id="switch" className={cn(style.nav, fixedState ? style.fix : null)} onClick={() => { setNav(true) }}>
        <div className={cn(style.navContainer)}>
          <div className={style.bg}></div>
          {TAB.map((item, idx) => {
            return (
              <div className={cn(style.item, tabState === item.type ? style.action : null)} key={idx} onClick={() => {
                changeTab(item.type)
              }}>
                <img src={`${item.icon}`} />
                {item.label}
              </div>
            );
          })}

        </div>

        <div className={cn(style.twoNavContainer)} onClick={() => { setNav(true) }}>
          <div className={style.parent}>
            {TwoTAB.map((item) => {
              return (
                <div
                  key={item.label}
                  className={cn(style.twoNav, twoNavState === item.label ? style.action : null)}
                  onClick={() => {
                    changeTwoNav(item.label);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          {twoNavState !== 'Events' ? <Search onSearch={onSearchHandler}></Search> : null}
        </div>

        {twoNavState !== 'Events' ? (
          <div className={cn(style.classify, classsifyState ? null : style.ov)} onClick={() => { setNav(true) }}>
            {typeTotal.map((item) => {
              return (
                <div
                  key={uuid()}
                  className={cn(style.item, type === item.name ? style.action : null)}
                  onClick={() => {
                    changeClassify(item.name);
                  }}
                >
                  <div>{item.name}</div>
                  <span>{item.value}</span>
                </div>
              );
            })}
            <img
              src={classsifyState ? '/images/Frame-up.png' : '/images/Frame-down.png'}
              onClick={changeClassifyState}
            />
          </div>
        ) : null}
      </div>

      <div id="cardContainer" className={cn(style.cardContainer)} onClick={() => { setNav(true) }}>
        {rander}
        {/* {footerState ?  : null} */}
      </div>

      {contact ? zhezhao : null}

      {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}

      <ToTop></ToTop>
    </div>
  );
}

export default MyApp;
