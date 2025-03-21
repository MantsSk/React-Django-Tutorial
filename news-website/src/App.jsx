import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className = "App">
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<ArticleList/>} />
            <Route path="/articles/:id" element={<ArticleDetail/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
