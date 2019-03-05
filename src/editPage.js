import React, { Component } from 'react';
import Edit from './edit';
import Bar from './bar';
class createPage extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
	<div>
	<Bar />
	<Edit />
	</div>
    );
  }
}
export default createPage;
