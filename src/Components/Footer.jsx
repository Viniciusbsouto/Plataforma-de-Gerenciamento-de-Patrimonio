import React from 'react';
import styles from './Footer.module.css';
import Finance from '../Assets/finance.svg?react';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Finance />
      <p>Finance Track. Alguns direitos reservados.</p>
    </div>
  );
};

export default Footer;
