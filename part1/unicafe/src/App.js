import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, bad, neutral }) => {
  if (good + neutral + bad === 0) return <p>No feedback given</p>;
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticsLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
