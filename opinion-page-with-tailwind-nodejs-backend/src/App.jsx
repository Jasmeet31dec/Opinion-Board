import { Header } from './components/Header';
import { Opinions } from './components/Opinions';
import { NewOpinion } from './components/NewOpinion';
import { OpinionsContextProvider } from './store/opinions-context';

import { Fragment, useState } from 'react';
import Options from './components/security_components/Options';
import { UserProvider } from './store/userContext';
import { NotificationProvider } from './store/notification-context';
import Filtering from './components/Filtering';
import { createBrowserRouter } from 'react-router-dom';
import AuthenticationPage from './page/AuthenticationPage';
import ErrorPage from './page/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element : <AuthenticationPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'home', element: <HomePage />},
    ]
  }
]);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    
  );
}

export default App;
