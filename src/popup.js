const bootstrap = () => {
  const svg = document.querySelector('#christmas-lights')
  
  svg.addEventListener('click', function popupHandler(event) {
    event.target.removeEventListener(event.type, popupHandler)
    alert('Welcome back, valyora! Не?')
  })
}

export const bootstrapPopup = () => {
  bootstrap()
}
