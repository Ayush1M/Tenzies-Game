import { useEffect, useState } from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() =>  {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameFirstValue = dice.every(die => die.value === firstValue)
    if(allHeld && sameFirstValue){
      setTenzies(true)
    }
  }, [dice])

  function generateNewDice(){
   return {
    value: Math.ceil(Math.random() * 6), 
    isHeld: false,
    id : nanoid()
   }
  }
  

  function allNewDice(){
    const newDice = []
    for(let i=0; i< 12; i++){
      newDice.push(
       generateNewDice()
      )
    }
    console.log(newDice)
    return newDice
  }

  function rollDice(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDice() 
    }))
    setCount(count + 1)
  }

  function resetGame(){
    setDice(allNewDice())
    setTenzies(false)
    setCount(0)
  }

  const diceElements = dice.map(die => 
  <Die key={die.id} 
  value = {die.value}  
  isHeld = {die.isHeld} 
  holdDice = {() => holdDice(die.id)}/>)

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="die-content">
        <h1 className="die-heading">Tenzies</h1>
        <p className="die-instruct">Roll until all the dice are same. Click each die to freeze it at its current value. </p>
      </div>
      <h3 className="count" onClick={rollDice}>Count : {count} </h3>
        <div className="die-container">
           {diceElements}
        </div>
        {tenzies ? <button className="btn" onClick={resetGame}>Reset Game</button> : <button className="btn" onClick={rollDice}>Roll</button>}
    </main>
  )
}
