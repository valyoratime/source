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

const businessDaysInWeek = 5


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
  
  businessWeeksLeft = days => Math.floor(days / businessDaysInWeek)
  additionalBusinessDaysLeft = days => days % businessDaysInWeek
  
  render() {
    const daysLeft = this.daysLeftForm()
    const dayWord = DeclensionHelper.daysWord(daysLeft)
    const leftDayWord = DeclensionHelper.leftWord(daysLeft)
    
    const businessDaysLeft = this.businessDaysLeft()
    const workWord = DeclensionHelper.workWord(businessDaysLeft)
    const workingDayWord = DeclensionHelper.daysWord(businessDaysLeft)
    const leftWorkingDayWord = DeclensionHelper.leftWord(businessDaysLeft)
    
    const businessWeeksLeft = this.businessWeeksLeft(businessDaysLeft)
    const leftWeekWord = DeclensionHelper.leftWeekWord(businessWeeksLeft)
    const workWeekWord = DeclensionHelper.workWeekWord(businessWeeksLeft)
    const weekWord = DeclensionHelper.weekWord(businessWeeksLeft)
    
    const additionalBusinessDaysLeft = this.additionalBusinessDaysLeft(businessDaysLeft)
    const additionalWorkWord = DeclensionHelper.workWord(additionalBusinessDaysLeft)
    const additionalWorkingDayWord = DeclensionHelper.daysWord(additionalBusinessDaysLeft)
    
    const slogan = businessDaysLeft < 100 ? 'Возрадуйся же, ' : 'Взгрустни немного, '
    
    
    return (
      <div className="App">
        <div className="wrapper">
          <h1>{slogan}<span className="valyora">@valyora</span></h1>
          <div className="left">
            <p className="normal-days">Ибо до нового года {leftDayWord} {daysLeft} {dayWord}!</p>
            <p className="business-days">
              А это значит, что {leftWorkingDayWord} {businessDaysLeft} {workWord} {workingDayWord}!*
            </p>
            <p>
              {(businessWeeksLeft >= 1) && (
                <span>
                {`А это значит, что ${leftWeekWord} ${businessWeeksLeft} ${workWeekWord} ${weekWord}
                и ${additionalBusinessDaysLeft} ${additionalWorkWord} ${additionalWorkingDayWord}`}
              </span>
              )}
            </p>
          </div>
          <p className="note">* Количество рабочих дней считается исключая сегодняшний, как ты любишь.</p>
        </div>
      </div>
    )
  }
}

export default App
