import React, { Component } from 'react';
import Create from './create';
import Bar from './bar';
import Particles from 'react-particles-js';
class createPage extends Component {
 
	constructor(props) {
        super(props);
    }  

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
	<Create />
	</div>
    </div>
    );
  }
}
export default createPage;
