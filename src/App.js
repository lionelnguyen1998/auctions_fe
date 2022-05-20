import './App.css';
import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/User/Login';
import Edit from './components/User/Edit';
import ChangePass from './components/User/ChangePass';
import Register from './components/User/Register';
import Sell from './components/Auction/Sell';
import Item from './components/Auction/Item';
import AuthService from "./components/services/auth.service";
import Detail from './components/Auction/Detail';
import DetailWait from './components/Auction/DetailWait';
import Auctions from './components/Auction/Auctions';
import AuctionsK from './components/Auction/AuctionsK';
import Like from './components/Auction/Like';
import New from './components/News/New';
import ReadNew from './components/News/ReadNew';
import AuctionByCategory from './components/Auction/AuctionByCategory';
import AuctionByTypeCategory from './components/Auction/AuctionByTypeCategory';
import Notification from './components/Notification/Notification';
import ReadNotification from './components/Notification/ReadNotification';
import ListItem from './components/Auction/ListItem';
import EditAuction from './components/Auction/EditAuction';
import Chat from './components/Chat/Chat';


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
                    <Route path={`/detailwait/:id`}
                      element={<DetailWait />}
                    />
                    <Route path="/auctions" element={<Auctions />}/>
                    <Route path={`/auctions/:id`} element={<AuctionsK />}/>
                    {
                      currentUser && (
                        <Route path="/likes" element={<Like />}/>
                      )
                    }
                    <Route path="/notifications" element={<Notification />}/>
                    <Route path={`/notifications/:id`}
                      element={<ReadNotification />}
                    />
                    <Route path={`/auctionsByCategory/:id`} element={<AuctionByCategory />}/>
                    <Route path="/news" element={<New />}/>
                    <Route path={`/news/:id`}
                      element={<ReadNew />}
                    />
                    <Route path="/changepass" element={<ChangePass />}/>
                    <Route path={`/listItem/:id`} element={<ListItem />}/>
                    <Route path="/chat" element={<Chat />}/>
                    <Route path={`/auctionByTypeOfCategory/:id`} element={<AuctionByTypeCategory />}/>
                    <Route path={`/editAuction/:id`} element={<EditAuction />}/>
                </Routes>
            <Footer />
        </div>
    </Fragment>
  );
}

export default App;
