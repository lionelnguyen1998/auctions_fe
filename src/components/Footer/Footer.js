import React, { Fragment } from 'react';
import {useTranslation} from 'react-i18next';

function Footer() {
    const {t} = useTranslation()
    return (
        <Fragment>
            <footer className="footer spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <ul>
                                <li><b style={{color: '#7FAD39'}}>{t('footer.address')}:</b> 2P Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội</li>
                                <li><b style={{color: '#7FAD39'}}>{t('footer.phone')}:</b> 1234567890</li>
                                <li><b style={{color: '#7FAD39'}}>{t('footer.email')}:</b> auctionsabcdef@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <div className="footer__widget__social">
                                <a href="https://www.facebook.com/profile.php?id=100013221032829" target="_blank" title="Facebook"><i className="fa fa-facebook"></i></a>
                                <a href="https://www.instagram.com/" target="_blank" title="Instagram"><i className="fa fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </Fragment>
    );
}

export default Footer;
