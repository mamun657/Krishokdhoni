import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DiseaseScan from './pages/DiseaseScan'
import CropRecommend from './pages/CropRecommend'
import Market from './pages/Market'
import VoiceAssistant from './pages/VoiceAssistant'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disease-scan" element={<DiseaseScan />} />
          <Route path="/crop-recommend" element={<CropRecommend />} />
          <Route path="/market" element={<Market />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App