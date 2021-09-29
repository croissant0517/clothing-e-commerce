import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';

class App extends Component {

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
          <Route exact = { true } path = "/" component = {HomePage} />
          <Route exact = { true } path = "/shop" component = {ShopPage} />
          <Route exact = { true } path = "/signin" component = {SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handlesetCurrentUser: (user) => dispatch(setCurrentUser(user)) 
  });
}

export default connect(null, mapDispatchToProps)(App);