## Alethia
Alethia is a platform for blockchain enabled certificates using Ethereum's Rikeby Testnet and Ganache-CLI for testing smart contracts. Link to the source code: https://github.com/jvan1997/alethia-certificates.github.io

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
+ Voting on a certificate:

## Built With

* [Firebase](https://github.com/firebase/) - Backend and Database storage.
* [React](https://github.com/facebook/react) - Web Framework to render Alethia.
* [TailwindCSS](https://github.com/tailwindcss/tailwindcss) - Styling Standard used for the Frontend.

## Authors

* **Jenil Thakker** - *Implemented Ethereum Blockchain into Alethia*
* **Vincent Diep** - *Integration with backend and frontend; Set up Server.*
* **Jonathan Van** - *Designed and Implemented Frontend*

## Dependencies

