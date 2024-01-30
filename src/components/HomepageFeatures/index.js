import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const ImageList = [
  { imgSrc: 'memes/dvorsky_be_like.jpg', title: 'Dvorský be like' },
  { imgSrc: 'memes/edison_scared.png', title: '' },
  { imgSrc: 'memes/vondrakova_beloved.gif', title: '' },
];

export default function HomepageFeatures() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % (ImageList.length - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.features}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${currentSlide * (100 / 3)}%)`,
            transition: 'transform 1s',
          }}
        >
          {ImageList.map((image, idx) => (
            <div key={idx} className={clsx(styles.slide, { [styles.active]: idx === currentSlide })}>
              <div className="text--center">
                <img className={styles.featureSvg} src={image.imgSrc} alt={image.title} />
              </div>
              <div className="text--center padding-horiz--md">
                <h3>{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
