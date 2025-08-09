import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSamUser } from '../config/chatLogic';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const ScrollableChat = ({ message }) => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <ScrollableFeed className="px-2 h-60 pb-20 sm:px-4 md:px-6 lg:px-10 py-2  overflow-y-auto">
      {message.map((m, i) => {
        const isSender = m.sender._id === user._id;
        const showAvatar =
          isSameSender(message, m, i, user._id) || isLastMessage(message, i, user._id);

        return (
          <div
            key={i}
            className={`flex gap-2 items-end mt-1 ${isSender ? 'justify-end' : 'justify-start'}`}
          >
            {/* Show Avatar */}
            {!isSender && showAvatar && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar
                  src={m.sender.pic}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </Tooltip>
            )}

            {/* Message Bubble */}
            <div
              className={`rounded-3xl max-w-[75%] text-sm sm:text-base p-2 sm:p-3
                ${isSender ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              style={{
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSamUser(message, m, i) ? '2px' : '8px',
              }}
            >
              {m.content}
            </div>

            {/* Optionally show avatar for sender (right side) if needed */}
            {isSender && showAvatar && (
              <Tooltip title="You" placement="bottom-end" arrow>
                <Avatar
                  src={m.sender.pic}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </Tooltip>
            )}
          </div>
        );
      })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
