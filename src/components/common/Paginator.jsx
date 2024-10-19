import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const Paginator = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={`cursor-pointer`}
                onClick={() => onPageChange(page)}
                disabled={page === currentPage}
                isActive={page === currentPage}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginator;
