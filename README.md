## Alethia
Alethia is a platform for blockchain enabled certificates using Ethereum's Rikeby Testnet and Ganache-CLI for testing smart contracts. The name "Alethia" stems from the Greek spirit of truth, something that this project values. The intent of this application is to allow alumni to upload their certificates and along with a signature ID provided by their school's dean in order to allow other users of Alethia to vote for their certificate to make it valid. 

`Link to the source code: https://github.com/jvan1997/alethia-certificates.github.io`

## Setup 
1. `git clone https://github.com/jvan1997/alethia-certificates.github.io.git`
2. `cd alethia-certificates.github.io/src`
3. `npm install --save`
4. Download Metamask for your browser, and deposit some test tokens. (Link to download: https://metamask.io/)
5. To deposit test tokens, request some from a test faucet (Instructions: https://medium.com/hellogold/adding-tokens-to-metamask-60b2fedd5bd9)
6. In your terminal type `testrpc` in one window and run the application on a different window. (Link to download: https://truffleframework.com/docs/ganache/quickstart)

## Running the application

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Code Structure

### Top level Alethia File layout

    .
    ├── node_modules                    # The node module dependencies
    ├── public                          # Public files of Alethia
    ├── src                             # Source files of Alethia
    ├── tailwind.js                     # Tailwind js used to create tailwind.css/index.css
    ├── package.json                    # List of dependencies
    ├── server.js                       # Server file for Alethia
    ├── LICENSE
    └── README.md

### Alethia src File layout

    .
    ├── ...
    ├── src                             
    │   ├── Backstuff                   # Ethereum related files go in here
    │   ├── css                         # CSS files go in here
    │   ├── Gifs                        # Gifs used for README go here
    │   └── Images                      # Images used for Alethia go here
    └── ...

### Important Files in Alethia
    .
    ├── ...
    ├── src                             
    │   ├── App.js                      # Loads the home page
    │   ├── bar.js                      # Navigation bar for Alethia
    │   ├── create.js                   # Create and Upload Certificate
    │   ├── edit.js                     # Edit Uploaded Certificate
    │   ├── deploy.js                   # Deploy Certificate onto Ethereum
    │   ├── firebase.js                 # Set up Firebase information
    │   ├── functions.js                # Functions of Firebase
    │   ├── index.js                    # Routing for the React pages
    │   ├── keys.js                     # Generates the key value pair
    │   ├── login.js                    # Login Authenticator Component
    │   ├── profile.js                  # Profile Page to Interact with Certificate
    │   ├── signUp.js                   # Sign Up the User
    │   ├── verify.js                   # Verify the Certificate onto Ethereum
    │   └── vote.js                     # View one's status and verify other Certificates
    └── ...

### Video Demo of React Components

(Link to Video: https://www.youtube.com/watch?v=Bqg9z-r6nUM/)

### React Components
* Creating a certificate:
  * Uploading a certificate:

    ![](/src/Gifs/Create.gif)

* Viewing a certificate:
  * Download:

    ![](/src/Gifs/Download.gif)

  * Edit:

    ![](/src/Gifs/Edit.gif)

  * Vote:

    ![](/src/Gifs/UnverifiedVote.gif)
    
    ![](/src/Gifs/VerifiedVote.gif)

  * Verify:

    ![](/src/Gifs/Verify.gif)
* About Alethia
  * Team: Jonathan Van, Jenil Thakker, Vincent Diep
  * How it works: Architecture and design for Alethia

  ![](/src/Gifs/About.png)

### Ethereum Components
+ Deploying a certificate:
  ![](/src/Gifs/ganache.gif)

## Built With

* [Firebase](https://github.com/firebase/) - Backend and Database storage.
* [React](https://github.com/facebook/react) - Web Framework to render Alethia.
* [TailwindCSS](https://github.com/tailwindcss/tailwindcss) - Styling Standard used for the Frontend.

## Authors

* **Jenil Thakker** - *Implemented Ethereum Blockchain into Alethia*
* **Vincent Diep** - *Integration with backend and frontend; Set up Server.*
* **Jonathan Van** - *Designed and Implemented Frontend*

## Acknowledgments

* Dr. Younghee Park
* Professor Rod Fatoohi

