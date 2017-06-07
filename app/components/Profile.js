import React from 'react';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    UserActions.getUser(this.props.params.id);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
    //$(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      UserActions.getUser(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='profile-info clearfix'>
          <h2><strong>Full Name</strong></h2>
          <h4 className='lead'>Email: <strong>asdf@gmail.com</strong></h4>
          <h4 className='lead'>Hometown: <strong>asdf</strong></h4>
          <h4 className='lead'>Phone: <strong>123-123-1234</strong></h4>
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>0</span>Balance</li>
            <li><span className='stats-number'>0</span>Individual Contributions</li>
            <li><span className='stats-number'>0</span>Collective Contributions</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;