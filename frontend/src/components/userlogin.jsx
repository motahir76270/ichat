import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

import Login from '../page/login'
import Signup from '../page/signup'

const Userlogin = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-200'>
<Tabs aria-label="Basic tabs" defaultValue={0}
 className='w-250 h-140 text-center'>
  <TabList className='justify-center gap-10 '>
    <Tab>Login </Tab>
    <Tab>Signup</Tab>
  </TabList>

  <TabPanel value={0}>
    <Login />
  </TabPanel>

  <TabPanel value={1}>
    <Signup />
  </TabPanel>

</Tabs>

    </div>
  )
}

export default Userlogin