import React, { Component } from 'react';
import './App.css';
import Home from './home';
import Bar from './bar';
import Unsigned from './unlogined';
import Particles from 'react-particles-js';

class App extends Component {
 
	constructor(props) {
        super(props);
        this.state = {
          logged:false,
      };
    }  

  render() {
    let test = JSON.parse(localStorage.getItem("logged"));
    console.log(test);
    if(test){ 
      //console.log("I went here");    
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
