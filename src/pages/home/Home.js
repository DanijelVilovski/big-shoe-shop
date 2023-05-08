import React from 'react'
import './Home.css';

function Home() {
  return (
    <div className="main_container">
        <i className="fab fa-whatsapp"></i>     
        <div className="item_container">
            <img src="images/home1.jpg" className="home_img" alt="" />
        </div> 
        <div className="newbalance_container">
            <img src="images/home5.jpg" className="newbalance_img" alt="" />
            <div className="newbalance_text">
                <p className="newbalance_title">New Balance x Tedy Santis 990v2</p>
                <p className="newbalance_desc">A true representative of premium models of the New Balance brand made in the USA.</p>
            </div>
        </div> 
        <div className="hot_container">
            <img src="images/home4.png" className="hot_img" alt="" />
            <div className="hot_products">
                <div className="hot_product">
                    <img src="images/jordan-retro3.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
                <div className="hot_product">
                    <img src="images/jordan-retro3.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
                <div className="hot_product">
                    <img src="images/jordan-retro3.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
                <div className="hot_product">
                    <img src="images/jordan-retro3.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
            </div>
        </div>  
        <div className="y3_container">
            <div className="y3_products">
                <div className="y3_product">
                    <img src="images/y3_ajatu_run.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
                <div className="y3_product">
                    <img src="images/y3_terex.jpg" className="hot_product_img" alt=""/>
                    NIKE PATIKE AIR JORDAN 3 RETRO
                    28.399,00 RSD
                </div>
            </div>
            <img src="images/home3.jpg" className="y3_img" alt="" />
        </div>

        <div className="new_title">NEW ARRIVALS</div>
        
        <div className="new_container">
            <div className="new_product">
                <img src="images/y3_ajatu_run.jpg" className="hot_product_img" alt=""/>
                NIKE PATIKE AIR JORDAN 3 RETRO
                28.399,00 RSD
            </div>
            <div className="new_product">
                <img src="images/y3_terex.jpg" className="hot_product_img" alt=""/>
                NIKE PATIKE AIR JORDAN 3 RETRO
                28.399,00 RSD
            </div>
            <div className="new_product">
                <img src="images/y3_terex.jpg" className="hot_product_img" alt=""/>
                NIKE PATIKE AIR JORDAN 3 RETRO
                28.399,00 RSD
            </div>
            <div className="new_product">
                <img src="images/y3_terex.jpg" className="hot_product_img" alt=""/>
                NIKE PATIKE AIR JORDAN 3 RETRO
                28.399,00 RSD
            </div>
        </div>

        
    </div>
  );
}

export default Home;