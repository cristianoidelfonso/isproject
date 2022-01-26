import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Company from './components/pages/company';
import Contact from './components/pages/contact';
import Home from './components/pages/home';
import NewProject from './components/pages/newproject';
import Projects from './components/pages/projects';
import Project from './components/pages/project';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home /></Route>
          <Route path="/projects"><Projects /></Route>
          <Route path="/company"><Company /></Route>
          <Route path="/contact"><Contact /></Route>
          <Route path="/newproject"><NewProject /></Route>
          <Route path="/project/:id"><Project /></Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
