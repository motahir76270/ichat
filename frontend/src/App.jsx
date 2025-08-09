import './App.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Userlogin from './components/userlogin'
import Ichat from './components/ichat'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <>  <Userlogin /> </> },
    { path: '/ichat', element: <>  <Ichat /> </> },

  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
