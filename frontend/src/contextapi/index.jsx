import { createContext, useState, useEffect ,useCallback} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [selectedChat,setSelectedChat] = useState([]);
    const [chats,setChats] = useState([]);
    const [myChatUser , setMyChatUser] = useState('');
    const [ selectUserChat , setSelectUserChat ] = useState() 
    // const [ notification , setNotification ] = useState([]) 

    
    

    return (
        <UserContext.Provider value={{user, setUser,chats,setChats ,selectedChat,setSelectedChat, myChatUser , setMyChatUser,selectUserChat , setSelectUserChat}}>
        {children}
        </UserContext.Provider>
    ); 
}