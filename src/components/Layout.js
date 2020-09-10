import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import BloodRequest from '../pages/BloodRequest';
import Footer from './Footer';
import s from '../styles/Layout.module.scss';
import cx from 'classnames';
import Profile from '../pages/Profile';

export default function Layout({signOut}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={s.root}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className={cx(s.wrap, { [s.sidebarOpen]: sidebarOpen })}>
        <Navbar sidebarToggle={() => setSidebarOpen(!sidebarOpen)} signOut={signOut} />
        <main className={s.content}>
          <Switch>
            <Route path='/app/dashboard' exact component={Dashboard} />
            <Route path='/app/donors' exact component={BloodRequest} />
            <Route path='/app/requests' exact component={BloodRequest} />
            <Route path='/app/profile' exact component={Profile} />
            <Route path='/app/users' exact component={Profile} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}
