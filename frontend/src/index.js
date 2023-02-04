import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ThemeProvider from './components/context/ThemeProvider';
import NotificationProvider from './components/context/NotificationProvider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <NotificationProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NotificationProvider>
  </BrowserRouter>
);
