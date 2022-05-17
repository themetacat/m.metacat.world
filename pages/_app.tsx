import React from 'react';

import 'leaflet/dist/leaflet.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';


const regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;



function MyApp({ Component, pageProps }) {

  React.useEffect(() => {

    var u = navigator.userAgent;

    var result = regex_match.exec(u);

    if (result) {
      document.location.href = "https://www.metacat.world/"
    }

  }, [regex_match])
  return <Component {...pageProps} />
}

export default MyApp