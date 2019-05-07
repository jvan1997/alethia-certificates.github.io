import React, { Component } from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';


class Unsigned extends Component {
		constructor(props) {
			super(props);
			this.state = {
				i : 0,
				j: 0,
				maintxt :'Welcome! Please login or signup to use Alethia',
				
				speed : 100,
				displaytxt: '',
			};


	}
	componentDidMount() {
		this.timeout = setInterval(() => {
		  if (this.state.i < this.state.maintxt.length) {
			let newI = this.state.i+1;
			this.setState({ i: newI });
				}
		}, 80);
	  }
	  componentWillUnmount() {
		clearInterval(this.timeout);
	  }
    goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
  render() {
		let displaytext = this.state.maintxt.substring(0,this.state.i);
    return (
      <div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">

				<p class="w-full block text-white text-5xl font-bold font-fancy text-center justify-center mb-16">
        		 Home
        		</p>

				<div class="w-full block text-white  text-3xl font-bold text-center font-fancy justify-center mb-16" >
					<p class="mb-16">
           	{displaytext}
          </p>
				</div>
				</div>
				</div>
    );
  }
}
export default withRouter(Unsigned);
