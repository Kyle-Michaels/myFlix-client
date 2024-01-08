import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import "./index.scss";

// Main component
const MyFlixApplication = () => {
  return <MainView />;
};

// Finds root
const container = document.querySelector("#root");
const root = createRoot(container);

// React render app in root DOM element
root.render(<MyFlixApplication />);