import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Transition } from '@tailwindui/react';
import DesktopSidebar from '@/components/sidebar/desktop';
import SearchBar from '@/components/headings/page/searchbar';

function SideBarLayout({ menuItems, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (!mobileOpen) return;

      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    }

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [mobileOpen]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex h-screen overflow-hidden bg-cool-gray-100">
        {/* Off-canvas menu for mobile */}
        <Transition show={mobileOpen} className="fixed inset-0 z-40 flex">
          {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {ref => (
              <div ref={ref} className="fixed inset-0">
                <div
                  aria-hidden="true"
                  onClick={() => setMobileOpen(false)}
                  className="absolute inset-0 opacity-75 bg-cool-gray-600"
                />
              </div>
            )}
          </Transition.Child>

          {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-teal-600"
          >
            <div className="absolute top-0 right-0 p-1 -mr-14">
              <Transition.Child
                className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
                aria-label="Close sidebar"
                as="button"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  className="w-6 h-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Transition.Child>
            </div>
            <div className="flex items-center flex-shrink-0 px-4">
              <svg
                className="h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Transition>

        {/* Static sidebar for desktop */}
        <DesktopSidebar menuItems={menuItems} />

        <div className="flex-1 overflow-auto focus:outline-none">
          <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-cool-gray-200 text-cool-gray-400 focus:outline-none focus:bg-cool-gray-100 focus:text-cool-gray-600 lg:hidden"
              aria-label="Open sidebar"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                className="w-6 h-6 transition duration-150 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {/* Heading page Search bar */}
            <SearchBar />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default SideBarLayout;
