import reviews from '../../data/reviews.json';

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-sm font-medium text-[#232321] ml-1">{rating.toFixed(1)}</span>
        </div>
    );
};

const Reviews = () => {
    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-8">
            {/* Review Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#232321]">REVIEWS</h2>
                <button className="bg-[#4A69E2] hover:bg-[#3555c8] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-md">
                    SEE ALL
                </button>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm"
                    >
                        {/* Top: comments & profile */}
                        <div className="flex items-start justify-between px-5 pt-5 pb-4">
                            <div className="flex-1 pr-4">
                                <h3 className="text-base font-bold text-[#232321]">{review.comment}</h3>
                                <p className="text-sm text-gray-500 mt-1 leading-snug">{review.description}</p>
                                <StarRating rating={review.rating} />
                            </div>
                            <img
                                src={review.profilePic}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                        </div>

                        {/* Bottom: product image */}
                        <div className="w-full h-full">
                            <img
                                src={review.productImage}
                                alt="Product"
                                className="w-full h-76 object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;