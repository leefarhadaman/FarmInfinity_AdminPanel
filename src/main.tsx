import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import keycloak from './utils/keycloak.ts';
import { ReactKeycloakProvider } from '@react-keycloak/web';

createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider
  authClient={keycloak}
  initOptions={{ onLoad: "login-required" }} // ✅ this prevents infinite login loop
>
      <App />
    </ReactKeycloakProvider>
);
