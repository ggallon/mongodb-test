import { useRef, useState, useEffect } from 'react';
import { Transition } from '@tailwindui/react';
import DesktopSidebarItem from '@/components/sidebar/desktop-item'
import dynamic from 'next/dynamic'
import IconMail from '@/components/icons/mail'
import IconCharBar from '@/components/icons/chart-bar'
import IconCalendar from '@/components/icons/calendar'

const iconsList = {
  IconHome: dynamic(() => import('@/components/icons/home')),
  IconLocationMarker: dynamic(() => import('@/components/icons/location-marker'))
}

function DesktopSidebar({ menuItems }) {
  const icons = menuItems.map((item) => iconsList[item.icon])
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
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-3 relative inline-block text-left" ref={nodeProfileIsOpen}>
              {/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
              <div>
                <button
                  type="button"
                  className="group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium hover:bg-gray-700 hover:text-gray-400 focus:outline-none focus:bg-gray-500 focus:border-blue-300 transition ease-in-out duration-150"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center justify-between space-x-3">
                      <svg
                        className="w-8 h-8 flex-shrink-0 text-white "
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
                      <div className="flex-1">
                        <h2 className="text-white text-lg leading-5 font-medium">Fabrication</h2>
                      </div>
                    </div>
                    {/* Heroicon name: selector */}
                    <svg
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-200"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              {/*
                Dropdown panel, show/hide based on dropdown state.

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
                className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg"
              >
                <div
                  className="rounded-md bg-white shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      Fabrication
                    </a>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="py-1">
                    <a
                      href="/places"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      Places
                    </a>
                  </div>
                </div>
              </Transition>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">

              {menuItems.map((item) => (
                <DesktopSidebarItem key={item.title} href={item.url}>
                  {icons.map(Icon => <Icon />)}
                  {item.title}
                </DesktopSidebarItem>
              ))}

              <DesktopSidebarItem href="#">
                <IconCalendar className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" />
                Calendrier
              </DesktopSidebarItem>
              <DesktopSidebarItem href="#">
                <IconMail className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" />
                Confirmation
              </DesktopSidebarItem>
              <DesktopSidebarItem href="#">
                <IconCharBar className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" />
                Rapport
              </DesktopSidebarItem>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
