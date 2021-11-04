import { useState, useEffect } from  'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  prev as prevStep,
  next as nextStep,
  addToList,
} from '../global/global.slice';

import { cleanCharacterData } from '../characterPersonalData/characterData.slice';
import { cleanCharacterLocation } from '../characterLocation/characterLocation.slice';

export default function ViewCharacter(props) {
  const characterData = useSelector((state) => state.characterData.characterData);
  const characterLocation = useSelector((state) => state.characterLocation);
  const dispatch = useDispatch();


  const character = {
    characterData, //tab 1
    characterLocation, //tab 2
  };

  const save = () => {
    console.log("=================== save ==================")
    dispatch(addToList(character))
    dispatch(cleanCharacterData())
    dispatch(cleanCharacterLocation());
    dispatch(nextStep())
  };


  return <section>
            <pre>{JSON.stringify(character, undefined, 8)}</pre>
            <button onClick={() => dispatch(prevStep())} >prev</button>
            <button onClick={save} >finalizar</button>
         </section>
}
