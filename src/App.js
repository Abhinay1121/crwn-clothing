import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      currentUser:null
    }
  }
unsubscribeFromAuth =null;
  async componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      console.log(userRef)
      userRef.onSnapshot(snapShot => {
        this.setState(
        {
          currentUser:{
            id: snapShot.id,
            ...snapShot.data()
          }
        },
        () => {
          console.log(this.state);
        }
        );
    });
  }
  this.setState({currentUser: userAuth });   

}); 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <Router>
      <div>
        <Header currentUser={this.state.currentUser}/>
       
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

export default App;
