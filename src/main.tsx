import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import keycloak from './keycloak';

keycloak
  .init({ onLoad: 'login-required',
    checkLoginIframe: false,
   })
  .then((authenticated) => {
    if (authenticated) {
      ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
    } else {
      window.location.reload();
    }
  })
  .catch((error) => {
    console.error('Keycloak init failed', error);
  });
