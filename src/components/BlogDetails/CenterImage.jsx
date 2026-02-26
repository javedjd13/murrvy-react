import React from 'react';
import { CommonPath } from '@/constant';
import Img from '@/components/Elements/Images';

const CenterImage = ({ elem }) => {
  const hasImage = typeof elem?.image === 'string' && elem.image.trim().length > 0;

  return (
    <div className='blog-image-box'>
      {hasImage ? (
        <Img src={`${CommonPath}/${elem.image}`} alt='blogs' className='card-img-top' />
      ) : (
        <div
          className='card-img-top bg-light d-flex align-items-center justify-content-center'
          style={{ minHeight: '420px', color: '#1f1f1f', fontSize: 'clamp(32px, 6vw, 76px)', fontWeight: 300 }}
        >
          1288 x 600
        </div>
      )}
      <div className='blog-title'>
        <div>
          <div className='social-media media-center'>
            {elem.social.map((item) => {
              return (
                <a href={item.link} target='new' key={item.id}>
                  <div className='social-icon-box social-color'>
                    <i className={item.class}></i>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterImage;
