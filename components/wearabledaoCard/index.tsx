import React from 'react';
import { v4 as uuid } from 'uuid';
import cn from 'classnames';
import { WebGLRenderer } from 'three';
import DaoWebglCard from '../dao-webgl-graphic';


import style from './index.module.less';

type Props = {
    mb?: string
    card?
    tabState?
}
export default function Card({ mb, card, tabState }: Props) {
    const [allScene, setAllScene] = React.useState([]);
    const renderer = React.useRef(null);
    const canvaRef = React.useRef(null);
    const animationRef = React.useRef(null);
    const offsetY = React.useRef(null);

    const updateSize = (offY?: number) => {
        if (!canvaRef.current) {
            return;
        }
        const offset = offY === null ? 800 : offY;
        // async canvas and container window
        // let r = document.getElementById('rander')
        if (window.scrollY > offset) {
            // console.log(Math.max(document.body.scrollHeight, document.body.offsetHeight))
            canvaRef.current.style.transform = `translateY(${window.scrollY - offset}px)`;
        } else {
            canvaRef.current.style.transform = `translateY(0px)`;
        }
        const width = canvaRef.current.clientWidth;
        const height = canvaRef.current.clientHeight;
        if (canvaRef.current.width !== width || canvaRef.current.height !== height) {
            renderer.current.setSize(width, height, false);
        }
    };

    const render = React.useCallback(
        (offY?: number) => {
            if (!allScene || allScene.length <= 0 || !renderer.current || !canvaRef.current) {
                return;
            }
            updateSize(offY);
            renderer.current.setClearColor(0xffffff, 0);
            renderer.current.setScissorTest(false);
            renderer.current.clear();
            const base = canvaRef.current.getBoundingClientRect();
            renderer.current.setClearColor(0xffffff, 0);
            renderer.current.setScissorTest(true);

            allScene.forEach((scene) => {
                // so something moves
                const { targetRotation, targetMesh } = scene.userData;
                if (targetRotation && targetMesh) {
                    targetMesh.rotation.y = Date.now() * 0.001;
                }

                // get the element that is a place holder for where we want to
                // draw the scene
                const { element } = scene.userData;

                // get its position relative to the page's viewport
                const rect = element.getBoundingClientRect();
                // check if it's offscreen. If so skip it
                if (
                    rect.bottom < 0 ||
                    rect.top - offY > renderer.current.domElement.clientHeight ||
                    rect.right < 0 ||
                    rect.left > renderer.current.domElement.clientWidth + renderer.current.domElement.left
                ) {
                    return; // it's off screen
                }

                // set the viewport
                const width = rect.right - rect.left;
                const height = rect.bottom - rect.top;
                const left = rect.left - base.left;
                const bottom = renderer.current.domElement.clientHeight - rect.bottom + base.top;

                renderer.current.setViewport(left, bottom, width, height);
                renderer.current.setScissor(left, bottom, width, height);

                const { camera } = scene.userData;

                // camera.aspect = width / height; // not changing in this example
                // camera.updateProjectionMatrix();

                // scene.userData.controls.update();

                renderer.current.render(scene, camera);
            });
        },
        [updateSize],
    );

    const animation = React.useCallback(() => {
        render(offsetY.current);
        animationRef.current = requestAnimationFrame(animation);
    }, [render]);

    const init = React.useCallback(() => {
        const re = new WebGLRenderer({ canvas: canvaRef.current, antialias: true });
        re.setClearColor(0xffffff, 0);
        re.setPixelRatio(window.devicePixelRatio);
        renderer.current = re;
        if (canvaRef.current) {
            const domParams = canvaRef.current.getBoundingClientRect();
            offsetY.current = domParams.top;
            if (window.screenY > 0) {
                offsetY.current = offsetY.current + window.screenY;
            }
            animation();
            return;
        }
        animation();
    }, [animation]);
    const renderGraphic = React.useMemo(() => {
        const scenes = [];
        if (!card) {
            return;
        }
        const modelEle = card.map((cd, idx) => {
            return (
                <DaoWebglCard
                    model={cd}
                    key={uuid()}
                    graphicId={`dao-${idx.toString()}`}
                    tabState={tabState}
                    initFinish={(se) => {
                        scenes.push(se);
                    }}
                ></DaoWebglCard>
            );
        });
        setAllScene(scenes);
        return modelEle;
    }, [card, tabState]);
    React.useEffect(() => {
        init();
        // return ()=>{
        //   if(renderer.current){
        //     renderer.current.dispose();
        //     renderer.current.forceContextLoss();
        //     renderer.current.context = null;
        //     renderer.current.domElement = null;
        //     renderer.current = null;
        //   }
        // }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [card]);


    const toOpensea = React.useCallback(() => {
        window.open(card.artwork.opensea_url);
    }, []);

    // const toDetail = React.useCallback(() => {
    //     router.replace(`/wearabledao/detail/${card.id}`)
    // }, [])
    return <div className={cn(style.container, mb)}>
        <canvas
            className={cn(
                style.graphicAll
            )}
            ref={canvaRef}
        ></canvas>
        <div className={style.rander} id="rander">{renderGraphic}</div>

        {/* <img src="/images/Nomal.png" onClick={toOpensea} /> */}
        {/* <div className={style.detail} onClick={toDetail}>
            <div className={style.title}>
                {card.artwork.name}
            </div>
            <div className={style.text}>Voxel Artist</div>
            <div className={style.name}>{card.artist.name}</div>

            <div className={style.toDetail} >
                Detail
                <img src="/images/you.png" />
            </div>
        </div> */}
    </div>
}