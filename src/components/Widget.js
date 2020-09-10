import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from '../styles/Widget.module.scss';

function Widget({ title, className, children }) {
  return (
    <section className={cx(s.widget, className)}>
      {title &&
        (typeof title === 'string' ? (
          <h5 className={s.title}>{title}</h5>
        ) : (
          <header className={s.title}>{title}</header>
        ))}
      <div>{children}</div>
    </section>
  );
}

export default Widget;

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Widget.defaultProps = {
  title: null,
  className: null,
  children: [],
};
