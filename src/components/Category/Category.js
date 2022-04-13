import React, { Fragment } from 'react';

function Category() {
    return (
        <Fragment>
            <section className="categories">
           <div className="container">
               <div className="row">
                   <div className="categories__slider owl-carousel">
                       <div className="col-lg-3">
                           <div className="categories__item set-bg" data-setbg="assets/img/categories/cat-1.jpg">
                               <h5><a href="#">categories1</a></h5>
                           </div>
                       </div>
                       <div className="col-lg-3">
                           <div className="categories__item set-bg" data-setbg="assets/img/categories/cat-2.jpg">
                               <h5><a href="#">categories2</a></h5>
                           </div>
                       </div>
                       <div className="col-lg-3">
                           <div className="categories__item set-bg" data-setbg="assets/img/categories/cat-3.jpg">
                               <h5><a href="#">categories3</a></h5>
                           </div>
                       </div>
                       <div className="col-lg-3">
                           <div className="categories__item set-bg" data-setbg="assets/img/categories/cat-4.jpg">
                               <h5><a href="#">categories4</a></h5>
                           </div>
                       </div>
                       <div className="col-lg-3">
                           <div className="categories__item set-bg" data-setbg="assets/img/categories/cat-5.jpg">
                               <h5><a href="#">categories5</a></h5>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
        </Fragment>
    )
}
export default Category;