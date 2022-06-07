import React from 'react';
import {
    Scene,
    PerspectiveCamera,
    HemisphereLight,
    DirectionalLight,
    BoxHelper,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader.js';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Header from '../../../components/header';
import Cantact from '../../../components/cantact';
import ToTop from '../../../components/jump-to-top';

import style from './index.module.css';

import api from '../../../lib/api';
import z_api from '../../../lib/z_api';
import { route } from 'next/dist/server/router';

export default function Detail({ artwork, artist, id }) {
    const router = useRouter()
    const [contact, setContact] = React.useState(false);
    const [wxState, setWxState] = React.useState(false);
    const [tabState, setTabState] = React.useState("WearableDao")
    const [text, setText] = React.useState("")


    const sceneRef = React.useRef(null);
    const renderer = React.useRef(null);
    const animationRef = React.useRef(null);
    const [intro, setIntro] = React.useState(true);


    const [nav, setNav] = React.useState(null);

    const removeIntro = React.useCallback(() => {
        setIntro(false);
    }, [null]);

    const render = React.useCallback(() => {
        if (!renderer.current || !sceneRef.current) {
            return;
        }
        const { targetMesh } = sceneRef.current.userData;
        if (targetMesh) {
            targetMesh.rotation.y = Date.now() * 0.001;
        }
        const { camera } = sceneRef.current.userData;
        renderer.current.render(sceneRef.current, camera);
    }, [null]);

    const animation = React.useCallback(() => {
        render();
        animationRef.current = requestAnimationFrame(animation);
    }, [render]);


    React.useEffect(() => {
        if (!artwork.vox_url) {
            return;
        }
        if (!renderer.current) {
            const re = new WebGLRenderer({ antialias: true });
            re.setClearColor(0xffffff, 0);
            re.setPixelRatio(window.devicePixelRatio);
            renderer.current = re;
            const scene = new Scene();
            const sceneElement = document.getElementById(`webgl${id}`);

            const camera = new PerspectiveCamera(50, 1, 1, 10);
            camera.position.z = 2;
            scene.userData.camera = camera;

            const controls = new OrbitControls(scene.userData.camera, re.domElement);
            controls.minDistance = 1.5;
            controls.maxDistance = 4;
            controls.enablePan = false;
            controls.enableZoom = true;
            scene.userData.controls = controls;

            scene.add(new HemisphereLight(0xaaaaaa, 0x444444));

            const light = new DirectionalLight(0xffffff, 0.5);
            light.position.set(1, 1, 1);
            scene.add(light);
            sceneRef.current = scene;

            // add one random mesh to each scene
            const loader = new VOXLoader();
            loader.load(artwork.vox_url, function (chunks) {
                for (let i = 0; i < chunks.length; i += 1) {
                    const chunk = chunks[i];
                    const mesh = new VOXMesh(chunk);
                    mesh.name = 'targetMesh';
                    const boxHelper = new BoxHelper(mesh);
                    boxHelper.geometry.computeBoundingBox();
                    const box = boxHelper.geometry.boundingBox;
                    const maxDiameter = Math.max(
                        box.max.x - box.min.x,
                        box.max.y - box.min.y,
                        box.max.z - box.min.z,
                    );
                    mesh.scale.setScalar((1 / maxDiameter) * 1.1); // 0.015
                    scene.userData.targetMesh = mesh;
                    //
                    scene.add(mesh);
                }
            });
            re.setSize(sceneElement.clientWidth, sceneElement.clientHeight, true);
            sceneElement.appendChild(re.domElement);
        }
        animation();

        return () => {
            if (renderer.current) {
                // renderer.current.dispose();
                // renderer.current.forceContextLoss();
                // renderer.current.context = null;
                // renderer.current.domElement = null;
                // renderer.current = null;
            }

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animation, artwork]);



    const handlerHeader = React.useCallback((label, t) => {
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

    const toWearableDao = React.useCallback(() => {
        if (router.query.type) {
            router.replace(`/topic/${router.query.type}?type=wearables`)
        } else {
            router.replace(`/wearables/wearabledao`)
        }

    }, [router.query.type])

    const toOpensea = React.useCallback(() => {
        window.open(artwork.opensea_url);
    }, []);


    React.useEffect(() => {
        setNav(true)
        window.addEventListener("scroll", function () {
            setNav(true)
        })
    }, [])


    return <div className={style.con}>
        <Header onClick={handlerHeader} text={"Wearables"} nav={nav} />
        <div className={style.nav}>
            <div onClick={toWearableDao}>{"WearableDao"}</div>
            <img src="/images/you.png" />
            <div className={style.name}>{artwork.name}</div>
        </div>
        <div className={style.container}>
            <div className={style.card}>
                <div
                    id={`webgl${id}`}
                    onMouseDown={removeIntro}
                    className={cn('w-full h-full z-10', style.canvas)}
                ></div>
                <img src="/images/Nomal.png" onClick={toOpensea} />
            </div>
        </div>
        <div className={style.detail}>
            <div className={style.title}>{artwork.name}</div>
            <div className={style.desc}>{artwork.desc}</div>

            <div className={style.voxel}>
                <div className={style.t1}>Voxel Artist:</div>
                <div className={style.t2}>{artist.name}</div>
                <div className={style.t3} onClick={() => {
                    window.open(artist.contact.homepage)
                }}>To check the other artists
                    <img src="/images/you.png" />
                </div>
            </div>
            <div className={style.contact}>
                Contact:
                <div>
                    <img src="/images/tt.png" onClick={() => {
                        window.open(artist.contact.twitter)
                    }} />
                    <img src="/images/wb.png" onClick={() => {
                        window.open(artist.contact.weibo)
                    }} />
                </div>
            </div>
        </div>
        {contact ? zhezhao : null}
        {wxState ? <img src="/images/code.jpg" className={cn('w-20 h-20', style.wx)} /> : null}
        <ToTop></ToTop>
    </div>
}

export async function getServerSideProps(context) {
    let res = null
    const { id } = context.params;
    if (context.query.type === "pfp") {
        res = await z_api.req_pfp_detail(id)
    } else {
        res = await api.getDaoWearableDetail(id);
    }
    const { artwork, artist } = res.data[0];
    return {
        props: {
            artwork,
            artist,
            id,
        }, // will be passed to the page component as props
    };
}
