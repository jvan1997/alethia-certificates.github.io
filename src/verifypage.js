
import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import Verify from './verify';
import Particles from 'react-particles-js';
class VerifyPage extends React.Component {


	render() {
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
		  <Verify/>
		  </div>
		</div>
	)	
	}
}

export default withRouter(VerifyPage);
