import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      } else {
        this.setState({
          currentUser: userAuth
        })
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
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact = { true } path = "/" component = {HomePage} />
          <Route exact = { true } path = "/shop" component = {ShopPage} />
          <Route exact = { true } path = "/signin" component = {SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;