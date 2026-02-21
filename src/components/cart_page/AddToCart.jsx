import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const DELIVERY = 6.99;

/* Demo Payment Modal  */
const PaymentModal = ({ total, onClose, onSuccess }) => {
    const [step, setStep] = useState('form');
    const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '' });
    const [errors, setErrors] = useState({});

    const formatCard = (v) =>
        v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const formatExpiry = (v) =>
        v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (form.card.replace(/\s/g, '').length < 16) e.card = 'Enter a valid 16-digit card number';
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Enter expiry as MM/YY';
        if (form.cvv.length < 3) e.cvv = 'Enter a valid CVV';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setStep('processing');
        setTimeout(() => { setStep('success'); }, 2200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

                {/* Close */}
                {step !== 'processing' && (
                    <button
                        onClick={step === 'success' ? onSuccess : onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-[#232321] transition-colors z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/*FORM STEP */}
                {step === 'form' && (
                    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#232321]">Payment Details</h2>
                            <p className="text-sm text-gray-400 mt-1">This is a demo — no real charge will be made.</p>
                        </div>

                        {/* Card visual */}
                        <div className="rounded-2xl bg-gradient-to-br from-[#232321] to-[#4A69E2] text-white p-5 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold tracking-widest opacity-70">KICKS CARD</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" className="h-6 opacity-80">
                                    <circle cx="15" cy="12" r="10" fill="#eb001b" opacity="0.9"/>
                                    <circle cx="23" cy="12" r="10" fill="#f79e1b" opacity="0.9"/>
                                </svg>
                            </div>
                            <p className="text-lg font-mono tracking-widest">
                                {form.card || '•••• •••• •••• ••••'}
                            </p>
                            <div className="flex justify-between text-xs opacity-70">
                                <span>{form.name || 'CARD HOLDER'}</span>
                                <span>{form.expiry || 'MM/YY'}</span>
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-bold text-[#232321] uppercase tracking-wider">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A69E2] transition-colors"
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#232321] uppercase tracking-wider">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={form.card}
                                    onChange={(e) => { setForm({ ...form, card: formatCard(e.target.value) }); setErrors({ ...errors, card: '' }); }}
                                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#4A69E2] transition-colors"
                                />
                                {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-[#232321] uppercase tracking-wider">Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={form.expiry}
                                        onChange={(e) => { setForm({ ...form, expiry: formatExpiry(e.target.value) }); setErrors({ ...errors, expiry: '' }); }}
                                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#4A69E2] transition-colors"
                                    />
                                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-[#232321] uppercase tracking-wider">CVV</label>
                                    <input
                                        type="password"
                                        placeholder="•••"
                                        maxLength={4}
                                        value={form.cvv}
                                        onChange={(e) => { setForm({ ...form, cvv: e.target.value.replace(/\D/g, '') }); setErrors({ ...errors, cvv: '' }); }}
                                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#4A69E2] transition-colors"
                                    />
                                    {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#232321] hover:bg-[#3a3a38] transition-colors text-white font-extrabold py-4 rounded-xl tracking-widest text-sm"
                        >
                            PAY ${total.toFixed(2)}
                        </button>
                    </form>
                )}

                {/*  PROCESSING STEP  */}
                {step === 'processing' && (
                    <div className="p-12 flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full border-4 border-[#4A69E2] border-t-transparent animate-spin" />
                        <div className="text-center">
                            <h2 className="text-xl font-extrabold text-[#232321]">Processing Payment</h2>
                            <p className="text-sm text-gray-400 mt-1">Please wait…</p>
                        </div>
                    </div>
                )}

                {/* SUCCESS STEP */}
                {step === 'success' && (
                    <div className="p-10 flex flex-col items-center gap-5 text-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#232321]">Order Placed!</h2>
                            <p className="text-sm text-gray-400 mt-1">Your order has been confirmed. Thank you for shopping with Kicks!</p>
                        </div>
                        <p className="text-lg font-bold text-[#4A69E2]">${total.toFixed(2)} paid</p>
                        <button
                            onClick={onSuccess}
                            className="w-full bg-[#4A69E2] hover:bg-[#3555c8] transition-colors text-white font-extrabold py-4 rounded-xl text-sm tracking-widest"
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddToCart = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const total = cartItems.length > 0 ? subtotal + DELIVERY : 0;

    return (
        <section className="mx-4 sm:mx-16 lg:mx-32 py-10">
            {/* Top heading */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#232321] mb-2">Saving to celebrate</h1>
                <p className="text-sm text-gray-500 mb-1">
                    Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
                </p>
                <p className="text-sm text-[#232321]">
                    <button onClick={() => navigate('/')} className="underline font-semibold hover:text-[#4A69E2] transition-colors">Join us</button>
                    <span className="mx-1">or</span>
                    <button className="underline font-semibold hover:text-[#4A69E2] transition-colors">Sign-in</button>
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Your Bag*/}
                <div className="w-full lg:w-[60%] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-2xl font-extrabold text-[#232321] mb-1">Your Bag</h2>
                    <p className="text-sm text-gray-400 mb-6">Items in your bag not reserved — check out now to make them yours.</p>

                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center py-16 gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <p className="text-gray-400 font-medium">Your bag is empty</p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-[#4A69E2] hover:bg-[#3555c8] text-white font-bold px-6 py-3 rounded-xl text-sm tracking-wider transition-colors"
                            >
                                SHOP NOW
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-3 sm:gap-4 py-4 sm:py-5">
                                    {/* Image */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F7F7F7]">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col flex-1 gap-1 min-w-0">
                                        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-0.5">
                                            <h3 className="font-extrabold text-xs sm:text-sm uppercase text-[#232321] leading-tight">
                                                {item.name}
                                            </h3>
                                            <span className="font-bold text-[#4A69E2] text-sm sm:text-base whitespace-nowrap">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{item.color}</p>

                                        {/* Size & Quantity */}
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1.5">
                                                <span className="text-xs text-gray-500">Size</span>
                                                <span className="text-xs font-bold text-[#232321]">{item.size}</span>
                                            </div>
                                            <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#232321] font-bold text-base leading-none"
                                                >−</button>
                                                <span className="text-xs font-bold text-[#232321] w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#232321] font-bold text-base leading-none"
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-4 mt-2">
                                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[40%] p-4 sm:p-6 sticky top-24">
                    <h2 className="text-2xl font-extrabold text-[#232321] mb-6">Order Summary</h2>
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[#232321] uppercase tracking-wide">
                                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                            </span>
                            <span className="font-semibold text-[#232321]">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Delivery</span>
                            <span>{cartItems.length > 0 ? `$${DELIVERY.toFixed(2)}` : '-'}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Sales Tax</span>
                            <span>-</span>
                        </div>
                        <hr className="border-gray-100 my-1" />
                        <div className="flex justify-between text-base font-extrabold text-[#232321]">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        disabled={cartItems.length === 0}
                        onClick={() => setShowModal(true)}
                        className="mt-6 w-full bg-[#232321] hover:bg-[#3a3a38] disabled:opacity-40 transition-colors text-white font-bold py-4 rounded-xl text-sm tracking-widest"
                    >
                        CHECKOUT
                    </button>

                    <button className="mt-3 w-full text-center text-sm underline text-[#232321] hover:text-[#4A69E2] transition-colors">
                        Use a promo code
                    </button>
                </div>
            </div>

            {showModal && (
                <PaymentModal
                    total={total}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        clearCart();
                        setShowModal(false);
                        navigate('/');
                    }}
                />
            )}
        </section>
    );
};

export default AddToCart;
