import React, { Component } from 'react';
import Create from './create';
import Bar from './bar';
class createPage extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
	<div>
	<Bar />
	<Create />
	</div>
    );
  }
}
export default createPage;
