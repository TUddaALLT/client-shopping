import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "60vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Slider = () => (
  <Carousel autoplay>
    <div>
      <img
        src='https://cdn0.fahasa.com/media/magentothem/banner7/Megasale_Mainbanner_Slide_840x320_1.jpg'
        width='100%'
        style={contentStyle}
      ></img>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
export default Slider;
