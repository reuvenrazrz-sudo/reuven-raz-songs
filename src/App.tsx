import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AquariumPage from './pages/AquariumPage';
import ArticlesPage from './pages/ArticlesPage';
import MySongsPage from './pages/MySongsPage';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/aquarium" element={<AquariumPage />} />
              <Route path="/my-songs" element={<MySongsPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>

      {/* Root Visitor Counter Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', width: '100%', background: 'transparent', zIndex: 9999 }}>
        <img 
          src="https://seeyoufarm.com" 
          alt="visitor counter" 
        />
      </div>
    </div>
  );
}


export default App;
