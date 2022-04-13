import React,{useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import Colors from './Colors'
import Sizes from './Sizes'
import DetailsThumb from './DetailsThumb'
import './detail.css'

export default function Detail() {
    const [products, setProducts] = useState([
        {
            "_id":"1",
             "title": "Wacth Product 01",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img1.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 101,
             "count": 1
         },
         {
             "_id": "2",
             "title": "Wacth Product 02",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img1.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 102,
             "count": 1

         },
         {
             "_id": "3",
             "title": "Wacth Product 03",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img1.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 103,
             "count": 1

         },
         {
             "_id": "4",
             "title": "Wacth Product 04",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img1.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 104,
             "count": 1

         },
         {
             "_id": "5",
             "title": "Wacth Product 05",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img5.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 105,
             "count": 1

         },
         {
             "_id": "6",
             "title": "Wacth Product 06",
             "images": [
                 "https://www.upsieutoc.com/images/2020/07/18/img6.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img2.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img3.jpg",
                 "https://www.upsieutoc.com/images/2020/07/18/img4.jpg"
                 ],
             "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
             "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
             "colors": ["red", "black", "teal"],
             "sizes": ["XL", "L", "M", "XM", "LX"],
             "price": 106,
             "count": 1

         }
    ])
    const {id} = useParams();
    
    const [index, setIndex] = useState(0)
    const imgDiv = useRef();

    // const details = products.filter((product, index) =>{
    //     return product._id === id
    // })

    const details = [
        {
            "_id": "6",
            "title": "Wacth Product 06",
            "images": [
                "https://cdn.tgdd.vn/Products/Images/42/236780/Slider/iphone-13mini-1020x570.jpg",
                "https://cdn.24h.com.vn/upload/1-2022/images/2022-02-20/iPhone-14-mat-toi-5-nam-deduoi-kip-Android-iphone-13-mini-vs-iphone-13-1645336342-493-width660height437.jpg",
                "https://i.ex-cdn.com/60giay.com/files/content/2022/04/04/iphone-13-1401.jpg",
                "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896092054.jpeg"
                ],
            "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
            "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
            "colors": ["red", "black", "teal"],
            "sizes": ["XL", "L", "M", "XM", "LX"],
            "price": 106,
            "count": 1

        }
    ]

    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }


    return (
        <>
           {
               details.map(product =>(
                   <div className="details" key={product._id}>
                       <div className="img-container" onMouseMove={handleMouseMove}
                       style={{backgroundImage: `url(${product.images[index]})`}} ref={imgDiv} 
                       onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`} />

                       <div className="box-details">
                           <h2 title={product.title}>{product.title}</h2>
                           <h3>${product.price}</h3>
                           <Colors colors={product.colors} />
                           <Sizes sizes={product.sizes} />
                           <p>{product.description}</p>
                           <p>{product.content}</p>
                           <DetailsThumb images={product.images} setIndex={setIndex} />
                       </div>

                   </div>
               ))
           }
        </>
    )
}
