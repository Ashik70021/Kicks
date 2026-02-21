import { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';

const PAGE_SIZE = 4;

const Also_Like_Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
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

    const handlePrev = () => setPage((p) => Math.max(0, p - PAGE_SIZE));
    const handleNext = () => setPage((p) => Math.min(products.length - PAGE_SIZE, p + PAGE_SIZE));

    const visible = products.slice(page, page + PAGE_SIZE);

    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-8 pt-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-[#232321]">YOU MAY ALSO LIKE</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#232321]/30 text-[#232321] disabled:opacity-30 hover:bg-[#232321]/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={page + PAGE_SIZE >= products.length}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#232321]/30 text-[#232321] disabled:opacity-30 hover:bg-[#232321]/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-[#4A69E2]"></span>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {/* Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {visible.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                image: product.images?.[0],
                                name: product.title,
                                price: product.price,
                                isNew: true,
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Also_Like_Products;