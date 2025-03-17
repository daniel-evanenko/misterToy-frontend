import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { ToyDetails } from './pages/ToyDetails.jsx';
import { ToyEdit } from './pages/ToyEdit.jsx';
import { AboutTeam } from './cmps/AboutTeam.jsx';
import { AboutVision } from './cmps/AboutVision.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { ConfirmModal } from './cmps/ConfirmModal.jsx';
import { UserDetails } from './cmps/UserDetails.jsx';
import './assets/style/App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}>
        <section className="app main-layout">
          <AppHeader />
          <main className='content-grid'>
            <Routes>
              <Route path="/" element={< Home />} />
              <Route path="/about" element={< About />}>
                <Route path="team" element={< AboutTeam />} />
                <Route path="vision" element={< AboutVision />} />
              </Route>
              <Route path="/toy" element={< ToyIndex />} />
              <Route path="/toy/:toyId" element={< ToyDetails />} />
              <Route path="/toy/edit" element={< ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={< ToyEdit />} />
              <Route path="/dashboard" element={< Dashboard />} />
              <Route path="/user" element={< UserDetails />} />
            </Routes>
          </main>
          <ConfirmModal />
        </section>
      </Router>
    </Provider>
  );
}

export default App;
