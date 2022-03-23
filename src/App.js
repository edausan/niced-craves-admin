import { useEffect, useState } from 'react';
import './App.css';
import { GetToken, onMessageListener, messaging } from './firebase';

import { getMessaging, onMessage } from 'firebase/messaging';

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const token = await GetToken(setTokenFound);
    console.log({ token });
  };

  useEffect(() => {
    // onMessageListener()
    //   .then((payload) => {
    //     setShow(true);
    //     setNotification({
    //       title: payload.notification.title,
    //       body: payload.notification.body,
    //     });
    //     console.log(payload);
    //   })
    //   .catch((err) => console.log('failed: ', err));
  }, []);

  return (
    <div className='App'>
      <strong className='mr-auto'>{notification.title}</strong>
      <p>{notification.body}</p>

      <header className='App-header'>
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <button onClick={() => setShow(true)}>Show Toast</button>
      </header>
    </div>
  );
}

export default App;
