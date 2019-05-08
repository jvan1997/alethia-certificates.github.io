import React, { Component } from 'react';
import './App.css';
import Home from './home';
import Bar from './bar';
import Unsigned from './unlogined';
import Particles from 'react-particles-js';
/**
 * Class App is basically the home page.
 * It switches between the unlogined and home js.
 * This is based on the localStorage if the logged boolean
 * is true or not.
 */
class App extends Component {
 
	constructor(props) {
        super(props);
        this.state = {
          logged:false,
      };
    }  
/**
 * If test is true, then it will render the user to the home 
 * page where they are logged in, else it will render them to the
 * unlogged in page.
 */
  render() {
    let test = JSON.parse(localStorage.getItem("logged"));
    if(test){ 
      return (
		  <div>
<Particles
	className="bg-cover-image fixed w-screen h-screen z-n1"
    params={{
	    "particles": {
	        "number": {
	            "value": 100
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}}>          </Particles>
			<div class="z-n2">
	        <Bar />
	        <Home />
			</div>

          </div>
          );
      }
    else{
      return (
		<div>
		<Particles
			className="bg-cover-image fixed w-screen h-screen z-n1"
			params={{
				"particles": {
					"number": {
						"value": 100
					},
					"size": {
						"value": 3
					}
				},
				"interactivity": {
					"events": {
						"onhover": {
							"enable": true,
							"mode": "repulse"
						}
					}
				}
			}}>          </Particles>
			<div class="z-n2">
      <Bar />
      <Unsigned />
      </div>
      </div>
    );
  }
}
}

export default App;
