import React, { useRef, useState } from "react";

const Form = ({input}) => {
    const inputLength = input.length ;
    const [number, setNumber] = useState(inputLength) ;
    const inputRef = useRef() ;

    const API_BASE_URL = "http://localhost:3001/";

    const formHandler = async (event) => {
        event.preventDefault();
        const receiveInput = inputRef.current.value;

        console.log(receiveInput);


        const response = await fetch(API_BASE_URL + "api/posts", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: number + 1 || 1,
              text: receiveInput,
              timestamp: Date.now(),
            }),
          });
      
          return response.json();
    };

    return (
        <form onSubmit={formHandler}>

            <input ref={inputRef} type="text" />
            <button type='submit'>SUBMIT</button>
        </form>
    )
}


export default Form ;