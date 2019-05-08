import React from 'react';
import Bar from "./bar";
/**
 * Error page in case the user accesses a page that does not exist.
 */
class Error extends React.Component {
	constructor(props){
  		super(props);
  		
 }
		
	render() {
    	return (<div>
		<Bar />
		<div>Error: Path does not exist. </div>
		</div>
		)	
	}
}

export default Error
