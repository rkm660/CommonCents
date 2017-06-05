import React from 'react';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

class LoginButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange);
    AuthActions.getCurrentUser();
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
  	if (this.state.current_user && this.state.current_user.length > 0){
  		return <li><a href="/logout">Logout</a></li>;
  	}
  	else {
   		return <li><a href="/auth/facebook">Login</a></li>;
  	}
  }
}



export default LoginButton;