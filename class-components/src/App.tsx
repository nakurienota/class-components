import './App.scss';
import { Routes, Route, NavLink } from 'react-router-dom';
import MainPage from './layout/main/MainPage.tsx';
import AboutPage from './layout/about/AboutPage.tsx';
import NotFoundPage from './layout/notfound/NotFoundPage.tsx';
import ErrorBoundary from './core/error/ErrorBoundary.tsx';

function App() {
  return (
    <div className="app">
      <nav className="app__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;