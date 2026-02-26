import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { getCartItems } from '@/lib/storage/cartWishlistStorage';
import { Btn } from "@/components/AbstractElements";
import TotalPrice from './TotalPrice';
import Img from '@/components/Elements/Images';
import { CommonPath, EXAMPLECODE, Promocode, Redeem, Yourcart  } from '@/Constant';

const SideBarCartBox = () => {
  const cartState = useSelector((state) => state.AddToCartReducer);
  const quantity = cartState?.quantity || {};
  const items = getCartItems();
  const cartData = Array.isArray(items) ? items : [];

  return (
    <Col lg='4'>
      <div className='your-cart-box'>
        <h3 className='mb-3 d-flex text-capitalize'>
          {Yourcart}
          <span className='badge bg-theme new-badge rounded-pill ms-auto bg-dark'>{cartData?.length}</span>
        </h3>
        <ul className='list-group mb-3'>
          {Array.isArray(cartData) && cartData.length > 0 ? (
            cartData.map((elem) => (
              <li className='list-group-item list-group-item-1 lh-condensed' key={elem.id}>
                <div className='checkout-image'>
                  <Img src={`${CommonPath}/${elem.images?.[0]?.src || ''}`} className='img-fluid' />
                </div>
                <div>
                  <h6 className='my-0'>{elem.name}</h6>
                  <small>{elem.type}</small>
                </div>
                <span>
                  ${quantity[elem.id]?.qty && quantity[elem.id]?.qty > 1 ? quantity[elem.id]?.qty * quantity[elem.id]?.price : elem.price}
                </span>
              </li>
            ))
          ) : (
            <li className='list-group-item'>
              <p>No Data Found</p>
            </li>
          )}
        </ul>

        <div className='cart-box'>
          <div className='cart-box-details'>
            <div className='top-details p-3 bg-light rounded'>
              <h6 className='mb-2 text-muted'>{Promocode}</h6>
              <div className='d-flex justify-content-between align-items-center'>
                <small className='text-muted'>{EXAMPLECODE}</small>
                <span className='text-danger'>-$5</span>
              </div>
            </div>
            <div className='bottom-details p-3'>
              <TotalPrice cartData={cartData} />
              <div className='mt-3'>
                <Btn attrBtn={{ className: 'btn btn-solid-default w-100' }}>{Redeem}</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SideBarCartBox;

