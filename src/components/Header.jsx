import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Music,
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchModal } from './SearchModal';
import { CartDrawer } from './CartDrawer';
const magicalKeysLogo = '/images/webLogo.png';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { itemsCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Store', path: '/store' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        id="main-app-header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100/60 py-3 shadow-xs'
          : 'bg-white/70 backdrop-blur-xs py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo matching screenshot */}
          <Link
            to="/"
            id="brand-logo-link"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img src={magicalKeysLogo} alt="logo" className="w-10 h-10 object-contain rounded-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-[#637894] group-hover:text-slate-900 transition-colors">
                Magical Keys
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium leading-none">
                Raghu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-[#8598b0] hover:text-slate-900'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-[#8598b0] hover:text-slate-900'
                }`
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/store"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-[#8598b0] hover:text-slate-900'
                }`
              }
            >
              Store
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-[#8598b0] hover:text-slate-900'
                }`
              }
            >
              Articles
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-[#8598b0] hover:text-slate-900'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="header-search-button"
              className="p-2 text-[#8598b0] hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Search courses, blogs, products (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Icon with count badge */}
            <Link
              to="/dashboard?tab=wishlist"
              id="header-wishlist-button"
              className="relative p-2 text-[#8598b0] hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon with count badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="header-cart-button"
              className="relative p-2 text-[#8598b0] hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#7388a5] text-white text-[10px] font-bold flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown or Login Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  id="user-menu-button"
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                  <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate text-slate-700">
                    {user.name.split(' ')[0]}
                  </span>
                  {user.role === 'admin' && (
                    <span className="hidden sm:inline text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[#475e7d] text-white rounded">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#475e7d] bg-[#eef3f9] hover:bg-[#dfeaf6] transition-colors rounded-lg mx-2 my-1"
                      >
                        <Shield className="w-4 h-4 text-[#7388a5]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#7388a5]" />
                      <span>Student Dashboard</span>
                    </Link>

                    <Link
                      to="/dashboard?tab=courses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#7388a5]" />
                      <span>My Enrolled Courses</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                id="header-login-button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#7388a5] hover:bg-[#5f7491] text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-hamburger-toggle"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <Link
                to="/courses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 text-center bg-[#7388a5] text-white font-medium text-xs rounded-xl"
              >
                Explore Courses
              </Link>
              <Link
                to="/store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 text-center bg-slate-100 text-slate-700 font-medium text-xs rounded-xl border border-slate-200"
              >
                Digital Store
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Shopping Cart Drawer */}
      <CartDrawer />
    </>
  );
};
