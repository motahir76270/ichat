import './App.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Ichat from './components/ichat'
import Login from './page/login'
import Signup from './page/signup'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <>  <Login  /> </> },
    { path: '/signUp', element: <>  <Signup  /> </> },
    { path: '/ichat', element: <>  <Ichat /> </> },
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
