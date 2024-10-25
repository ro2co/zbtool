import React, { useEffect, useState } from 'react';

const Network = () => {
  const [requests, setRequests] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (message: MessageType, sender: any, sendResponse: any) => {
      console.log('Received message:', message);
      if (message.url) {
        setRequests(prevRequests => [...prevRequests, message.url]);
      }
    };

    // Replace 'window.addEventListener' with 'chrome.runtime.onMessage.addListener'
    chrome.runtime.onMessage.addListener(handleMessage);

    // Define a custom type for message if you know the structure, or use 'any' if it's unknown
    type MessageType = any;

    const onMessageListener = (message: MessageType, sender: any, sendResponse: any) => {
      console.log('Message received in network.tsx:', message);
      // ...处理接收到的消息...
    };

    chrome.runtime.onMessage.addListener(onMessageListener);

    return () => {
      // Replace 'window.removeEventListener' with 'chrome.runtime.onMessage.removeListener'
      chrome.runtime.onMessage.removeListener(handleMessage);
      // 移除监听器
      chrome.runtime.onMessage.removeListener(onMessageListener);
    };
  }, []);

  return (
    <div>
      <h3>Network Requests</h3>
      <ul>
        {requests.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </div>
  );
};

export default Network;
