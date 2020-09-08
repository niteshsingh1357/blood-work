import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
// import { Route } from 'react-router';

// import Icon from '../../Icon/Icon';

import s from './LinksGroup.module.scss';

function LinksGroup(props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isOpen: false,
  //   };
  // }

  // render() {
  const { className, childrenLinks, headerLink, header } = props;
  console.log(props);
  // const { isOpen } = this.state;
  
  if (!childrenLinks) {
    return (
      <li className={cx(s.headerLink, className)}>
        <NavLink to={headerLink} activeClassName={s.headerLinkActive} exact>
          <div>
            {/* {glyph && <Icon glyph={glyph} />} */}
            <span className={s.header}>{header}</span>
          </div>
        </NavLink>
      </li>
    );
  }
  /* eslint-disable */
  return (
    <Route
      path={headerLink}
      children={({ match }) => {
        return (
          <li className={cx(s.headerLink, className)}>
            <a
              className={cx({
                [s.headerLinkActive]:
                  !!match && match.url.indexOf(headerLink) !== -1,
              })}
              onClick={() => this.setState({ isOpen: !isOpen })}
            >
              <div>
                {glyph && <Icon glyph={glyph} />}
                <span>{header}</span>
              </div>
              <b
                className={cx('fa fa-angle-left arrow', s.arrow, {
                  [s.arrowActive]: isOpen,
                })}
              />
            </a>
            {/* eslint-enable */}
            <Collapse className={s.panel} isOpen={true}>
              <ul>
                {childrenLinks &&
                  childrenLinks.map((child) => (
                    <li key={child.name}>
                      <NavLink
                        to={child.link}
                        exact
                        onClick={() =>
                          this.setState({
                            isOpen: true,
                          })
                        }
                        activeClassName={s.headerLinkActive}
                      >
                        {child.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </Collapse>
          </li>
        );
      }}
    />
  );
  // }
}

export default LinksGroup;

/* eslint-disable */
LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  headerLink: PropTypes.string,
  childrenLinks: PropTypes.array,
  // glyph: PropTypes.string,
  className: PropTypes.string,
};
/* eslint-enable */

LinksGroup.defaultProps = {
  headerLink: null,
  childrenLinks: null,
  className: '',
  // glyph: null,
};
