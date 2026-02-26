// import { CommonPath } from '@/Constant';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { ShoesCategorySlider } from '../../../Data/SliderSettingsData';
import { Link } from 'react-router-dom';
import useSlickResizeFix from '@/hooks/useSlickResizeFix';

const CategoryCard = ({ ShoesFilter }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const sliderRef = useRef(null);

  useSlickResizeFix(sliderRef, ShoesFilter.length);

  return (
    <div className='category-wrapper category-slider white-arrow'>
      <Slider ref={sliderRef} {...ShoesCategorySlider}>
        {ShoesFilter.map((el) => {
          return el.children.map((elem, i) => {
            return (
              <div key={i}>
                <div className='category-wrap category-color'>
                  <Link to='/shop'>
                    <img src={elem.image} className='img-fluid' alt='category image' />
                    <div className='category-content category-text t-text'>
                      <h3>{elem.title}</h3>
                      <span>
                        {symbol}
                        {elem.startingPrice * currencyValue} - {symbol}
                        {elem.endiginPrice * currencyValue}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          });
        })}
      </Slider>
    </div>
  );
};

export default CategoryCard;
