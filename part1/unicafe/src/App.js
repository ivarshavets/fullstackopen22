import React, {useState} from 'react';
import './App.css';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1) //setGood(good => good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  // const feedbackToHumanMap = {
  //   good: "good",
  //   neutral: "neutral",
  //   bad: "bad"
  // }

  // const handleClick = (state) => {
  //   if (state == feedbackToHumanMap.good) {
  //     setGood(good + 1)
  //   }
  //   if (state == feedbackToHumanMap.neutral) {
  //     setNeutral(neutral + 1)
  //   }
  //   if (state == feedbackToHumanMap.bad) {
  //     setBad(bad + 1)
  //   }
  // }

  return (
    <div className="App">
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="Good"/>
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
};

export default App;
