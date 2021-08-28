import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';

// Admin
const DashboardPage = lazy(() => import('./pages/Admin/Dashboard'));
const MovieList = lazy(() => import('./pages/Admin/MovieList'));
const CinemaList = lazy(() => import('./pages/Admin/CinemaList'));
const ShowtimeList = lazy(() => import('./pages/Admin/ShowtimeList'));
const ReservationList = lazy(() => import('./pages/Admin/ReservationList'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MoviePage = lazy(() => import('./pages/Public/MoviePage'));
const MyDashboard = lazy(() => import('./pages/Public/MyDashboard'));
const MovieCategoryPage = lazy(() =>
  import('./pages/Public/MovieCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage'));

const Checkin = lazy(() => import('./pages/Public/Checkin'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route component={Login} exact path="/login" />
          <Route component={Register} exact path="/register" />

          <WithLayoutRoute
            component={Checkin}
            exact
            layout={PublicLayout}
            path="/checkin/:reservationId"
          />

          <WithLayoutRoute
            component={HomePage}
            exact
            layout={PublicLayout}
            path="/"
          />
          <WithLayoutRoute
            component={MyDashboard}
            exact
            layout={PublicLayout}
            path="/mydashboard"
          />
          <WithLayoutRoute
            component={CinemasPage}
            exact
            layout={PublicLayout}
            path="/cinemas"
          />
          <WithLayoutRoute
            component={MovieCategoryPage}
            exact
            layout={PublicLayout}
            path="/movie/category/:category"
          />
          <WithLayoutRoute
            component={MoviePage}
            exact
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            path="/movie/:id"
          />
          <WithLayoutRoute
            component={BookingPage}
            exact
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            path="/movie/booking/:id"
          />
          <ProtectedRoute
            component={DashboardPage}
            exact
            layout={AdminLayout}
            path="/admin/dashboard"
          />
          <ProtectedRoute
            component={User}
            exact
            layout={AdminLayout}
            path="/admin/users"
          />
          <ProtectedRoute
            component={ShowtimeList}
            exact
            layout={AdminLayout}
            path="/admin/showtimes"
          />
          <ProtectedRoute
            component={ReservationList}
            exact
            layout={AdminLayout}
            path="/admin/reservations"
          />
          <ProtectedRoute
            component={CinemaList}
            exact
            layout={AdminLayout}
            path="/admin/cinemas"
          />
          <ProtectedRoute
            component={MovieList}
            exact
            layout={AdminLayout}
            path="/admin/movies"
          />
          <ProtectedRoute
            component={Account}
            exact
            layout={AdminLayout}
            path="/admin/account"
          />
          <Route component={() => '404 NOT FOUND'} path="*" />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
