import './App.css';
import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/User/Login';
import Edit from './components/User/Edit';
import Register from './components/User/Register';
import Sell from './components/Auction/Sell';
import Item from './components/Auction/Item';
import AuthService from "./components/services/auth.service";
import Detail from './components/Auction/Detail';
import Auctions from './components/Auction/Auctions';


function App() {
  const currentUser = AuthService.getCurrentUser();
  return (
    <Fragment>
      <div className="MainDiv">
            <Header 
            auth = {currentUser}
            />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/contacts" element={<Contacts />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/sell" 
                      element={<Sell />}
                    />
                    <Route path={`/item/:id`}
                      element={<Item/>}
                    />
                    <Route path="/edit" 
                      element={<Edit />}
                    />
                    <Route path="/register" element={<Register />}/>
                    <Route path={`/detail/:id`}
                      element={<Detail />}
                    />
                    <Route path="/auctions" element={<Auctions />}/>
                </Routes>
            <Footer />
        </div>
    </Fragment>
  );
}

export default App;
