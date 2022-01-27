import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

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
