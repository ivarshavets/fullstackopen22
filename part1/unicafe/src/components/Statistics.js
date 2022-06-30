import React from "react"

const StatsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const score = {good: 1, neutral: 0, bad: -1}

  const all = good + neutral + bad

  const positiveCount = good / all * 100
  const positive = Number.isFinite(positiveCount) ? positiveCount.toFixed(2) : 0

  const averageCount = (good * score.good + neutral * score.neutral + bad * score.bad) / all
  const average = Number.isFinite(averageCount) ? averageCount.toFixed(2) : 0

  return (
    <>
      <h1>Statistics</h1>
      {!!all ? (<table>
        <tbody>
          <StatsLine text="Good" value={good}/>
          <StatsLine text="Neutral" value={neutral}/>
          <StatsLine text="Bad" value={bad}/>
          <StatsLine text="All" value={all}/>
          <StatsLine text="Average" value={average}/>
          <StatsLine text="Positive" value={`${positive} %`}/>
        </tbody>
      </table>
    ) : "No feedback"}
    </>
  )
}

export default Statistics
