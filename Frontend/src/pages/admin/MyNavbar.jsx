import React, { useState} from 'react';


const MyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/admin', label: 'Home' },
    { href: '/admin/about', label: 'About' },
    { href: '/admin/project', label: 'Project' },
    { href: '/admin/contact', label: 'Contact' },
    { href: '/login', label: 'Log out' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="ml-2 text-lg font-semibold text-gray-800">Woodland Rovers</span>
            <span className="ml-2 text-lg font-semibold text-red-900">Admin</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href} 
                href={href} 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ href, label }) => (
               <a 
                  key={href}
                  href={href}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MyNavbar;