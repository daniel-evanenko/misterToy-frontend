import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './assets/style/App.scss';
const About = lazy(() => import('./pages/About.jsx'))
const ToyIndex = lazy(() => import('./pages/ToyIndex.jsx'))
const ToyDetails = lazy(() => import('./pages/ToyDetails.jsx'))
const ToyEdit = lazy(() => import('./pages/ToyEdit.jsx'))
const AboutTeam = lazy(() => import('./cmps/AboutTeam.jsx'))
const AboutVision = lazy(() => import('./cmps/AboutVision.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const UserDetails = lazy(() => import('./cmps/UserDetails.jsx'))

import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { ConfirmModal } from './cmps/ConfirmModal.jsx';

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
            <Suspense fallback={<div className='loader'></div>}>
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
            </Suspense>
          </main>
          <ConfirmModal />
        </section>
      </Router>
    </Provider>
  );
}

export default App;
