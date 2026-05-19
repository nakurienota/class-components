import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h1>Page not found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFoundPage;