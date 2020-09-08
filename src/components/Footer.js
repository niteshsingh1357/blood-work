import React from 'react';
import cx from 'classnames';
import s from '../styles/Footer.module.scss';
export default function Footer({ className }) {
  return (
    <footer className={cx(s.root, className)}>
      <div className={s.container}></div>
      <span> © 2020 &nbsp;Blood Work</span>
    </footer>
  );
}
