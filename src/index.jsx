import { createRoot } from 'react-dom/client';
import "./index.scss";

// Main component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds root
const container = document.querySelector("#root");
const root = createRoot(container);

// React render app in root DOM element
root.render(<MyFlixApplication />);