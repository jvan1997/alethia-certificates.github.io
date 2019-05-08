import React, { Component } from 'react';
import Edit from './edit';
import Bar from './bar';
import Particles from 'react-particles-js'
class editPage extends Component {
 
  render() {
    return (
      <div>
      <Particles
        className="bg-cover-image fixed h-screen w-screen z-n1"
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
	<Edit />
	</div>
  </div>
    );
  }
}
export default editPage;
