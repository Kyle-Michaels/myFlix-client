import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

// Main component
const MyFlixApplication = () => {
  return (
    <Container style={{ border: "1px solid red" }}>
      <MainView />
    </Container>
  );
};

// Finds root
const container = document.querySelector("#root");
const root = createRoot(container);

// React render app in root DOM element
root.render(<MyFlixApplication />);