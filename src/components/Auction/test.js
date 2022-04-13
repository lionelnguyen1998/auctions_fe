import React from 'react';
import './detail.css';
import Colors from './Colors'
import DetailsThumb from './DetailsThumb';

class Detail extends React.Component{

  state = {
    products: [
      {
        "_id": "1",
        "title": "Nike Shoes",
        "src": [
            "https://cdn.tgdd.vn/Products/Images/42/236780/Slider/iphone-13mini-1020x570.jpg",
            "https://cdn.24h.com.vn/upload/1-2022/images/2022-02-20/iPhone-14-mat-toi-5-nam-deduoi-kip-Android-iphone-13-mini-vs-iphone-13-1645336342-493-width660height437.jpg",
            "https://i.ex-cdn.com/60giay.com/files/content/2022/04/04/iphone-13-1401.jpg",
            "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896092054.jpeg"
          ],
        "description": "UI/UX designing, html css tutorials",
        "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        "price": 23,
        "colors":["red","black","crimson","teal"],
        "count": 1
      }
    ],
    index: 0
  };

  myRef = React.createRef();

  handleTab = index =>{
    this.setState({index: index})
    const images = this.myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount(){
    const {index} = this.state;
    this.myRef.current.children[index].className = "active";
  }


  render(){
    const {products, index} = this.state;
    return(
      <div className="app">
        {
          products.map(item =>(
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.src[index]} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>${item.price}</span>
                </div>
                <Colors colors={item.colors} />

                <p>{item.description}</p>
                <p>{item.content}</p>

                <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                <button className="cart">Add to cart</button>

              </div>
            </div>
          ))
        }
      </div>
    );
  };
}

export default Detail;