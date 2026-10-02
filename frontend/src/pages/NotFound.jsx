import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="container page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <SEO title="404 Not Found" />
      <h1 style={{ fontSize: '4rem' }}>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
    </div>
  );
}
