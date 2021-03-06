import { useSession } from 'next-auth/client';
import AccessDenied from '@/components/access-denied';
import SidebarLayout from '@/components/layout/sidebar';
import { Card, CardBody, CardFooter } from '@/components/card';
import IconHome from '@/components/icons/home';
import IconCalendar from '@/components/icons/calendar';
import IconMail from '@/components/icons/mail';
import IconChartBar from '@/components/icons/chart-bar';

const menuItems = [
  { title: 'Dashboard', url: '/production', icon: IconHome },
  { title: 'Calendrier', url: '/production/calendar', icon: IconCalendar },
  { title: 'Confirmation', url: '/production/confirmation', icon: IconMail },
  { title: 'Rapport', url: '/production/repport', icon: IconChartBar }
];

function ProductionDashboardPage() {
  const [session, loading] = useSession();
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;
  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <SidebarLayout menuItems={menuItems}>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-cool-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  <img
                    className="hidden h-15 w-15 rounded-full sm:block"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-15 w-15 rounded-full sm:hidden"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">
                        Good morning, Emilia Birch
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm leading-5 text-cool-gray-500 font-medium capitalize sm:mr-6">
                        {/* Heroicon name: office-building */}
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Duke street studio
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm leading-5 text-cool-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        {/* Heroicon name: check-circle */}
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified account
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <span className="shadow-sm rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50 transition duration-150 ease-in-out"
                  >
                    Add money
                  </button>
                </span>
                <span className="shadow-sm rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
                  >
                    Send money
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-cool-gray-900">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}

              <Card>
                <CardBody>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* Heroicon name: scale */}
                      <svg
                        className="h-6 w-6 text-cool-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                          Account balance
                        </dt>
                        <dd>
                          <div className="text-lg leading-7 font-medium text-cool-gray-900">
                            $30,659.45
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardBody>
                <CardFooter bgray>
                  <div className="text-sm leading-5">
                    <a
                      href="/"
                      className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
                    >
                      View all
                    </a>
                  </div>
                </CardFooter>
              </Card>

              {/* More cards... */}
            </div>
          </div>

          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-cool-gray-900 sm:px-6 lg:px-8">
            Recent activity
          </h2>

          {/* Activity list (smallest breakopoint only) */}
          <div className="shadow sm:hidden">
            <ul className="mt-2 divide-y divide-cool-gray-200 overflow-hidden shadow sm:hidden">
              <li>
                <a href="/" className="block px-4 py-4 bg-white hover:bg-cool-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 flex space-x-2 truncate">
                      {/* Heroicon name: cash */}
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-cool-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="text-cool-gray-500 text-sm truncate">
                        <p className="truncate">Payment to Molly Sanders</p>
                        <p>
                          <span className="text-cool-gray-900 font-medium">$20,000</span> USD
                        </p>
                        <p>July 11, 2020</p>
                      </div>
                    </div>
                    <div>
                      {/* Heroicon name: chevron-right */}
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-cool-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>

              {/* More items... */}
            </ul>
            <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200">
              <div className="flex-1 flex justify-between">
                <a
                  href="/"
                  className="relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
                >
                  Previous
                </a>
                <a
                  href="/"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>

          {/* Activity table (small breakopoint and up) */}
          <div className="hidden sm:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-cool-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="hidden px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider md:block">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-cool-gray-200">
                      <tr className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-900">
                          <div className="flex">
                            <a
                              href="/"
                              className="group inline-flex space-x-2 truncate text-sm leading-5"
                            >
                              {/* Heroicon name: cash */}
                              <svg
                                className="flex-shrink-0 h-5 w-5 text-cool-gray-400 group-hover:text-cool-gray-500 transition ease-in-out duration-150"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="text-cool-gray-500 truncate group-hover:text-cool-gray-900 transition ease-in-out duration-150">
                                Payment to Molly Sanders
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500">
                          <span className="text-cool-gray-900 font-medium">$20,000 </span>
                          USD
                        </td>
                        <td className="hidden px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-500 md:block">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800 capitalize">
                            success
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500">
                          July 11, 2020
                        </td>
                      </tr>

                      {/* More rows... */}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200 sm:px-6">
                    <div className="hidden sm:block">
                      <p className="text-sm leading-5 text-cool-gray-700">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <a
                        href="/"
                        className="relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
                      >
                        Previous
                      </a>
                      <a
                        href="/"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SidebarLayout>
  );
}

export default ProductionDashboardPage;
