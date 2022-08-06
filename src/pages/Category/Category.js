import React, { Fragment, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import auctionApi from '../../components/api/auctionApi';
import {useTranslation} from 'react-i18next'

const responsive = {
    0: {
        items: 4
    }
};
function Category() {
    const [categories, setCategories] = useState([])
    const {t} = useTranslation();
    useEffect(() => {
        auctionApi.getListCategory()
            .then(res => {
                setCategories(res.data.data)
            })
    }, [])
    return (
        <Fragment>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="categories">
                    <div className="container">
                        <div className="section-title">
                            <h2>{t('category.list')}</h2>
                        </div>
                        <div className="row">
                            <AliceCarousel 
                            duration={400}
                            autoPlay={true}
                            startIndex = {1}
                            fadeOutAnimation={true}
                            mouseDragEnabled={true}
                            playButtonEnabled={true}
                            responsive={responsive}
                            autoPlayInterval={2000}
                            autoPlayDirection="rtl"
                            autoPlayActionDisabled={true}
                            >
                                {
                                    categories.map((category, index) => (
                                        <div key={index} className="categories__item set-bg" style={{ backgroundImage: `url(${category.image})`, marginRight: '20px' }}>
                                            <h5><Link to={`/auctionsByCategory/${category.category_id}`}>{category.name}</Link></h5>
                                        </div>
                                    ))
                                }
                            </AliceCarousel>
                        </div>
                    </div>
                </section>
            </Paper>
        </Fragment>
    )
}
export default Category;