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

import 'leaflet/dist/leaflet.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

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

  const changeTwoNav = React.useCallback((label) => {
    setTwoNavState(label);
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

  const handlerHeader = React.useCallback((label) => {
    setHeaderText(label);
    if (label === 'Contact Us') {
      setContact(true);
    }
  }, []);
  const changeContactState = React.useCallback((state, wxstate) => {
    setContact(state);
    setWxState(wxstate);
  }, []);

  const zhezhao = React.useMemo(() => {
    return <Cantact onClick={changeContactState}></Cantact>;
  }, [contact]);

  const reqCvParcelList = React.useCallback(
    async (state = false, add = false) => {
      const result = await getCVParcelList(page, count, null, type);
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
    [page, count, type, typeTotal],
  );

  const reqCvEventList = React.useCallback(
    async (add = false) => {
      const result = await getCVEventList(page, count);
      if (result.code === 100000) {
        setData(result.data.event_list);
        // setTypeTotal(result.data.type_total)
      }
    },
    [page, count],
  );

  const reqDclParcelList = React.useCallback(
    async (state = false, add = false) => {
      const result = await getDCLParcelList(page, count, null, type);
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
    [page, count, type, typeTotal],
  );

  const reqDclEventList = React.useCallback(
    async (add = false) => {
      const result = await getDCLEventList(page, count);
      if (result.code === 100000) {
        setData(data.concat(result.data.event_list));
        setData(result.data.event_list);
        // setTypeTotal(result.data.type_total)
      }
    },
    [page, count],
  );

  const changeTab = React.useCallback(
    (t) => {
      setTabState(t);
      if (t === 'cryptovoxels' && twoNavState === 'Parcel') {
        reqCvParcelList(true);
      }
      if (t === 'decentraland' && twoNavState === 'Parcel') {
        reqDclParcelList(true);
      }
      setType('all');
    },
    [reqDclParcelList, reqCvParcelList],
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

  const scrollLoading = React.useCallback(() => {
    if (tabState === 'cryptovoxels' && twoNavState === 'Parcel') {
      reqCvParcelList(false, true);
    }
    if (tabState === 'cryptovoxels' && twoNavState === 'Events') {
      reqCvEventList(true);
    }
    if (tabState === 'decentraland' && twoNavState === 'Parcel') {
      reqDclParcelList(false, true);
    }
    if (tabState === 'decentraland' && twoNavState === 'Events') {
      reqDclEventList(true);
    }
  }, [tabState, twoNavState]);

  const rander = React.useMemo(() => {
    if (twoNavState === 'Parcel' && data) {
      return (
        <div>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={scrollLoading}
            loader={<Footer />}
          >
            {data.map((item) => {
              return <Card mt={style.margintop} {...item} key={uuid()} />;
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
            loader={<Footer />}
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
  }, [twoNavState, reqCvParcelList, reqDclParcelList, reqCvEventList, reqDclEventList]);

  // React.useEffect(() => {

  //   window.addEventListener("scroll", function () {
  //     //真实内容的高度
  //     let pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
  //     //视窗的高度
  //     let viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  //     //隐藏的高度
  //     let scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //     //判断加载
  //     console.log(pageHeight, viewportHeight, scrollHeight)
  //     if (pageHeight - viewportHeight - scrollHeight <= 0) {
  //       // setFooterState(true)
  //       // if (tabState === "cryptovoxels" && twoNavState === "Parcel") {
  //       //   reqCvParcelList()
  //       // }
  //       // if (tabState === "cryptovoxels" && twoNavState === "Events") {
  //       //   reqCvEventList()
  //       // }
  //       // if (tabState === "decentraland" && twoNavState === "Parcel") {
  //       //   reqDclParcelList()
  //       // }
  //       // if (tabState === "decentraland" && twoNavState === "Events") {
  //       //   reqDclEventList()
  //       // }
  //       console.log(1)
  //       setFooterState(false)
  //     }
  //   })
  // }, [tabState, twoNavState, page])

  /**
   * 
   * function scrollFunc(){
     $("#container").scroll(function(){
        var $this =$(this),
        viewH =$(this).height(),//可见高度
        contentH =$(this).get(0).scrollHeight,//内容高度
        scrollTop =$(this).scrollTop();//滚动高度
        if(contentH = viewH + scrollTop) { //当滚动到底部时，
  
        }
        if(contentH - viewH - scrollTop <= 100) { //当滚动到距离底部100px时,
  
        }
        if(scrollTop/(contentH -viewH) >= 0.95){ //当滚动到距离底部5%时
        // 这里加载数据..
        }
     });
  }
   */
  return (
    <div>
      <Header onClick={handlerHeader} text={headerText}></Header>

      <img src="/images/homeBanner.png" className={cn(style.banner, style.mt)} />

      <div id="switch" className={cn(style.nav, fixedState ? style.fix : null)}>
        <div className={cn(style.navContainer)}>
          {TAB.map((item) => {
            return (
              <Tab
                key={item.label}
                action={tabState === item.type}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  changeTab(item.type);
                }}
              />
            );
          })}
          <div className={style.border}></div>
        </div>

        <div className={cn(style.twoNavContainer)}>
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
          <div className={cn(style.classify, classsifyState ? null : style.ov)}>
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
              src={classsifyState ? '/images/Frame-down.png' : '/images/Frame-up.png'}
              onClick={changeClassifyState}
            />
          </div>
        ) : null}
      </div>

      <div id="cardContainer" className={cn(style.cardContainer)}>
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
