import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Transition } from '@tailwindui/react';

export default function Home() {
  const nodeProfileIsOpen = useRef();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const handleClickOutsideProfile = e => {
    if (nodeProfileIsOpen.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setProfileIsOpen(false);
  };

  useEffect(() => {
    if (profileIsOpen) {
      document.addEventListener('mousedown', handleClickOutsideProfile);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, [profileIsOpen]);

  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession();
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;
  // If no session exists, display access denied message

  return (
    <>
      <Head>
        <title>Newsplaces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative  h-screen section-hero">
        <div className="hidden sm:block sm:absolute sm:inset-0">
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
            width="364"
            height="384"
            viewBox="0 0 364 384"
            fill="none"
          >
            <defs>
              <pattern
                id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="364" height="384" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
          </svg>
        </div>
        <div className="relative pt-6 pb-12 sm:pb-32">
          <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#" aria-label="Home">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                    alt="Logo"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                    id="main-menu"
                    aria-label="Main menu"
                    aria-haspopup="true"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                  >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="hidden space-x-10 md:flex md:ml-10">
                <Link href="/dashboard">
                  <a className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out">
                    Product
                  </a>
                </Link>
                <Link href="#">
                  <a
                    href="#"
                    className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
                  >
                    Features
                  </a>
                </Link>
              </div>
            </div>
            {!session && (
              <>
                <div className="hidden md:flex">
                  <a
                    href="/api/auth/signin"
                    onClick={e => {
                      e.preventDefault();
                      signIn();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-outt"
                  >
                    Connexion
                  </a>
                </div>
              </>
            )}
            {session && (
              <>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <div ref={nodeProfileIsOpen} className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        onClick={() => setProfileIsOpen(!profileIsOpen)}
                        aria-label="User menu"
                        aria-haspopup="true"
                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                        id="user-menu"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session.user.image}
                          alt="user avatar"
                        />
                      </button>
                    </div>
                    {/*
                    Profile dropdown panel, show/hide based on dropdown state.
                    For animated transitions, wrap the next element in this <Transition> component from https://gist.github.com/adamwathan/3b9f3ad1a285a2d1b482769aeb862467:
                  */}
                    <Transition
                      show={profileIsOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                        <div
                          className="py-1 rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <p className="block px-4 py-2 text-sm leading-5 text-gray-700">
                            {session.user.name}
                          </p>
                          <div className="border-t border-gray-100" />
                          <Link href="#">
                            <a
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                              role="menuitem"
                            >
                              Settings
                            </a>
                          </Link>
                          <a
                            href="/api/auth/signout"
                            onClick={e => {
                              e.preventDefault();
                              signOut();
                            }}
                            role="menuitem"
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                          >
                            Déconnexion
                          </a>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </>
            )}
          </nav>

          {/*
            Mobile menu, show/hide based on menu open state.

            For animated transitions, wrap the next element in this <Transition> component from https://gist.github.com/adamwathan/3b9f3ad1a285a2d1b482769aeb862467:
      <Transition
              show={isOpen}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            ></Transition>
          */}
          <Transition
            show={menuIsOpen}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-md">
                <div
                  className="rounded-lg bg-white shadow-xs overflow-hidden"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="main-menu"
                >
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        onClick={() => setMenuIsOpen(!menuIsOpen)}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        aria-label="Close menu"
                      >
                        <svg
                          className="h-6 w-6"
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
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    <Link href="/dashboard">
                      <a
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                        role="menuitem"
                      >
                        Product
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                        role="menuitem"
                      >
                        Features
                      </a>
                    </Link>
                  </div>
                  {!session && (
                    <>
                      <div>
                        <a
                          href="/api/auth/signin"
                          onClick={e => {
                            e.preventDefault();
                            signIn();
                          }}
                          className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
                          role="menuitem"
                        >
                          Connexion
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition>
          <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
                Data to enrich your <br className="xl:hidden" />
                <span className="text-indigo-600">online business</span>
              </h2>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-50 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
