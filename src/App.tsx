import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AquariumPage from './pages/AquariumPage';
import ArticlesPage from './pages/ArticlesPage';
import MySongsPage from './pages/MySongsPage';

function App() {
  return (
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
  );
}

export default App;
