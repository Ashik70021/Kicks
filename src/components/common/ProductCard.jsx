const ProductCard = ({ product, onViewProduct }) => {
    const { image, name, price, isNew } = product;

    return (
        <div className="flex flex-col w-full">
            {/* Image — full width, 24px radius, 4px white stroke */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-md">
                {/* New Tag */}
                {isNew && (
                    <span className="absolute top-0 left-0 z-10 bg-[#4A69E2] text-white text-xs font-bold px-4 py-2 rounded-tl-4xl rounded-br-3xl select-none">
                        New
                    </span>
                )}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info — name and button */}
            <div className="mt-3 p-2 flex flex-col gap-3">
                <h3 className="text-sm sm:text-[24px] font-bold uppercase text-[#232321] leading-tight line-clamp-2 h-[40px] sm:h-[64px]">
                    {name}
                </h3>

                {/* Button */}
                <button
                    onClick={() => onViewProduct?.(product)}
                    className="w-full bg-[#232321] hover:bg-[#3a3a38] transition-colors text-white text-[10px] sm:text-sm  py-2 sm:py-3 px-2 sm:px-4 rounded-lg tracking-wide flex items-center justify-center gap-1 whitespace-nowrap"
                >
                    VIEW PRODUCT -{" "}
                    <span className="text-[#FFA52F]">${price}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
