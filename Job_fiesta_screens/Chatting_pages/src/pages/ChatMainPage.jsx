import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface1 from './ChatInterface1';
import ChatInterface2 from './ChatInterface2';

const ChatMainPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = React.useState(null);

  return (
    <div>
      {!selectedChat ? (
        <ChatInterface1 onSelectChat={(chat) => setSelectedChat(chat)} />
      ) : (
        <ChatInterface2 chat={selectedChat} onBack={() => setSelectedChat(null)} />
      )}
    </div>
  );
};

export default ChatMainPage; 