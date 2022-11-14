import React from "react";
import Die from "./Die";

function App() {
  
  const [dice, setDice] = useState(allNewDice())


  function allNewDice(){
    const newDice = []
    for(let i=0; i< 12; i++){
      newDice.push(
        Math.ceil(Math.random() * 6)
      )
    }
    return newDice
  }

  const diceElements = dice.map(die => 
    <Die
    value = {die.value}/>)

  return (
   <main>
    <div className="die-container">
           {diceElements}
        </div>
   </main>
  );
}

export default App;
