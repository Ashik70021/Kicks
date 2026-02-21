import { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';

const New_Drops = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-8 pt-20">
            {/* New Drops Header */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl sm:text-6xl font-bold text-[#232321]">
                    DON'T MISS OUT <br />NEW DROPS
                </h2>
                <button className="bg-[#4A69E2] hover:bg-[#3555c8] transition-colors text-white text-[11px] sm:text-sm font-semibold px-5 py-2.5 rounded-md">
                    SHOP NEW DROPS
                </button>
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

            {/* New Drops Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
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

export default New_Drops;