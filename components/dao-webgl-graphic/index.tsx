import React from 'react';

import cn from 'classnames';
import { Scene, PerspectiveCamera, HemisphereLight, DirectionalLight, BoxHelper } from 'three';
import { useRouter } from 'next/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader.js';

import styles from './index.module.css';

type DaoArtist = {
  name?: string;
  contact?: Contact;
};

type Contact = {
  twitter?: string;
  weibo?: string;
  homepage?: string;
};

type Artwork = {
  name?: string;
  desc?: string;
  vox_url?: string;
  opensea_url?: string;
};

type DaoCard = {
  artwork?: Artwork;
  artist?: DaoArtist;
  id?: string;
  type?
};

interface Props {
  graphicId?: string;
  initFinish?: (se) => void;
  model?: DaoCard;
  tabState?
  id?
  name?
}



export default function DaoWebglCard({ graphicId, initFinish, model, tabState, id, name, }: Props) {
  const router = useRouter();
  const sceneRef = React.useRef(null);

  const init = React.useCallback(() => {
    const scene = new Scene();

    const containerId = `webgl${graphicId}`;
    const sceneElement = document.getElementById(containerId);
    // the element that represents the area we want to render the scene
    scene.userData.element = sceneElement;

    const camera = new PerspectiveCamera(50, 1, 1, 10);
    camera.position.z = 2;
    scene.userData.camera = camera;

    const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.enablePan = true;
    controls.enableZoom = false;
    scene.userData.controls = controls;

    scene.add(new HemisphereLight(0xaaaaaa, 0x444444));

    const light = new DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);
    sceneRef.current = scene;
    if (!model.artwork.vox_url) {
      if (initFinish) {
        initFinish(scene);
      }
      return;
    }

    // add one random mesh to each scene
    const loader = new VOXLoader();
    loader.load(model.artwork.vox_url, function (chunks) {
      for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        // displayPalette( chunk.palette );
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
        mesh.scale.setScalar(1 / maxDiameter); // 0.015
        scene.userData.targetMesh = mesh;
        scene.userData.targetRotation = false;
        scene.add(mesh);
      }
    });

    if (initFinish) {
      initFinish(scene);
    }
  }, [initFinish]);

  React.useEffect(() => {
    if (!model.artwork) {
      return;
    }
    init();
  }, [model, init]);

  const triggerModelRotation = React.useCallback((roatation) => {
    if (sceneRef.current) {
      sceneRef.current.userData.targetRotation = roatation;
    }
  }, []);
  const toDetail = React.useCallback(() => {
    if (tabState === "chinesered" || tabState === "pfp") {
      router.replace(`/wearables/detail/${model.id}?type=${tabState}`)
    } else {
      router.replace(`/wearables/detail/${model.id}?type=${id}&name=${name}&form=${model.type}`,)
    }
  }, [tabState, id, name])


  const toOpensea = React.useCallback(() => {
    window.open(model.artwork.opensea_url);
  }, []);
  return (
    <div
      className={cn('z-10 p-4', styles.card)}
      onMouseEnter={() => {
        triggerModelRotation(true);
      }}
      onMouseLeave={() => {
        triggerModelRotation(false);
      }}
    >
      <div className={styles.rtv}>
        <div id={`webgl${graphicId}`} className={styles.graphic}></div>
        {model.artwork?.opensea_url ? (
          <img src="/images/Nomal.png" onClick={toOpensea} className={styles.toopensea} />
        ) : null}
      </div>
      <div className={styles.detail} onClick={toDetail}>
        <div className={styles.title}>
          {model.artwork.name}
        </div>
        <div className={styles.text}>Voxel Artist</div>
        <div className={styles.name}>{model.artist.name}</div>

        <div className={styles.toDetail} >
          Detail
          <img src="/images/you.png" className={styles.img} />
        </div>
      </div>
    </div>
  );
}
