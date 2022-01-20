import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Company from './components/pages/company';
import Contact from './components/pages/contact';
import Home from './components/pages/home';
import NewProject from './components/pages/newproject';
import Projects from './components/pages/projects';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home /></Route>
          <Route exact path="/projects"><Projects /></Route>
          <Route exact path="/company"><Company /></Route>
          <Route exact path="/contact"><Contact /></Route>
          <Route exact path="/newproject"><NewProject /></Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
