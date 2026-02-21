import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const PAGE_SIZE = 8;

const filterLabels = {
    new_drops: "New Drops",
    men: "Men's Collection",
    women: "Women's Collection",
};

const getPageNumbers = (currentPage, totalPages) => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
};

const All_Items = () => {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || 'all';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch all products once
    useEffect(() => {
        setLoading(true);
        fetch('https://api.escuelajs.co/api/v1/products')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filter]);

    // Scroll to top on page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredProducts = products.filter((product) => {
        const catName = product.category?.name?.toLowerCase() || '';
        if (filter === 'new_drops') return true;
        if (filter === 'men') return catName.includes('men') && !catName.includes('women');
        if (filter === 'women') return catName.includes('women');
        return true;
    });

    // If filter is specific but returns no results, fall back to all
    const displayProducts =
        (filter === 'men' || filter === 'women') && filteredProducts.length === 0
            ? products
            : filteredProducts;

    const totalPages = Math.ceil(displayProducts.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visible = displayProducts.slice(start, start + PAGE_SIZE);
    const heading = filterLabels[filter] || 'All Products';
    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-8 pt-20 min-h-screen">
            {/* Heading */}
            <h2 className="text-3xl sm:text-6xl font-bold text-[#232321] mb-10 uppercase">
                {heading}
            </h2>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-32">
                    <div className="w-12 h-12 border-4 border-[#4A69E2] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {/* Products Grid */}
            {!loading && !error && (
                <>
                    {displayProducts.length === 0 ? (
                        <p className="text-center text-gray-500 py-20 text-lg">No products found.</p>
                    ) : (
                        <>
                            {/* Count */}
                            <p className="text-sm text-gray-500 mb-6">
                                Showing {start + 1}–{Math.min(start + PAGE_SIZE, displayProducts.length)} of {displayProducts.length} products
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {visible.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={{
                                            id: product.id,
                                            image: product.images?.[0],
                                            name: product.title,
                                            price: product.price,
                                            isNew: filter === 'new_drops',
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
                                    {/* Prev */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232321]/30 text-[#232321] disabled:opacity-30 hover:bg-[#232321]/10 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {pageNumbers.map((page, idx) =>
                                        page === '...' ? (
                                            <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">
                                                …
                                            </span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors text-sm ${
                                                    currentPage === page
                                                        ? 'bg-[#232321] text-white'
                                                        : 'border border-[#232321]/30 text-[#232321] hover:bg-[#232321]/10'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}

                                    {/* Next */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232321]/30 text-[#232321] disabled:opacity-30 hover:bg-[#232321]/10 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
};

export default All_Items;