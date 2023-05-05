import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/user.context'
import { CalculatorProvider } from './contexts/calculator.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CalculatorProvider>
          <App />
        </CalculatorProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
