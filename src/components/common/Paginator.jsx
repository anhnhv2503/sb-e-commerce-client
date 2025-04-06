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
                className={`cursor-pointer transition-all ${
                  page === currentPage
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "hover:bg-gray-100"
                }`}
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
