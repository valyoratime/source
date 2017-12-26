import React, { Component } from 'react'
import './App.css'
import * as moment from 'moment-business-days'
import { holidays } from './holidays'
import DeclensionHelper from './DeclensionHelper'

moment.locale('ru', {
  holidays: holidays,
  holidayFormat: 'DD-MM-YYYY',
  workingWeekdays: [1, 2, 3, 4, 5],
})


class App extends Component {
  newYear = () => {
    return (new Date()).getFullYear() === 2017
      ? moment('31-12-2017', 'DD-MM-YYYY')
      : moment('31-12-2018', 'DD-MM-YYYY')
  }
  
  now = () => moment(new Date())
  dayOfWeek = () => this.now().day()
  nowIsWeekend = () => this.dayOfWeek() === 0 || this.dayOfWeek() === 6
  
  daysLeftForm = (now = this.now()) => {
    return Math.round(this.newYear().diff(now, 'days', true))
  }
  
  businessDaysLeft = (to = this.newYear()) => {
    const diff = Math.round(to.businessDiff(this.now(), true))
    
    if (this.nowIsWeekend()) {
      return diff
    } else {
      return diff - 1
    }
  }
  
  daysWord = number => DeclensionHelper.daysWord(number)
  workWord = number => DeclensionHelper.workWord(number)
  leftWord = number => DeclensionHelper.leftWord(number)
  
  render() {
    const daysLeft = this.daysLeftForm()
    const dayWord = this.daysWord(daysLeft)
    const leftDayWord = this.leftWord(daysLeft)
    
    const workingDaysLeft = this.businessDaysLeft()
    const workWord = this.workWord(workingDaysLeft)
    const workingDayWord = this.daysWord(workingDaysLeft)
    const leftWorkingDayWord = this.leftWord(workingDaysLeft)
    
    
    return (
      <div className="App">
        <h1>Возрадуйся же, <span>@valyora</span></h1>
        <div className="left">
          <p className="normal-days">Ибо до нового года {leftDayWord} {daysLeft} {dayWord}!</p>
          <p className="working-days">
            А это значит, что {leftWorkingDayWord} {workingDaysLeft} {workWord} {workingDayWord}!
          </p>
        </div>
      </div>
    )
  }
}

export default App
