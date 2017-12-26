class DeclensionHelper {
  static daysWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
    
    switch(lastDigit) {
      case '0':
        return 'дней'
      case '1':
        return 'день'
      case '2':
      case '3':
      case '4':
        return 'дня'
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'дней'
      default:
        return 'чет сломалось'
    }
  }
  
  static workWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
    
    switch(lastDigit) {
      case '1':
        return 'рабочий'
      case '0':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'рабочих'
      default:
        return 'чет сломалось'
    }
  }
  
  static workWeekWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
    
    switch(lastDigit) {
      case '1':
        return 'рабочая'
      case '0':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'рабочих'
      default:
        return 'чет сломалось'
    }
  }
  
  static leftWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
    
    switch(lastDigit) {
      case '1':
        return 'остался'
      case '0':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'осталось'
      default:
        return 'чет сломалось'
    }
  }
  
  static leftWeekWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
    
    switch(lastDigit) {
      case '1':
        return 'осталась'
      case '0':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'осталось'
      default:
        return 'чет сломалось'
    }
  }
  
  static weekWord = number => {
    const lastDigit = DeclensionHelper.lastDigit(number)
  
    switch(lastDigit) {
      case '0':
        return 'недель'
      case '1':
        return 'неделя'
      case '2':
      case '3':
      case '4':
        return 'недели'
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'недель'
      default:
        return 'чет сломалось'
    }
  }
  
  static lastDigit = number => {
    return number.toString().split('').pop()
  }
}

export default DeclensionHelper
