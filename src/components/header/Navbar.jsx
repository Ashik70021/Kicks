import { useState } from 'react';

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="mx-4 sm:mx-8 bg-white shadow-sm sticky top-0 z-50 rounded-2xl">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Hamburger Menu (Mobile) & Menu Items (Desktop) */}
                    <div className="flex items-center space-x-8 flex-1">
                        {/* Hamburger Menu Button - Mobile Only */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-[#232321] hover:text-[#4A69E2] transition-colors"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                ) : (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M4 6h16M4 12h16M4 18h16" 
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Desktop Menu - Hidden on Mobile */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors">
                                New Drops
                            </a>
                            <a href="#" className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors">
                                Men
                            </a>
                            <a href="#" className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors">
                                Women
                            </a>
                        </div>
                    </div>

                    {/* Center - Logo */}
                    <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
                        <img 
                            src="/Images/Logo.png" 
                            alt="Logo" 
                            className="h-6 w-auto"
                        />
                    </div>

                    {/* Right side - Icons */}
                    <div className="flex items-center space-x-4 sm:space-x-6 flex-1 justify-end">
                        {/* Search Icon */}
                        <button className="text-[#232321] hover:text-[#4A69E2] transition-colors">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 sm:h-6 sm:w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                />
                            </svg>
                        </button>

                        {/* Profile Icon */}
                        <button className="text-[#232321] hover:text-[#4A69E2] transition-colors">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 sm:h-6 sm:w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                />
                            </svg>
                        </button>

                        {/* Cart Icon with Badge */}
                        <button className="relative text-[#232321] hover:text-[#4A69E2] transition-colors">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 sm:h-6 sm:w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                />
                            </svg>
                            {/* Yellow Badge with Cart Count */}
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#232321] text-xs font-semibold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3">
                            <a 
                                href="#" 
                                className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                New Drops
                            </a>
                            <a 
                                href="#" 
                                className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Men
                            </a>
                            <a 
                                href="#" 
                                className="text-[#232321] hover:text-[#4A69E2] font-medium transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Women
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;