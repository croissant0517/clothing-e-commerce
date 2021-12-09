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

import { 
  auth, 
  createUserProfileDocument,
  // addCollectionAndDocuments 
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
// import { selectShopCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends Component {
  
  handleRedirectToHomePage = () => {
    return this.props.currentUser ? <Redirect to = "/" /> : <SignInAndSignUpPage />
  }

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
      } 
      this.props.handlesetCurrentUser(userAuth);
      // addCollectionAndDocuments("collections", this.props.collectionsArray.map((collectionArray) => {
      //   return ({
      //     title: collectionArray.title,
      //     items: collectionArray.items
      //   })
      // }));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth = null;
  }
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route path = "/shop" component = {ShopPage} />
          <Route exact path = "/signin" render = {this.handleRedirectToHomePage} />
          <Route exact path = "/checkout" component = { checkOutPage } />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectShopCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => {
  return ({
    handlesetCurrentUser: (user) => dispatch(setCurrentUser(user)) 
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);