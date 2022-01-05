import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import checkOutPage from './pages/checkout/checkout';
import Footer from './components/footer/footer';

import ScrollToTop from './scrolltotop';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.action'

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleRedirectToHomePage = () => {
    return currentUser ? <Redirect to = "/" /> : <SignInAndSignUpPage />
  }

  useEffect(
    () => {
      dispatch(checkUserSession())
    }
  ,[dispatch])
  
  return (
    <div>
      <ScrollToTop/>
      <Header />
      <div className="body-container" >
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route path = "/shop" component = {ShopPage} />
          <Route exact path = "/signin" render = {handleRedirectToHomePage} />
          <Route exact path = "/checkout" component = { checkOutPage } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;