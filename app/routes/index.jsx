import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <h1>Welcome to AI CV Enhancer</h1>
      <p>Enhance and personalize your CV for specific job offers using AI.</p>
      <Link to="/upload">Get Started</Link>
    </div>
  );
}