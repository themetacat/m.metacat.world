import React from 'react';

import { useRouter } from "next/router"

import 'leaflet/dist/leaflet.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';





function MyApp({ Component, pageProps }) {
  const router = useRouter()
  React.useEffect(() => {

    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // 移动端
      // document.location.href = 'https://m-metacat-world-metacat.vercel.app/';
    } else {
      // PC端
      document.location.href = `https://www.metacat.world/${router.asPath}`;
    }

  }, [])
  return <Component {...pageProps} />
}

export default MyApp