import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ReactGA from 'react-ga';

import Header from './components/header/header';
import Footer from './components/footer/footer';

// import HomePage from './pages/homepage/homepage';
// import ShopPage from './pages/shop/shop';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
// import CheckOutPage from './pages/checkout/checkout';
// import ProfilePage from './pages/profile/profile';

import { Spinner } from './components/with-spinner/with-spinner';
import ScrollToTop from './scrolltotop';
import { selectCurrentUser, selectCheckUserSessionOnLoading } from './redux/user/user.selectors';
import { checkUserSessionStart } from './redux/user/user.action'
import ErrorBoundary from './components/errorboundary/errorboundary';

const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up"));
const CheckOutPage = lazy(() => import("./pages/checkout/checkout"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));

ReactGA.initialize('UA-216377923-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const CheckUserSessionOnLoading = useSelector(selectCheckUserSessionOnLoading);

  const handleRedirectToHomePage = () => {
    return currentUser ? <Redirect to = "/" /> : <SignInAndSignUpPage />
  }

  const handleRedirectToSignInPage = () => {
    return currentUser ? <ProfilePage /> : <SignInAndSignUpPage />
  }

  useEffect(
    () => {
      dispatch(checkUserSessionStart())
    }
  ,[dispatch])
  
  return CheckUserSessionOnLoading ? <Spinner /> : (
    <div>
      <div className="body-container" >
        <ScrollToTop/>
          <Header />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<></>} >
                <Route exact path = "/" component = {HomePage} />
                <Route path = "/shop" component = {ShopPage} />
                <Route exact path = "/signin" render = {handleRedirectToHomePage} />
                <Route path = "/checkout" component = {CheckOutPage} />
                <Route exact path = "/profile" render = {handleRedirectToSignInPage} />
              </Suspense>
            </ErrorBoundary>
          </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;