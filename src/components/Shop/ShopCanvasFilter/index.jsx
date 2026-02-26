import useFilter from "@/Utils/useFilter";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import PaginationComp from "@/components/Elements/Pagination";
import AllProducts from "./AllProducts";
import FilterButton from "./FilterButton";
import FilterContent from "./FilterContent";
import ShopBannerDetails from "./ShopBannerDetails";

const ShopCanvasFilterContain = ({ productData, grid5 }) => {
  const filterProduct = useFilter(productData);
  const StoreProducts = filterProduct || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = StoreProducts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(StoreProducts.length / dataPerPage);

    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <section className="section-b-space">
      <Container>
        <Row>
          <Col lg="12" xs="12" className="ratio_30">
            <ShopBannerDetails />
            <FilterButton />
            <FilterContent grid5={grid5} productData={StoreProducts} />
            <AllProducts currentData={currentData} />
            <PaginationComp
              StoreProductLength={StoreProducts.length}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              paginate={paginate}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopCanvasFilterContain;
