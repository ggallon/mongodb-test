import { useRef, useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { Transition } from '@tailwindui/react';
import IconChevronDown from '@/components/icons/chevron-down';

function SearchBar() {
  const [session, loading] = useSession();
  const nodeProfileIsOpen = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutsideProfile = e => {
    if (nodeProfileIsOpen.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideProfile);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, [isOpen]);

  return (
    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="search_field" className="sr-only">
            Rechercher
          </label>
          <div className="relative w-full text-cool-gray-400 focus-within:text-cool-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
            </div>
            <input
              id="search_field"
              className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-cool-gray-900 placeholder-cool-gray-500 focus:outline-none focus:placeholder-cool-gray-400 sm:text-sm"
              placeholder="Rechercher"
              type="search"
            />
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="p-1 text-cool-gray-400 rounded-full hover:bg-cool-gray-100 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline focus:text-cool-gray-500"
          aria-label="Notifications"
        >
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Profile dropdown */}
        <div className="ml-3 relative">
          <div ref={nodeProfileIsOpen}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:bg-cool-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-cool-gray-100"
              id="user-menu"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <img className="h-8 w-8 rounded-full" src={session.user.image} alt="" />
              <p className="hidden ml-3 text-cool-gray-700 text-sm leading-5 font-medium lg:block">
                {session.user.name}
              </p>
              {/* Heroicon name: chevron-down */}
              <IconChevronDown />
            </button>
          </div>
          {/*
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
          >
            <div
              className="py-1 rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-cool-gray-100 transition ease-in-out duration-150"
                role="menuitem"
              >
                Mon profile
              </a>

              <a
                href="/api/auth/signout"
                onClick={e => {
                  e.preventDefault();
                  signOut();
                }}
                className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-cool-gray-100 transition ease-in-out duration-150"
                role="menuitem"
              >
                Déconnexion
              </a>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
