import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import checkOutPage from './pages/checkout/checkout';
import Footer from './components/footer/footer';

import ScrollToTop from './scrolltotop';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from './redux/cart/cart.selectors';
import { checkUserSession } from './redux/user/user.action'

class App extends Component {
  unsubscribeFromAuth = null;
  
  handleRedirectToHomePage = () => {
    return this.props.currentUser ? <Redirect to = "/" /> : <SignInAndSignUpPage />
  }

  componentDidMount() {
    this.props.handleCheckUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       this.props.handlesetCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       })
    //     })
    //   } 
    //   // 如果沒有userAuth，將設定成null
    //   this.props.handlesetCurrentUser(userAuth);
    // });
  }
  
  render() {
    return (
      <div>
        <ScrollToTop/>
        <Header />
        <div className="body-container" >
          <Switch>
            <Route exact path = "/" component = {HomePage} />
            <Route path = "/shop" component = {ShopPage} />
            <Route exact path = "/signin" render = {this.handleRedirectToHomePage} />
            <Route exact path = "/checkout" component = { checkOutPage } />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
  handleCheckUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);