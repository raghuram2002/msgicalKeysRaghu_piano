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
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchModal } from './SearchModal';
import { CartDrawer } from './CartDrawer';
const magicalKeysLogo = '/images/magicalKeysLogo.png';

export const Header: React.FC = () => {
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
          ? 'bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#202432] py-3.5 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/50 to-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            id="brand-logo-link"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img src={magicalKeysLogo} alt="logo" className="w-15 h-15" />
            <div>
              <span className="font-editorial text-xl font-normal tracking-wide text-white group-hover:text-amber-300 transition-colors">
                MAGICAL KEYS
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-medium leading-none">
                Raghu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                id={`nav-link-${link.name.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 font-semibold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="header-search-button"
              className="p-2 text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
              title="Search courses, blogs, products (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Icon with count badge */}
            <Link
              to="/dashboard?tab=wishlist"
              id="header-wishlist-button"
              className="relative p-2 text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
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
              className="relative p-2 text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center">
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
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-[#171a24] hover:bg-[#202534] border border-[#2b3040] rounded-xl text-zinc-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-amber-400/40"
                  />
                  <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                {isUserMenuOpen && (
                  <div
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-52 bg-[#12141c] border border-[#262b3a] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 py-2 border-b border-[#202432]">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/60 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-400" />
                      <span>Student Dashboard</span>
                    </Link>

                    <Link
                      to="/dashboard?tab=courses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/60 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>My Enrolled Courses</span>
                    </Link>

                    <div className="border-t border-[#202432] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
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
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/10 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-hamburger-toggle"
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden bg-[#0e1017] border-b border-[#242834] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#202432] flex gap-2">
              <Link
                to="/courses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 text-center bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl"
              >
                Explore Courses
              </Link>
              <Link
                to="/store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 text-center bg-[#171a24] text-zinc-300 font-semibold text-xs rounded-xl border border-[#282d3d]"
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
