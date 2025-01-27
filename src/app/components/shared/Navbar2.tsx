"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaStore,
  FaBox,
  FaCog,
  FaShoppingCart,
  FaChartLine,
  FaHeadset,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaUsers,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "@/app/components/SearchBar";
import { useSession, signOut } from "next-auth/react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { data: session } = useSession();
  const router = useRouter();

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setMobileDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate role-based menu items
  const getRoleBasedMenus = () => {
    const baseMenus = {
      products: [
        { label: 'New Products', href: '/new', icon: FaBox },
        { label: 'Second Hand', href: '/secondhand', icon: FaBox },
        { label: 'Services', href: '/services', icon: FaBox },
        { label: 'Compare', href: '/compare', icon: FaChartLine },
      ],
      help: [
        { label: 'Help Center', href: '/help', icon: FaHeadset },
        { label: 'FAQ', href: '/faq', icon: FaQuestionCircle },
        { label: 'About Us', href: '/about', icon: FaInfoCircle },
      ],
      role: [] as MenuItem[]
    };

    // Add role-specific menu items based on user role
    if (session?.user?.role) {
      switch(session.user.role) {
        case 'admin':
          baseMenus.role = [
            { label: 'Admin Dashboard', href: '/admin/dashboard', icon: FaChartLine },
            { label: 'Manage Users', href: '/admin/users', icon: FaUsers },
            { label: 'Manage Products', href: '/admin/products', icon: FaBox },
            { label: 'Settings', href: '/admin/settings', icon: FaCog },
          ];
          break;
        case 'seller':
          baseMenus.role = [
            { label: 'Seller Dashboard', href: '/seller', icon: FaStore },
            { label: 'My Products', href: '/seller/products', icon: FaBox },
            { label: 'Orders', href: '/seller/orders', icon: FaShoppingCart },
            { label: 'Analytics', href: '/seller/analytics', icon: FaChartLine },
          ];
          break;
        case 'provider':
          baseMenus.role = [
            { label: 'Provider Dashboard', href: '/provider', icon: FaStore },
            { label: 'My Services', href: '/provider/services', icon: FaBox },
            { label: 'Bookings', href: '/provider/bookings', icon: FaCalendar },
            { label: 'Schedule', href: '/provider/schedule', icon: FaClock },
          ];
          break;
        case 'customer':
          baseMenus.role = [
            { label: 'My Profile', href: '/profile', icon: FaUser },
            { label: 'My Orders', href: '/profile/orders', icon: FaShoppingCart },
            { label: 'My Wishlist', href: '/wishlist', icon: FaHeart },
            { label: 'Settings', href: '/profile/settings', icon: FaCog },
          ];
          break;
      }
    }

    return baseMenus;
  };

  const menuItems = getRoleBasedMenus();

  const getDashboardLink = () => {
    const role = session?.user?.role;
    
    switch(role) {
      case 'admin':
        return { href: '/admin', label: 'Admin Dashboard' };
      case 'seller':
        return { href: '/seller', label: 'Seller Dashboard' };
      case 'provider':
        return { href: '/provider', label: 'Provider Dashboard' };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className="sticky top-0 z-[1000] bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Karachi<span className="text-gray-600">KART</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="nav-link">
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative group hover:cursor-pointer"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link flex items-center">
                Products <FaChevronDown className="ml-1" />
              </button>
              <div className={`absolute top-full left-0 transform ${activeDropdown === "products" ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-200`}>
                <DropdownMenu
                  items={menuItems.products}
                  isOpen={true}
                />
              </div>
            </div>

            {/* Support Dropdown */}
            <div
              className="relative group hover:cursor-pointer"
              onMouseEnter={() => setActiveDropdown("help")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link flex items-center">
                Support <FaChevronDown className="ml-1" />
              </button>
              <div className={`absolute top-full left-0 transform ${activeDropdown === "help" ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-200`}>
                <DropdownMenu
                  items={menuItems.help}
                  isOpen={true}
                />
              </div>
            </div>

            {/* Account Dropdown - Update this section */}
            {/* {session?.user && (
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("account")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-2">
                  <FaUser />
                  Account 
                  <FaChevronDown className="ml-1" />
                </button>
                <div 
                  className={`absolute top-full right-0 transform ${
                    activeDropdown === "account" ? "opacity-100 visible" : "opacity-0 invisible"
                  } transition-all duration-200 min-w-[200px]`}
                >
                  <div className="bg-white shadow-lg rounded-md py-2 mt-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
                      <p className="text-xs text-gray-400 mt-1">Role: {session.user.role}</p>
                    </div>

                    {menuItems.role.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
                      >
                        {item.icon && <item.icon/>}
                        {item.label}
                      </Link>
                    ))}

                    <div className="border-t border-gray-100 mt-2">
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaSearch className="h-5 w-5" />
            </button>

            {/* Desktop Search */}
            <div className="hidden lg:block w-64">
              <SearchBar />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
              <FaShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="relative text-gray-700 hover:text-gray-900">
              <FaHeart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Icon */}
            {session ? (
              <UserDropdown user={session.user} />
            ) : (
              <Link href="/auth/signin" className="nav-link">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden icon-button"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="lg:hidden pb-4">
            <SearchBar />
          </div>
        )}
      </div>

     {/* Mobile Menu */}
     {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">Products</div>
              {menuItems.products.map((item, index) => (
                <Link key={index} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 pl-6">
                  <span className="flex items-center">
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">Support</div>
              {menuItems.help.map((item, index) => (
                <Link key={index} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 pl-6">
                  <span className="flex items-center">
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {session && (
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-700">Account</div>
                {menuItems.role.map((item, index) => (
                  <Link key={index} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 pl-6">
                    <span className="flex items-center">
                      {item.icon && <item.icon />}
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Dropdown Component
const DropdownMenu = ({ items, isOpen }: { items: MenuItem[]; isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white shadow-lg rounded-md py-2 min-w-[200px] z-[1001] relative mt-2">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center px-4 py-2 text-base text-gray-700 gap-2 hover:bg-gray-50 whitespace-nowrap"
        >
              {item.icon && <item.icon />}
              {item.label}
        </Link>
      ))}
    </div>
  );
};

// Style classes
const navLink = "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium";
const iconButton = "text-gray-600 hover:text-gray-900 p-2 relative";
const badge = "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center";
const mobileNavLink = "block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-md";
const mobileNavSubLink = "block py-2 px-6 text-gray-500 hover:bg-gray-50 rounded-md text-sm";

// Update the UserDropdown component
const UserDropdown = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const getRoleBasedMenuItems = () => {
    const baseItems = [
      { label: 'Profile', href: '/profile', icon: FaUser },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...baseItems,
          { label: 'Admin Dashboard', href: '/admin/dashboard', icon: FaChartLine },
          { label: 'Seller Dashboard', href: '/seller', icon: FaStore },
          { label: 'Provider Dashboard', href: '/provider', icon: FaStore },
          { label: 'Settings', href: '/settings', icon: FaCog },
        ];
      case 'seller':
        return [
          ...baseItems,
          { label: 'Seller Dashboard', href: '/seller', icon: FaStore },
          { label: 'My Products', href: '/seller/products', icon: FaBox },
          { label: 'Orders', href: '/seller/orders', icon: FaShoppingCart },
          { label: 'Analytics', href: '/seller/analytics', icon: FaChartLine },
        ];
      case 'provider':
        return [
          ...baseItems,
          { label: 'Provider Dashboard', href: '/provider', icon: FaStore },
          { label: 'My Services', href: '/provider/services', icon: FaBox },
          { label: 'Bookings', href: '/provider/bookings', icon: FaCalendar },
          { label: 'Schedule', href: '/provider/schedule', icon: FaClock },
        ];
      default:
        return [
          ...baseItems,
          { label: 'My Orders', href: '/profile/orders', icon: FaShoppingCart },
          { label: 'My Wishlist', href: '/wishlist', icon: FaHeart },
          { label: 'Settings', href: '/profile/settings', icon: FaCog },
        ];
    }
  };

  const menuItems = getRoleBasedMenuItems();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: false
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <FaUser className="h-6 w-6" />
      </button>

      <div className={`absolute right-0 top-full transform ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-all duration-200 w-48 bg-white shadow-lg rounded-md py-2 mt-2 z-[1001]`}>
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
          <p className="text-xs text-gray-400 mt-1">Role: {user.role}</p>
        </div>

        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
            {item.label}
          </Link>
        ))}

        <div className="border-t border-gray-100 mt-2">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;