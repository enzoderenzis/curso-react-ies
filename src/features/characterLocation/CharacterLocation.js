import { useState } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addOrigin,
  addLocation,
} from './characterLocation.slice';

import {
  next as nextStep,
  prev as prevStep,
} from '../global/global.slice';

export default function CharacterLocation(props) {
  const [origen, setOrigen] = useState({});
  const [location, setLocation] = useState({});

  const dispatch = useDispatch();

  const next = () => {
    if(origen && location) {
      dispatch(addOrigin(origen));
      dispatch(addLocation(location));
      dispatch(nextStep())
    }
  };


  return <section>
            <form>
            <section>
              <input placeholder="nombre planeta origen" type="text" onBlur={(e) => setOrigen({ ...origen, name: e.target.value.trim() }) } />
              <input placeholder="url" type="text"  onBlur={(e) => setOrigen({ ...origen, url: e.target.value.trim() }) } />
            </section>
            <section>
              <input placeholder="nombre planeta Actual" type="text" onBlur={(e) => setLocation({ ...origen, name: e.target.value.trim() }) } />
              <input placeholder="url" type="text"  onBlur={(e) => setLocation({ ...origen, url: e.target.value.trim() }) } />
            </section>
            </form>
            <button onClick={() => dispatch(prevStep())} >PREV</button>
            <button onClick={next} >NEXT</button>
          </section>
}
