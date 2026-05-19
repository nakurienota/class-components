import './App.scss';
import { NavLink, Route, Routes } from 'react-router-dom';
import MainPage from './layout/main/MainPage.tsx';
import AboutPage from './layout/about/AboutPage.tsx';
import NotFoundPage from './layout/notfound/NotFoundPage.tsx';
import ErrorBoundary from './core/error/ErrorBoundary.tsx';
import DetailsPage from './layout/details/Details.tsx';

function App() {
  return (
    <div className="app">
      <nav className="app__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="details/:name" element={<DetailsPage />} /> {/* ← дочерний роут */}
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;