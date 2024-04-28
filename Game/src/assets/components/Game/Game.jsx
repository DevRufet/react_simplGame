import React from 'react'
import './game.css'
import { useState } from 'react';
function Game() {
  const [myinp, setmyinp] = useState("");
  const [mystr, setmystr] = useState("");
    let arr=["das","kagiz","qayci"]
    let reqem=Math.floor(Math.random()*3)
  function gameis(){
    if((myinp===arr[0]) || (myinp===arr[1]) || (myinp===arr[2]) ){
      if(arr[reqem]===myinp){
        setmystr("Berabere qaldiniz") 
       
  }
  else if(((myinp===arr[1] ) && arr[reqem]===arr[0]) || (myinp===arr[0] && arr[reqem]===arr[2]) || (myinp===arr[2]) && arr[reqem]===arr[1]){
      
      setmystr("Qalib geldiniz")
      
  }
  else{
      setmystr("Meglub oldunuz")
      
  }
  }
  else{
      setmystr("Duzgun sozu daxil edin")
  }  
  }
    
  return (
    <>
    <div className='game'>
      <h1>Game</h1>
      <input type="text" required value={myinp} onChange={(e)=>setmyinp(e.target.value)}/>
      <button onClick={()=>gameis()}>Send</button>
      <div>{mystr}</div>
    </div>
    </>
  )
}

export default Game
