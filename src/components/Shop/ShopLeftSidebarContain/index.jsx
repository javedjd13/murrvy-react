import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import useFilter from "@/Utils/useFilter";
import PaginationComp from "@/components/Elements/Pagination";
import AllProducts from "../ShopCanvasFilter/AllProducts";
import FilterButton from "../ShopCanvasFilter/FilterButton";
import FilterContent from "../ShopCanvasFilter/FilterContent";
import ShopBannerDetails from "../ShopCanvasFilter/ShopBannerDetails";
import SidebarFilter from "./SidebarFilter";

const ShopLeftSidebarContain = ({ productData, listGrid }) => {
  const filterProduct = useFilter(productData);
  const StoreProducts = filterProduct || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
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
          <SidebarFilter productData={StoreProducts} />
          <Col lg="9" xs="12" className="ratio_30">
            <ShopBannerDetails />
            <FilterButton customClass={"filter-button mb-3"} />
            <FilterContent listGrid={listGrid} productData={StoreProducts} />
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

export default ShopLeftSidebarContain;
