import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

unsubscribeFromAuth =null;
  async componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      
      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          
        });
    });
  }
  setCurrentUser({userAuth });   

}); 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <Router>
      <div>
        <Header />
       
       <Switch>
        <Route exact path ="/" component={HomePage} />
        <Route  path ="/shop" component={ShopPage} />
        <Route  path ="/signin" component={SignInAndSignUpPage} />
       </Switch>
      
        </div>
        </Router>
    );
  }
 
}

const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser())
})


const withConnect = connect(null, mapDispatchToProps)

export default withConnect(App);



