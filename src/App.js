import { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./Form.js";

const API_BASE_URL = "http://localhost:3001/";

function App() {
  const newInputRef = useRef();
  const [input, setInput] = useState([]);
  const [followEdit, setFollowEdit] = useState(false);

  useEffect(() => {
    const getInput = async () => {
      const result = await fetch(`${API_BASE_URL}api/posts`);
      const data = await result.json();
      console.log(data);
      setInput(data);
    };
    getInput();
  }, []);

  const deleteHeader = (element) => {
    const newInput = input.filter((text) => text.id !== element.id);
    setInput(newInput);

  }

  const updateHandler = (element) => {

    setFollowEdit(true);

    const incomingText = newInputRef.current.value;
    const textForChange = input.find((text) => text.id === element.id);
    textForChange.text = incomingText;

    setFollowEdit(false);
  }

  return (
    <Form input={input} >
      <div>
        {input.map((el, i) =>{
          return (
            <div key={`${i}-${el}`}>
              {el.text}

              <button onClick={() => {
                deleteHeader(el);
              }}>
                Delete
              </button>

              <button onClick={() => {
                updateHandler(el);
              }}>
                Update
              </button>

              {followEdit && (
                <form>
                  <input type='text' ref={newInputRef} />
                  <button onClick={updateHandler}>Edit</button>
                </form>
              )}
              
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default App;
