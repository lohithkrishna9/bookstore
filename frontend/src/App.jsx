
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Createbook from './pages/createbook'
import Show from './pages/show'
import Editbook from './pages/editbook'
import Deletebook from './pages/deletebook'
import './index.css'; // or wherever your tailwind styles are

function App() {
  

  return (
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<Createbook/>}/>
      <Route path='/books/details/:id' element={<Show/>}/>
      <Route path='/books/edit/:id' element={<Editbook/>}/>
      <Route path='/books/delete/:id' element={<Deletebook/>}/>
    </Routes>
   
  )
}

export default App
