import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import checkOutPage from './pages/checkout/checkout';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends Component {

  handleRedirectToHomePage = () => {
    return this.props.currentUser ? <Redirect to = "/" /> : <SignInAndSignUpPage />
  }
    

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.handlesetCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        this.props.handlesetCurrentUser(userAuth)
      } 
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log("componentWillUnmount");
  }
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route exact path = "/shop" component = {ShopPage} />
          <Route exact path = "/signin" render = {this.handleRedirectToHomePage} />
          <Route exact path = "/checkout" component = { checkOutPage } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => {
  return ({
    handlesetCurrentUser: (user) => dispatch(setCurrentUser(user)) 
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);