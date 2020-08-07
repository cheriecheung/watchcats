import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import cat_stretch from '../../assets/images/cat_stretch.png';
import longhair from '../../assets/images/longhair.png';

function Home() {
  const { t, i18n } = useTranslation();
  const leftCatSize = '20vw';
  const leftCatPosition = '65vw';
  const rightCatSize = '16vw';
  const rightCatPosition = '16vw';

  const stretchCatRef = useRef(null);
  const rightCatRef = useRef(null);

  const followMouse = (e) => {
    const x = e.clientX / 15;
    const y = e.clientY / 20;

    rightCatRef.current.style.transform = `rotate(-40deg) translateY(${y}px)`;
    if (x > 25 && x < 52) {
      stretchCatRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', followMouse);

    return () => {
      window.removeEventListener('mousemove', followMouse);
    };
  }, []);

  return (
    <>
      <h3>{t('home.i_am')}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 100,
        }}
      >
        <img
          src={cat_stretch}
          style={{
            zIndex: 5,
            position: 'absolute',
            bottom: '20vw',
            left: '10vw',
            width: '15vw',
          }}
          ref={stretchCatRef}
        />
        <Link
          to="/find"
          style={{
            border: '2px solid #a0dfcf',
            width: '25vw',
            height: '13vw',
            marginRight: 20,
            padding: 30,
            display: 'flex',
          }}
        >
          <h5 style={{ alignSelf: 'center' }}>
            {t('home.owner_finds_sitter')}
          </h5>
        </Link>

        {/* <img
          src={silhoutte_2}
          style={{
            zIndex: 5,
            position: 'absolute',
            bottom: rightCatPosition - 10,
            right: rightCatPosition,
            width: rightCatSize,
            height: rightCatSize,
          }}
          ref={rightCatRef}
        /> */}
        <img
          src={longhair}
          style={{
            zIndex: 5,
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: leftCatSize,
            opacity: 0.7,
          }}
        />
        <Link
          to="/find"
          style={{
            border: '2px solid #a0dfcf',
            width: '25vw',
            height: '13vw',
            padding: 30,
            display: 'flex',
          }}
        >
          <h5 style={{ alignSelf: 'center' }}>
            {t('home.sitter_finds_owner')}
          </h5>
        </Link>
      </div>
    </>
  );
}

export default Home;
