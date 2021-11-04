import { useSelector, useDispatch } from 'react-redux';
import {start}  from  './global.slice';

function CharacterItem({data, location}) {
  return <tr>
            <td>{data.nombre}</td>
            <td>{data.status}</td>
            <td>{location.origin.name}</td>
            <td>{location.location.name}</td>
        </tr>
}


export default function CharacterList(props) {
  const characterList = useSelector((state) => state.global.characterList);
  const dispatch = useDispatch();
  console.log({characterList});

  return <div>
            <table border={1}>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Planeta Origen</th>
                <th>Planeta Actual</th>
              </tr>
              {characterList.map( (character, idx) => <CharacterItem key={idx} data={character.characterData} location={character.characterLocation} /> )}
            </table>
            <button onClick={() => dispatch(start()) } >ADD</button>
          </div>
}
