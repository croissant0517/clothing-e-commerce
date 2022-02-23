import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Spinner } from './components/with-spinner/with-spinner';
import ScrollToTop from './scrolltotop';
import { selectCurrentUser, selectCheckUserSessionOnLoading } from './redux/user/user.selectors';
import { checkUserSessionStart } from './redux/user/user.action'

import ErrorBoundary from './components/errorboundary/errorboundary';
import Notification from './components/notification/notification';

const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up"));
const CheckOutPage = lazy(() => import("./pages/checkout/checkout"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));
const AdminPage = lazy(() => import("./pages/admin/admin"));

export default function App() {
  return (
    <div>
      <ScrollToTop/>
        <Switch>
            <Route path = "/admin" component = {AdminRoutes} />
            <Route path = "/" component = {Shop} />
        </Switch>
    </div>
  );
}

const AdminRoutes = () => {
  return (
    <Switch>
      <Suspense fallback={<Spinner/>} >
        <Route path = "/admin" component = {AdminPage} />
      </Suspense>
    </Switch>
  )
}

const Shop = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const CheckUserSessionOnLoading = useSelector(selectCheckUserSessionOnLoading);
  const history = useHistory();

  const handleRedirectToHomePage = () => {
    return currentUser ? history.goBack() : <SignInAndSignUpPage />
  }

  useEffect(
    () => {
      dispatch(checkUserSessionStart())
    }
  ,[dispatch])

  return CheckUserSessionOnLoading ? <></> : (
    <div>
      <div className="body-container" >
        <Header />
        <Notification />
        <Switch>
          <Suspense fallback={<Spinner/>} >
            <ErrorBoundary>
              <Route exact path = "/" component = {HomePage} />
              <Route path = "/shop" component = {ShopPage} />
              <Route path = "/signin" render={handleRedirectToHomePage} />
              <Route path = "/checkout" component = {CheckOutPage} />
              <Route path = "/profile" component={ProfilePage} />
            </ErrorBoundary>
          </Suspense>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}