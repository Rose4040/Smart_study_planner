import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [monthlyInput, setMonthlyInput] = useState('');
  const [weeklyInput, setWeeklyInput] = useState('');
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedMonthly = JSON.parse(localStorage.getItem('monthlyGoals')) || [];
    const savedWeekly = JSON.parse(localStorage.getItem('weeklyGoals')) || [];
    setMonthlyGoals(savedMonthly);
    setWeeklyGoals(savedWeekly);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('monthlyGoals', JSON.stringify(monthlyGoals));
  }, [monthlyGoals]);

  useEffect(() => {
    localStorage.setItem('weeklyGoals', JSON.stringify(weeklyGoals));
  }, [weeklyGoals]);



  // Add goal functions
  const addMonthlyGoal = () => {
    if (monthlyInput.trim() !== '') {
      setMonthlyGoals([...monthlyGoals, { text: monthlyInput, completed: false }]);
      setMonthlyInput('');
    }
  };

  const addWeeklyGoal = () => {
    if (weeklyInput.trim() !== '') {
      setWeeklyGoals([...weeklyGoals, { text: weeklyInput, completed: false }]);
      setWeeklyInput('');
    }
  };

  // Toggle completion
  const toggleMonthlyGoal = (index) => {
    const newGoals = [...monthlyGoals];
    newGoals[index].completed = !newGoals[index].completed;
    setMonthlyGoals(newGoals);
  };

  const toggleWeeklyGoal = (index) => {
    const newGoals = [...weeklyGoals];
    newGoals[index].completed = !newGoals[index].completed;
    setWeeklyGoals(newGoals);
  };

  // Progress calculations
  const monthlyProgress = monthlyGoals.length > 0
    ? (monthlyGoals.filter(g => g.completed).length / monthlyGoals.length) * 100
    : 0;

  const weeklyProgress = weeklyGoals.length > 0
    ? (weeklyGoals.filter(g => g.completed).length / weeklyGoals.length) * 100
    : 0;
//dues
const totalGoals = monthlyGoals.length + weeklyGoals.length;
const totalDues = monthlyGoals.filter(g => !g.completed).length 
                + weeklyGoals.filter(g => !g.completed).length;

const duesPercent = totalGoals > 0 ? (totalDues / totalGoals) * 100 : 0;


  return (
    <div className="App">
      <header className="App-header">
        <div><b>BeSmart</b></div>
        <div className='sign'><button className='but'>Sign-in</button></div>
      </header>

      <div className='a'>
        <div className='p'>
          Progress
          <div className='bar-container'>
            <div className='bar-fill' style={{ width: `${monthlyProgress}%` }}></div>
          </div>
        </div>
        <div className='p'>
          Dues
          <div className='bar-container'>
            <div className='bar-fill dues' style={{ width: `${duesPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className='sec'>
        <div className='k'>
          Monthly Goals
          <input type='text' value={monthlyInput} onChange={(e) => setMonthlyInput(e.target.value)} />
          <button className='butto' onClick={addMonthlyGoal}>+</button>
        </div>
        <div className='tablebox1'>
        <div className='table1'>
          {monthlyGoals.map((goal, index) => (
            <div key={index} className='goal-item'>
              <label style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
                <input type="checkbox" checked={goal.completed} onChange={() => toggleMonthlyGoal(index)} /> {goal.text}
              </label>
              <button className='butt1' onClick={() => {
                setMonthlyGoals(monthlyGoals.filter((_, i) => i !== index));
              }}>Delete</button>
            </div>
          ))}
        </div></div>

        {/* Weekly Goals */}
        <div className='k1'>
          Weekly Goals
          <input type='text' value={weeklyInput} onChange={(e) => setWeeklyInput(e.target.value)} />
          <button className='butto' onClick={addWeeklyGoal}>+</button>
        </div>
         <div className='tablebox2'>
         <div className='table2'>
          {weeklyGoals.map((goal, index) => (
            <div key={index} className='goal-item'>
              <label style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
                <input type="checkbox" checked={goal.completed} onChange={() => toggleWeeklyGoal(index)} /> {goal.text}
              </label>
              <button className='butt1' onClick={() => {
                setWeeklyGoals(weeklyGoals.filter((_, i) => i !== index));
              }}>Delete</button>
            </div>
          ))}</div> 
        </div>
      </div>
    </div>
  );
}

export default App;
