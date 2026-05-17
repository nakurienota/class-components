import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>Not found page</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFoundPage;