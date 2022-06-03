import React from 'react';
import Router from 'next/router';

export default function () {
    React.useEffect(() => {
        Router.push('/build/builders');
    }, [null]);
    return <div></div>;
}
