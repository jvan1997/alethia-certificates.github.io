import React, { Component } from 'react';
import Bar from './bar';
import Profile from './profile';
import Particles from 'react-particles-js';
/**
 * Profile Page that has particles as well as the profile component
 */
class ProfilePage extends Component {
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
			}}>          
			</Particles>
			<div class="z-n2">
		  <Bar />
		  <Profile/>
		  </div>
		</div>
    );
  }
}
export default ProfilePage;
