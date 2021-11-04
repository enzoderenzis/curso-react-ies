import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import  CharacterData  from './features/characterPersonalData/CharacterData';
import CharacterLocation from './features/characterLocation/CharacterLocation';
import ViewCharacter  from  './features/viewCharacter/ViewCharacter';
import CharacterList from './features/global/CharacterList';
import './App.css';

function App() {
  const position = useSelector( state => state.global.position );
  console.log({position})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {position === 0 &&  <CharacterData />}
        {position === 1 &&  <CharacterLocation />}
        {position === 2 &&  <ViewCharacter />}
        {position === 3 &&  <CharacterList />}


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
