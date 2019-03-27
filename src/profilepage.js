import React, { Component } from 'react';
import Edit from './edit';
import Bar from './bar';
import Profile from './profile';
class ProfilePage extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
		<div class="bg-cover-image h-screen" >
		<div>
		  <Bar />
		  <Profile/>
		  </div>
		</div>
    );
  }
}
export default ProfilePage;
