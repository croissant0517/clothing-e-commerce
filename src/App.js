import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ReactGA from 'react-ga';

import Header from './components/header/header';
import Footer from './components/footer/footer';

import { Spinner } from './components/with-spinner/with-spinner';
import ScrollToTop from './scrolltotop';
import { selectCurrentUser, selectCheckUserSessionOnLoading } from './redux/user/user.selectors';
import { checkUserSessionStart } from './redux/user/user.action'
import { fetchCollectionsStart } from './redux/shop/shop.action'; 
import ErrorBoundary from './components/errorboundary/errorboundary';

const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up"));
const CheckOutPage = lazy(() => import("./pages/checkout/checkout"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));

ReactGA.initialize('216377923-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
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
      dispatch(fetchCollectionsStart());
    }
  ,[dispatch])
  
  return CheckUserSessionOnLoading ? <></> : (
    <div>
      <div className="body-container" >
        <ScrollToTop/>
          <Header />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner/>} >
                <Route exact path = "/" component = {HomePage} />
                <Route path = "/shop" component = {ShopPage} />
                <Route exact path = "/signin" render={handleRedirectToHomePage} />
                <Route path = "/checkout" component = {CheckOutPage} />
                <Route exact path = "/profile" component={ProfilePage} />
                {/* <Route exact path="/admin" component={AdminPage} /> */}
              </Suspense>
            </ErrorBoundary>
          </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;