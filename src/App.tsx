import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CV } from './pages/CV';
import { DSVisualizerPage } from './pages/DSVisualizerPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/ds-visualizer" element={<DSVisualizerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
