import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import  CharacterData  from './features/characterPersonalData/CharacterData';
import CharacterLocation from './features/characterLocation/CharacterLocation';
import ViewCharacter  from  './features/viewCharacter/ViewCharacter';
import CharacterList from './features/global/CharacterList';
import {
  setUser,
  cleanUser,
} from './features/global/global.slice';
import './App.css';

const googleClientId = "790472503871-862ja67k2gsncq2vvmn1pa748m9f3nhi.apps.googleusercontent.com";

function App() {
  const dispatch = useDispatch();
  const position = useSelector( state => state.global.position );
  const user = useSelector( state => state.global.user );

  const onSuccessLogin = (response) => {
    console.log("========== onSuccess ==============", response)
    console.log("response.profileObj", response.profileObj)
    if(response && response.accessToken && response.profileObj) {
      dispatch(setUser({...response.profileObj, accessToken: response.accessToken}))
    }
  };
  const onErrorLogin = (response) => {
    console.log("========== onError ==============", response);
    dispatch(cleanUser());
  };
  console.log({user})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!user ?
          <GoogleLogin
              clientId={googleClientId}
              buttonText="Log in with Google"
              onSuccess={onSuccessLogin}
              onFailure={onErrorLogin}
              cookiePolicy={'single_host_origin'}
          />
        :
        <>
        {position === 0 &&  <CharacterData />}
        {position === 1 &&  <CharacterLocation />}
        {position === 2 &&  <ViewCharacter />}
        {position === 3 &&  <CharacterList />}
        <GoogleLogout
            clientId={googleClientId}
            buttonText="Logout"
            onLogoutSuccess={() => dispatch(cleanUser()) }
          />
        </>
        }



        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
