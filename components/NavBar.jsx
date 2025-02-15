import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import PageLink from './PageLink'; // Assuming this is your custom link component

const NavBar = () => {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(null); // Store the current page

  const handlePageChange = page => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <div className="nav-container" data-testid="navbar">
      <nav className="px-5 w-full h-10 bg-pedals-yellow flex flex-row justify-between items-center font-nunito bg-deep-yellow">
        <Link
          href="/recipe-book"
          className={`text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
            currentPage === '/recipe-book' ? 'bg-white' : 'bg-transparent'
          }`}
          onClick={() => handlePageChange('/recipe-book')} // Set current page on click
        >
          <div className="py-2 px-4 rounded">Recipe Book</div> {/* Added padding and rounded corners */}
        </Link>
        <Link
          href="/"
          className={`text-deep-brown hover:text-gray-700 font-bold text-xl transition duration-300 text-pedals-brown ${
            currentPage === '/' ? 'bg-white' : 'bg-transparent'
          }`}
          onClick={() => handlePageChange('/')} // Set current page on click
        >
          <div className="py-2 px-4 rounded">Smartie Chef</div> {/* Added padding and rounded corners */}
        </Link>

        <div className="flex items-center">
          {user ? (
            <Link
              href="/profile"
              icon="user"
              testId="navbar-profile-desktop"
              className={`text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
                currentPage === '/profile' ? 'bg-white' : 'bg-transparent'
              }`}
              onClick={() => handlePageChange('/profile')}>
              <div className="py-2 px-4 rounded">My Profile</div>
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="btn btn-primary btn-block"
              tabIndex={0}
              testId="navbar-login-mobile">
              Log in
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
{
  /* <PageLink href="/" className="nav-link" testId="navbar-home">
Home
</PageLink>
<AnchorLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-desktop">
                                                Log out
                                            </AnchorLink>
											<PageLink href="/profile" icon="user" testId="navbar-profile-desktop">
											Profile
										</PageLink> */
}
