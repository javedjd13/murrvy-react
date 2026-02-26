import { CommonPath } from "@/constant";
import { ProductNavModalSlider, ProductPosterModalSlider } from "@/Data/SliderSettingsData";
import { IS_MODAL } from "@/ReduxToolkit/Reducers/ModalReducer";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Img from "./Images";
import ModalProductDetails from "./ModalProductDetails";

const resolveModalImageSrc = (value) => {
  if (!value || typeof value !== "string") {
    return `${CommonPath}/shoes/product/1.jpg`;
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("/")) {
    return value;
  }

  return `${CommonPath}/${value}`;
};

const CommonModel = () => {
  const dispatch = useDispatch();
  const { modal, data } = useSelector((state) => state.ModalReducer);
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const { nav1, nav2 } = state;

  const toggle = () => {
    dispatch(IS_MODAL({ isOpen: false }));
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const modalImages = useMemo(() => {
    const sourceImages = Array.isArray(data?.images) ? data.images : [];
    const normalizedImages = sourceImages
      .map((item) => (typeof item === "string" ? item : item?.src))
      .filter(Boolean);

    if (!normalizedImages.length) {
      return [`${CommonPath}/shoes/product/1.jpg`];
    }

    return normalizedImages;
  }, [data]);

  const navSlidesToShow = Math.min(Math.max(modalImages.length, 1), 4);

  return (
    <Modal
      size="lg"
      centered={true}
      className="quick-view-modal modal-dialog modal-dialog-scrollable"
      id="quick-view"
      isOpen={modal}
      toggle={toggle}
      fade={false}
    >
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <Row className="gy-4">
          <Col lg="6">
            <div className="quick-view-image">
              <div className="quick-view-slider ratio_2">
                <Slider {...ProductPosterModalSlider} asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
                  {modalImages.map((item, i) => (
                    <div key={`${data?.id || "modal"}-${i}`} className="bg-size">
                      <Img src={resolveModalImageSrc(item)} className="img-fluid bg-img" alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="quick-nav">
                <Slider {...ProductNavModalSlider} slidesToShow={navSlidesToShow} asNavFor={nav1} ref={(slider) => (slider2.current = slider)}>
                  {modalImages.map((item, i) => (
                    <div key={`${data?.id || "modal-nav"}-${i}`}>
                      <Img src={resolveModalImageSrc(item)} className="img-fluid" alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Col>
          <ModalProductDetails data={data} />
        </Row>
      </ModalBody>
    </Modal>
  );
};
export default CommonModel;
