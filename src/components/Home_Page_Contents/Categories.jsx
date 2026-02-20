import { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch categories');
                return res.json();
            })
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [retryCount]);

    const handlePrev = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setIndex((prev) => Math.min(prev + 1, categories.length - 2));
    };

    const visible = categories.slice(index, index + 2);

    return (
        <section className="bg-[#232321] pt-12 my-16 overflow-hidden">
            <div className="max-w-12xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 mb-8">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white">CATEGORIES</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={index === 0}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={index >= categories.length - 2}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Cards */}
                {loading ? (
                    <div className="flex gap-4 px-6 sm:px-8 lg:px-12">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex-1 h-96 rounded-2xl bg-white/10 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                        <p className="text-red-400 text-lg font-semibold mb-1">Failed to load categories</p>
                        <p className="text-white/40 text-sm mb-5">{error}</p>
                        <button
                            onClick={() => { setLoading(true); setError(null); setRetryCount((c) => c + 1); }}
                            className="px-6 py-2.5 bg-[#4A69E2] hover:bg-[#3555c8] text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-0 pt-6 pl-6 sm:pl-8 lg:pl-80 pr-0">
                        {visible.map((cat, i) => (
                            <div
                                key={cat.id}
                                className={`flex flex-col flex-1 overflow-hidden bg-[#f5f5f0] group ${index === 0 && i === 0 ? 'rounded-tl-[48px]' : ''}`}
                            > 
                                {/* Product image */}
                                <div className="h-[350px] sm:h-[500px] m-3 rounded-2xl overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Name + button below image */}
                                <div className="px-12 sm:px-40 py-4 flex items-center justify-between">
                                    <h3 className="text-2xl sm:text-4xl font-bold text-[#232321] uppercase leading-tight">
                                        {cat.name}
                                    </h3>
                                    <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#4A69E2] hover:bg-[#3555c8] transition-colors text-white flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;