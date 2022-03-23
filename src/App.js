import { useEffect, useState } from 'react';
import './App.css';
import { GetToken, onMessageListener } from './firebase';

import { getMessaging, onMessage } from 'firebase/messaging';

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [token, setToken] = useState(null);

  useEffect(() => {
    handleToken();
  }, []);

  const handleToken = async () => {
    try {
      const token = await GetToken(setTokenFound);
      setToken(token);
      console.log({ token });
    } catch (error) {}
  };

  onMessageListener()
    .then((payload) => {
      //   setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <div className='App'>
      <p>{token}</p>
      <header className='App-header'>
        {isTokenFound ? (
          <h1> Notification permission enabled 👍🏻 </h1>
        ) : (
          <h1> Need notification permission ❗️ </h1>
        )}
      </header>
    </div>
  );
}

export default App;
