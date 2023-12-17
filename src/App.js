import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
// import NewsItem from './components/NewsItem';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";


const App = (props) => {
  const pageSize = 5
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  // setProgress = (progress) => {
  //   setProgress({ progress: progress})
  // }
  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        {/* <News setProgress = {setProgress} apiKey = {apiKey}  pageSize = {3} country = "us" category = "general"/> */}
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={props.pageSize} country="us" category="general" />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={props.pageSize} country="us" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={props.pageSize} country="us" category="entertainment" />}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={props.pageSize} country="us" category="general" />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={props.pageSize} country="us" category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={props.pageSize} country="us" category="science" />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={props.pageSize} country="us" category="sports" />}></Route>
        </Routes>
      </div>
    </Router>
  )


}

export default App