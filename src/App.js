import './App.css';
import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/User/Login';
import Edit from './pages/User/Edit';
import ChangePass from './pages/User/ChangePass';
import Register from './pages/User/Register';
import Sell from './components/Auction/Sell';
import Item from './pages/Item/Item';
import AuthService from "./components/services/auth.service";
import Detail from './components/Auction/Detail';
import DetailWait from './components/Auction/DetailWait';
import Auctions from './components/Auction/Auctions';
import AuctionsK from './components/Auction/AuctionsK';
import Like from './components/Like/Like';
import New from './pages/News/New';
import ReadNew from './pages/News/ReadNew';
import AuctionByCategory from './components/Category/AuctionByCategory';
import AuctionByTypeCategory from './components/Category/AuctionByTypeCategory';
import Notification from './pages/Notification/Notification';
import ReadNotification from './pages/Notification/ReadNotification';
import ListItem from './pages/Item/ListItem';
import EditAuction from './components/Auction/EditAuction';
import Chat from './components/Chat/Chat';
import EditItem from './pages/Item/EditItem';
import NotFound from './components/NotFound/NotFound';
import { useTranslation } from 'react-i18next';
import { Button } from "@mui/material";
import Flag from 'react-world-flags'

function App() {
  const currentUser = AuthService.getCurrentUser();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  return (
    <Fragment>
      <div className="MainDiv">
      
          <Button style={{float:"right"}} onClick={() => changeLanguage('jp')}><Flag code="jp" height="20" style={{border:"solid 1px #ccc"}}/></Button>
          <Button style={{float:"right"}} onClick={() => changeLanguage('vi')}><Flag code="vn" height="20" /></Button>
            <Header 
            auth = {currentUser}
            />
                <Routes>
                    <Route path="/" element={<HomePage t={t}/>}/>
                    <Route path="/contacts" element={<Contacts t={t}/>}/>
                    <Route path="/login" element={<Login  t={t}/>}/>
                    <Route path="/notfound" element={<NotFound />}/>
                    <Route path="/sell" 
                      element={<Sell />}
                    />
                    <Route path={`/item/:id`}
                      element={<Item/>}
                    />
                    <Route path="/edit" 
                      element={<Edit t={t}/>}
                    />
                    <Route path="/register" element={<Register  t={t}/>}/>
                    <Route path={`/detail/:id`}
                      element={<Detail t={t}/>}
                    />
                    <Route path={`/detailwait/:id`}
                      element={<DetailWait t={t}/>}
                    />
                    <Route path="/auctions" element={<Auctions t={t}/>}/>
                    <Route path={`/auctions/:id`} element={<AuctionsK  t={t}/>}/>
                    {
                      currentUser && (
                        <Route path="/likes" element={<Like t={t}/>}/>
                      )
                    }
                    <Route path="/notifications" element={<Notification t={t}/>}/>
                    <Route path={`/notifications/:id`}
                      element={<ReadNotification t={t}/>}
                    />
                    <Route path={`/auctionsByCategory/:id`} element={<AuctionByCategory t={t}/>}/>
                    <Route path="/news" element={<New />}/>
                    <Route path={`/news/:id`}
                      element={<ReadNew />}
                    />
                    <Route path="/changepass" element={<ChangePass  t={t}/>}/>
                    <Route path={`/listItem/:id`} element={<ListItem t={t}/>}/>
                    <Route path="/chat" element={<Chat t={t}/>}/>
                    <Route path={`/auctionByTypeOfCategory/:id`} element={<AuctionByTypeCategory t={t}/>}/>
                    <Route path={`/editAuction/:id`} element={<EditAuction t={t}/>}/>
                    <Route path={`/editItem/:item_id/:auction_id`} element={<EditItem t={t}/>}/>
                </Routes>
            <Footer />
        </div>
    </Fragment>
  );
}

export default App;
