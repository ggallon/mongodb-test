import { signIn } from 'next-auth/client';
import styles from './access-denied.module.css';

export default function AccessDenied() {
  return (
    <div className="bg-gray-50 select-none">
      <div className="flex items-center justify-center h-screen max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg px-4 py-4 text-left overflow-hidden shadow-xl mb-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              {/* Heroicon name: exclamation */}
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Accès refusé
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">
                  Vous devez être connecté pour voir cette page.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <a
              href="/api/auth/signin"
              onClick={e => {
                e.preventDefault();
                signIn();
              }}
            >
              <span className="flex items-center justify-center rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Connectez-vous à votre compte
                  <svg className={styles.HoverArrow} viewBox="0 0 10 10" aria-hidden="true">
                    <g fillRule="evenodd">
                      <path className={styles.HoverArrow__linePath} s d="M0 5h7" />
                      <path className={styles.HoverArrow__tipPath} d="M1 1l4 4-4 4" />
                    </g>
                  </svg>
                </button>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
