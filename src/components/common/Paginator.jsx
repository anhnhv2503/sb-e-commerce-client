/**
 * Paginator — square 4px page buttons; the current page is filled brand pink.
 */
const Paginator = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <nav aria-label="pagination" className="flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isActive}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded font-mono text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                  isActive
                    ? "bg-brand-pink text-white"
                    : "border border-hairline text-brand-ink hover:border-brand-ink"
                }`}
              >
                {page + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginator;
