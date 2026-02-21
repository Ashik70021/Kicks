import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { id, image, name, price, isNew } = product;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full group cursor-pointer">
            {/* Image */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                {/* New Tag */}
                {isNew && (
                    <span className="absolute top-0 left-0 z-10 bg-[#4A69E2] text-white text-xs font-bold px-4 py-2 rounded-tl-4xl rounded-br-3xl select-none">
                        New
                    </span>
                )}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Info — name and button */}
            <div className="mt-3 p-2 flex flex-col gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-sm sm:text-[24px] font-bold uppercase text-[#232321] leading-tight line-clamp-2 h-[40px] sm:h-[64px]">
                    {name}
                </h3>

                {/* Button */}
                <button
                    onClick={() => navigate(`/product/${id}`)}
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
