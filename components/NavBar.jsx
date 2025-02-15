import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import PageLink from './PageLink'; // Assuming this is your custom link component
import Image from 'next/image';

const NavBar = () => {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(null);

  const handlePageChange = page => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <div className="nav-container" data-testid="navbar">
      <nav
        className={`text-sm px-5 w-full h-10 bg-pedals-yellow flex flex-row justify-between items-stretch font-nunito bg-deep-yellow`}>
        <div
          className={`h-full px-2 gap-2 flex items-center text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
            currentPage === '/recipe-book' ? 'bg-grey' : 'bg-transparent'
          }`}>
          <Image
            src="/bookmark.png"
            alt="Crying Image"
            width={20} // Set the desired width
            height={20} // Set the desired height
            className="object-contain"
          />
          <Link
            href="/recipe-book"
            className={`h-full flex items-center  text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
              currentPage === '/recipe-book' ? 'bg-grey' : 'bg-transparent'
            }`}
            onClick={() => handlePageChange('/recipe-book')}>
            Recipe Book
          </Link>
        </div>

        <div
          className={`h-full flex px-2 gap-2 items-center text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
            currentPage === '/' ? 'bg-grey' : 'bg-transparent'
          }`}>
          <Image
            src="/chef.png"
            alt="Crying Image"
            width={20} // Set the desired width
            height={20} // Set the desired height
            className="object-contain"
          />
          <Link
            href="/"
            className={`h-full flex items-center  text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
              currentPage === '/' ? 'bg-grey' : 'bg-transparent'
            }`}
            onClick={() => handlePageChange('/')}>
            Smartie Chef
          </Link>
        </div>

        <div
          className={`h-full flex items-center  text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
            currentPage === '/profile' ? 'bg-grey' : 'bg-transparent'
          }`}>
          {user ? (
            <div className='flex flex-row  px-2 gap-2'>
              <Image
                src="/profile.png"
                alt="Crying Image"
                width={20} // Set the desired width
                height={20} // Set the desired height
                className="object-contain"
              />
              <Link
                href="/profile"
                icon="user"
                testId="navbar-profile-desktop"
                className={`h-full flex items-center  text-deep-brown hover:text-gray-700 transition duration-300 text-pedals-brown ${
                  currentPage === '/profile' ? 'bg-grey' : 'bg-transparent'
                }`}
                onClick={() => handlePageChange('/profile')}>
                My Profile
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/login"
              className="h-full flex items-center px-4 bg-deep-brown text-white hover:bg-opacity-90 transition duration-300"
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
