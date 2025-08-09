//get sender 
export const getSender = (loggedUser,item) => {
  return item.users[0]._id === loggedUser._id ? item.users[1].name : item.users[0].name ;
}



export const isSameSender = (message, m, i,user) => {
  return (
      i < message.length - 1 &&
    message[i + 1].sender._id !== m.sender._id &&
    m.sender._id !== user
  );
};

// Show avatar if it's the last message and not sent by current user
export const isLastMessage = (message, i, user) => {
  return (
   message[i].sender._id !== user && (
      i === message.length - 1 ||
      message[i + 1].sender._id !== message[i].sender._id
   )
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  const isNotCurrentUser = messages[i].sender._id !== userId;

  // Case 1: Same sender continues, and it's not the current user
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    isNotCurrentUser
  ) {
    return 33;
  }

  // Case 2: New sender appears next OR it's the last message, and current user isn't the sender
  if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      isNotCurrentUser) ||
    (i === messages.length - 1 && isNotCurrentUser)
  ) {
    return 0;
  }

  // Default margin
  return "auto";
};



export const isSamUser = (message , m , i) => {
  return  i > 0 && message[i-1].sender._id === m.sender._id ;
}