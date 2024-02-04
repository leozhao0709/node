import React from 'react';
import styles from './App.module.scss';
import img1 from './assets/images/smallImage.png?w=200&h=200&format=webp&imagetools';
import svg1 from './assets/svg/svg1.svg';
import Button from './components/Button';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <h1>mycli generated react project</h1>
      <img src={img1} alt="img1" />
      <img src={svg1} alt="svg1" />
      <Button>
        <span>button</span>
      </Button>
    </div>
  );
};

export default App;
