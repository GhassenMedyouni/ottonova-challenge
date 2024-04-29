import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/HomePage/Home';
import CityList from './screens/CityList/CityList';
import CityDetail from './screens/CityDetail/CityDetail';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
      <Router>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cities" element={<CityList />} />
                <Route path="/Cities/:cityName" element={<CityDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
