import { useState, useEffect } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import {
  addCharacterData,
  cleanCharacterData,
  loadCharacterData,
  saveCharacter,
} from './characterData.slice';
import { next as nextPage } from '../global/global.slice';

export default function CharacterData({userId = 1}) {
  const data = useSelector(state => state.characterData);
  console.log({data})
  const { characterData } = data;
  const [nombre, setNombre] = useState(characterData.name);
  const [status, setStatus] = useState(null);
  const [genero, setGenero] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCharacterData(userId));
  }, [userId]);


  const next = () => {
    console.log({
      nombre,
      status,
      genero,
      tipo,
    })
    if(nombre && status && genero && tipo) {
      dispatch(addCharacterData({
        nombre,
        status,
        genero,
        tipo,
      }));
      dispatch(nextPage());
    } else {
      setMessage("Debe completar todos los campos")
    }
  };
  const onSubmit = (values) => {
    window.alert(JSON.stringify(values, undefined, 2));
    setNombre(values.name);
    setGenero(values.gender);
    setTipo(values.type);
    setStatus(values.status);

    dispatch(saveCharacter(values));
    return {
      name: "Todo mal con tu nombre!",
     [FORM_ERROR]: "fallo el submit..."
    }
  };

  if(data.status === 'loading') {
    return <span>loading...</span>
  }
  return <section>
            {message && <span style={{color: 'red'}}>{message}</span>}
            <Form
              onSubmit={onSubmit}
              initialValues={{}}
              validate={(values) => {
                const errors = {};
                if(!values.name) {
                  errors.name = "Este campo es requerido";
                }
                if(!values.status) {
                  errors.status = "Required";
                }
                if(!values.gender) {
                  errors.gender = "Required";
                }
                if(!values.type) {
                  errors.type = "Required";
                }
                return errors;
              }}
              render={({ handleSubmit, form, submitting, values, submitError }) => (

                    <form onSubmit={handleSubmit}  >
                      {submitError && <div style={{color: 'red'}}>{submitError}</div>}
                      <div  >
                        <Field name="name" component="input">
                          {({ input, meta }) => (
                            <div>
                              <label>name</label>
                              <input {...input} type="text" placeholder="nombre..." />
                              {meta.error && meta.touched && <span style={{color: "red"}}>{meta.error}</span>}
                              {meta.submitError && <span style={{color: "red"}}>{meta.submitError}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        <Field name="status" component="select">
                          {({ input, meta }) => (
                            <div>
                              <label>Status</label>

                              <select {...input}  placeholder="estado..." >
                                <option />
                                <option value="DEAD">DEAD</option>
                                <option value="ALIVE">ALIVE</option>
                              </select>
                              {meta.error && meta.touched && <span style={{color: "red"}}>{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        <label>Gender</label>
                        <Field name="gender" component="select" >
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </Field>
                      </div>
                      <div>
                        <label>Type</label>
                        <Field name="type" component="select">
                          <option />
                          <option value="HUMAN">HUMAN</option>
                          <option value="ALIEN">ALIEN</option>
                        </Field>
                      </div>
                      <div  >
                        <button type="submit" disabled={submitting}>
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={form.reset}
                          disabled={submitting}
                        >
                          Reset
                        </button>
                      </div>
                      <pre>{JSON.stringify(values, undefined, 2)}</pre>
                    </form>
            )} />
            <button onClick={next} >NEXT</button>
          </section>
}
