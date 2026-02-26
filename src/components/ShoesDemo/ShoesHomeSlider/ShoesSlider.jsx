import { CommonPath, OFF } from "../../../constant/index";
import Slider from "react-slick";
import { ShoesMainSlider } from "../../../Data/SliderSettingsData";
import BottomSlider from "./BottomSlider";
import SuggestionBox from "./SuggestionBox";
import { Link } from "react-router-dom";
// Use anchor tags for external social links

const ShoesSlider = ({ ShoesMainFilter }) => {
  return (
    <Slider {...ShoesMainSlider}>
      {ShoesMainFilter?.map((el) => {
        return el?.slides?.map((elem, i) => {
          return (
            <div className="banner-poster" key={i}>
              <div className="slider-right-detail">
                <div className="labels">
                  {/* <ul className="label-15">
                            {elem.socialIcons.map((item, i) => {
                              return (
                                <li key={i}>
                                  <Link href={item.website}>
                                    <img
                                      src={item.iconImage}
                                      className="img-fluid"
                                      alt="facebook"
                                    />
                                    <h5 className="d-lg-block d-none">{item.name}</h5>
                                  </Link>
                                </li>
                              );
                            })}
                  </ul> */}
                </div>
                <h4>{elem.title}</h4>
                {elem.discount > 0 && (
                  <div className="offer-box">
                    <h6>
                      {elem.discount}% {OFF}
                    </h6>
                  </div>
                )}
              </div>
              <div className="slider-bg">
                <div className="bg-text z-1">
                  <span>{elem.leftProduct}</span>
                </div>
                <div className={`bg-circle ${elem.gradient}`}></div>
                <img
                  src={elem.bannerImage}
                  className="shoes-1 img-fluid z-2"
                  alt="circle"
                />
              </div>
              <SuggestionBox elem={elem} />
              <BottomSlider elem={elem} />
            </div>
          );
        });
      })}
    </Slider>
  );
};

export default ShoesSlider;


