import React, { Component } from 'react';
import Create from './create';
import Logout from './logout';
class createPage extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
	<div>
	<Logout />
	<Create />
	</div>
    );
  }
}
export default createPage;
