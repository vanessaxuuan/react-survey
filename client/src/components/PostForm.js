import React from "react";
import { useState } from 'react';
import {qnBuffer, choiceBuffer} from "./Home";
import { useNavigate } from "react-router-dom";
import {StyledButton, StyledForm, StyledFormWrapper} from "./Style.js"

function PostForm() {
  const resp_url = "/questions/responses" // to server 
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: " ",
    colour: {
      Blue: false,
      Red: false,
      Green: false,
      Yellow: false,
      Purple: false,
      Pink: false
    },
    prog_lang: {
      Python: false,
      Java: false,
      Ruby: false,
      JavaScript: false,
      Golang: false
    },
    languages: {
      English: false,
      Chinese: false,
      Malay: false,
      Tamil: false,
      Hindi: false
    },
    would_pay: {
      Yes: false,
      No: false
    }
  })

  function handleChange(e) {
    const newData = { ...data } // copy curr data
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  function handleCheckbox(e) {
    const newData = { ...data } // copy curr data
    const updatedField = newData[e.target.id]
    updatedField[e.target.value] = e.target.checked
    newData[e.target.id] = updatedField
    setData(newData)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newResponse = {
      method: "POST",
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    console.log("client sent: ", newResponse.body)
    const response = await fetch(resp_url, newResponse) // post request to server 
    const server_response = await response.json()
    console.log("server replied: ", server_response)
    const userId = server_response.id
    navigate(`/Summary/${userId}`) // navigates to summary page 
  }

  /**
   * Generates HTML script to produce checkbox or radio inputs 
   */
  function generateCheckBoxes(arr =[], _id, _type) {
    let field = data[_id]
    return (
      arr.map(item => 
      <p><input type={_type} name={_id} id={_id} value={item} onChange={handleCheckbox} checked={field.item}/> {item}</p>
      )
    )
  }

  return (
    <div>
      <StyledButton onClick={() => navigate(-1)}>Back</StyledButton>
      <StyledFormWrapper>
      <StyledForm onSubmit={e => handleSubmit(e)}>
        <div>
          <label>{qnBuffer[0]}</label>
          <p><input type="text" required id="name" value={data.name} onChange={handleChange} /></p>
        </div>
        <div>
          <label>{qnBuffer[1]}</label>
          <div>{generateCheckBoxes(choiceBuffer[1], "colour", "checkbox")}</div>
    
        </div>
        <div>
          <label>{qnBuffer[2]}</label>
          <div>{generateCheckBoxes(choiceBuffer[2], "prog_lang", "radio")}</div>
        </div>
        <div>
          <label>{qnBuffer[3]}</label>
          <div>{generateCheckBoxes(choiceBuffer[3], "languages", "checkbox")}</div>
        </div>
        <div>
          <label>{qnBuffer[4]}</label>
          <div>{generateCheckBoxes(choiceBuffer[4], "would_pay", "radio")}</div>
        </div>
        <StyledButton type="submit">submit</StyledButton>
      </StyledForm>
      </StyledFormWrapper>
    </div>
  )
}

export default PostForm