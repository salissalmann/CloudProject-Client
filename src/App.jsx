import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import DynamoDB from './pages/DynamoDB'
function App() {
  return (
    <div className='bg-black'>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/dynamodb" exact element={<DynamoDB />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
