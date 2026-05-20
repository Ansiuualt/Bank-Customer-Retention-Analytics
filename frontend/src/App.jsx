import { useApi } from './data/useApi'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import KpiStrip from './components/KpiStrip'
import Pipeline from './components/Pipeline'
import EngagementAnalysis from './components/EngagementAnalysis'
import ProductDepth from './components/ProductDepth'
import RsiFramework from './components/RsiFramework'
import DashboardModules from './components/DashboardModules'
import GeographicInsights from './components/GeographicInsights'
import TechStack from './components/TechStack'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const { kpis, engagementData, productDepthData, geoData, rsiData, pipelineStats, loading, error } = useApi()

  if (loading) return <div className="loading-screen">Loading analytics...</div>
  if (error) return <div className="error-screen">Error: {error}<br/>Ensure the FastAPI backend is running on port 8000.</div>

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '52px' }}> {/* offset for fixed navbar */}
        <Hero />
        <KpiStrip kpis={kpis} />
        <Pipeline pipelineStats={pipelineStats} />
        <EngagementAnalysis engagementData={engagementData} />
        <ProductDepth productDepthData={productDepthData} />
        <RsiFramework rsiData={rsiData} />
        <DashboardModules />
        <GeographicInsights geoData={geoData} />
        <TechStack />
        <About />
        <Footer />
      </main>
    </>
  )
}
