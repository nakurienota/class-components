import { Link } from 'react-router-dom';
import './About.scss';

function AboutPage() {
  return (
    <div className="about">
      <h1>About page</h1>
      <Link to="https://github.com/nakurienota">nakurienota production</Link>
      <Link to="https://app.rs.school/course/student/dashboard?course=react-2026-q2">React RSSchool</Link>
      <Link to="/">Home</Link>
    </div>
  );
}

export default AboutPage;