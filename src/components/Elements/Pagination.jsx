import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

const PaginationComp = ({
  align = "center",
  dataPerPage = 10,
  StoreProductLength = 0,
  currentPage = 1,
  paginate,
}) => {
  const totalPages = Math.max(1, Math.ceil(StoreProductLength / dataPerPage));

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const showPrevious = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className={`shop-pagination d-flex justify-content-${align} mt-4`}>
      <Pagination className="mb-0">
        <PaginationItem disabled={!showPrevious}>
          <PaginationLink
            className="shop-page-arrow"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (showPrevious) {
                paginate(currentPage - 1);
              }
            }}
          >
            <ChevronLeft size={18} />
          </PaginationLink>
        </PaginationItem>
        {pages.map((pageNumber) => (
          <PaginationItem active={currentPage === pageNumber} key={pageNumber}>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault();
                paginate(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={!showNext}>
          <PaginationLink
            className="shop-page-arrow"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (showNext) {
                paginate(currentPage + 1);
              }
            }}
          >
            <ChevronRight size={18} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
