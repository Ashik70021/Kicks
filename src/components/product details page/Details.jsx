import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const COLORS = [
    { name: 'Shadow Navy', hex: '#2C4A6E' },
    { name: 'Army Green', hex: '#4A5940' },
];

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addedMsg, setAddedMsg] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images?.[0],
            color: COLORS[selectedColor].name,
            size: selectedSize,
        });
        setAddedMsg(true);
        setTimeout(() => setAddedMsg(false), 2000);
    };

    const handleBuyNow = () => {
        if (!selectedSize) return;
        addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images?.[0],
            color: COLORS[selectedColor].name,
            size: selectedSize,
        });
        navigate('/cart');
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch product');
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    /* Ensure exactly 4 images */
    const getImages = (rawImages = []) => {
        const cleaned = rawImages
            .map((img) => {
                /* Some entries from this API are wrapped in ["url"] strings */
                if (typeof img === 'string') {
                    try {
                        const parsed = JSON.parse(img);
                        return Array.isArray(parsed) ? parsed[0] : img;
                    } catch {
                        return img;
                    }
                }
                return img;
            })
            .filter(Boolean);
        if (cleaned.length === 0) return Array(4).fill('https://placehold.co/600x600?text=No+Image');
        while (cleaned.length < 4) cleaned.push(cleaned[0]);
        return cleaned.slice(0, 4);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-[#4A69E2]"></span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-red-500 text-lg">{error || 'Product not found.'}</p>
            </div>
        );
    }

    const images = getImages(product.images);

    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-8 pt-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* LEFT — Image Gallery*/}
                <div className="w-full lg:w-1/2">

                    {/* MOBILE: main slider image */}
                    <div className="block lg:hidden">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-0 shadow-md bg-[#F7F7F7]">
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Dot indicators */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            selectedImage === idx
                                                ? 'bg-white scale-125'
                                                : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Mobile thumbnails */}
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                                        selectedImage === idx
                                            ? 'border-[#4A69E2] shadow-md'
                                            : 'border-transparent'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* DESKTOP: 2×2 grid */}
                    {(() => {
                        const cornerClasses = [
                            'rounded-tl-[48px]',   // top-left
                            'rounded-tr-[48px]',   // top-right
                            'rounded-bl-[48px]',   // bottom-left
                            'rounded-br-[48px]',   // bottom-right
                        ];
                        return (
                            <div className="hidden lg:grid grid-cols-2 gap-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`relative w-full aspect-square overflow-hidden border-0 shadow-md transition-all ${cornerClasses[idx]}`}>
                                        <img
                                            src={img}
                                            alt={`View ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        );
                    })()}
                </div>

                {/* RIGHT — Product Info */}
                <div className="w-full lg:w-1/2 flex flex-col gap-5">

                    {/* New Release badge */}
                    <span className="inline-flex w-fit bg-[#4A69E2] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                        New Release
                    </span>

                    {/* Name */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#232321] leading-tight">
                        {product.title}
                    </h1>

                    {/* Price */}
                    <p className="text-2xl font-bold text-[#4A69E2]">
                        ${product.price?.toFixed(2)}
                    </p>

                    {/* Color */}
                    <div>
                        <p className="text-xs font-bold uppercase text-[#232321] tracking-widest mb-2">Color</p>
                        <div className="flex gap-3">
                            {COLORS.map((color, idx) => (
                                <button
                                    key={idx}
                                    title={color.name}
                                    onClick={() => setSelectedColor(idx)}
                                    style={{ backgroundColor: color.hex }}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                                        selectedColor === idx
                                            ? 'border-[#232321] ring-2 ring-[#232321] ring-offset-2'
                                            : 'border-white shadow'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {COLORS.map((c) => c.name).join(' / ')}
                        </p>
                    </div>

                    {/* Size */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold uppercase text-[#232321] tracking-widest">Size</p>
                            <button className="text-xs font-semibold underline text-[#232321] hover:text-[#4A69E2] transition-colors">
                                SIZE CHART
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SIZES.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-10 rounded-lg text-sm font-semibold border transition-all ${
                                        selectedSize === size
                                            ? 'bg-[#232321] text-white border-[#232321]'
                                            : 'bg-white text-[#232321] border-gray-300 hover:border-[#232321]'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    {!selectedSize && (
                        <p className="text-xs text-red-500 -mb-2">Please select a size to continue.</p>
                    )}
                    <div className="flex gap-3 mt-1">
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSize}
                            className="flex-1 bg-[#232321] hover:bg-[#3a3a38] disabled:opacity-40 transition-colors text-white font-bold py-3.5 rounded-xl text-sm tracking-wider"
                        >
                            {addedMsg ? '✓ ADDED!' : 'ADD TO CART'}
                        </button>
                        <button className="bg-[#232321] w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-300 hover:border-[#3555c8] hover:text-[#3555c8] transition-colors text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={handleBuyNow}
                        disabled={!selectedSize}
                        className="w-full bg-[#4A69E2] hover:bg-[#3555c8] disabled:opacity-40 transition-colors text-white font-bold py-3.5 rounded-xl text-sm tracking-wider"
                    >
                        BUY IT NOW
                    </button>

                    {/* About the product */}
                    <div>
                        <p className="text-sm font-bold uppercase text-[#232321] tracking-widest mb-2">
                            About the product
                        </p>
                        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                            {COLORS[selectedColor].name}
                        </p>
                        {product.description && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                {product.description}
                            </p>
                        )}
                        <ul className="text-sm text-gray-600 space-y-1.5 list-none">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                                Pay over time in interest-free installments with Affirm, Klarna or Afterpay.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                                Join adiClub to get unlimited free standard shipping, returns, &amp; exchanges.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;