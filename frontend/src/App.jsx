import './App.css'
import PasswordInput from './components/ui/PasswordInput'
import AppRoutes from './routes/AppRoutes'

function App() {
  

  return (
    <>
      <AppRoutes />
      <PasswordInput
      
      label="password"
      placeholder="Enter your password"
      />
    </>
  )
}

export default App
