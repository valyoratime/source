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
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }
  
  initialState = () => {
    const businessDaysLeft = this.businessDaysLeft()
    const businessWeeksLeft = this.businessWeeksLeft(businessDaysLeft)
    const additionalBusinessDaysLeft = this.additionalBusinessDaysLeft(businessDaysLeft)
    
    return {
      newYear: this.newYear(),
      daysLeft: this.daysLeftForm(),
      businessDaysLeft,
      businessWeeksLeft,
      additionalBusinessDaysLeft,
    }
  }
  
  
  newYear = () => {
    return (new Date()).getFullYear() === 2017
      ? moment('01-01-2018', 'DD-MM-YYYY')
      : moment('01-01-2019', 'DD-MM-YYYY')
  }
  
  now = () => moment(new Date())
  dayOfWeek = () => this.now().day()
  nowIsWeekend = () => this.dayOfWeek() === 0 || this.dayOfWeek() === 6
  businessWeeksLeft = days => Math.floor(days / businessDaysInWeek)
  additionalBusinessDaysLeft = days => days % businessDaysInWeek
  
  daysLeftForm = (date = this.now()) => {
    const diff = this.newYear().diff(date, 'days', true)
    if (diff <= 0) return 0
    return Math.round(diff)
  }
  
  businessDaysLeft = (to = this.newYear()) => {
    const diff = Math.round(to.businessDiff(this.now(), true))
    if (diff === 0) return 0
    
    if (this.nowIsWeekend()) {
      return diff
    } else {
      return diff - 1
    }
  }
  
  
  render() {
    const { daysLeft, businessDaysLeft, businessWeeksLeft, additionalBusinessDaysLeft } = this.state
    
    const dayWord = DeclensionHelper.daysWord(daysLeft)
    const leftDayWord = DeclensionHelper.leftWord(daysLeft)
    
    const workWord = DeclensionHelper.workWord(businessDaysLeft)
    const workingDayWord = DeclensionHelper.daysWord(businessDaysLeft)
    const leftWorkingDayWord = DeclensionHelper.leftWord(businessDaysLeft)
    
    const leftWeekWord = DeclensionHelper.leftWeekWord(businessWeeksLeft)
    const workWeekWord = DeclensionHelper.workWeekWord(businessWeeksLeft)
    const weekWord = DeclensionHelper.weekWord(businessWeeksLeft)
    
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
