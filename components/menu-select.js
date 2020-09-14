import { useSelect } from 'downshift';

const items = [
  {
    name: 'Tom Cook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Wade Cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
  }
];

function MenuSelect() {
  const itemToString = item => (item ? item.name : '');
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({ items, itemToString });

  return (
    <div className="space-y-1">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label {...getLabelProps()} className="block text-sm leading-5 font-medium text-gray-700">
        Assigned to
      </label>
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            {...getToggleButtonProps()}
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <div className="flex items-center space-x-3">
              <img
                src={
                  selectedItem
                    ? selectedItem.avatar
                    : 'https://unsplash.com/photos/GMIA-4s6yEA/download?force=true&w=640'
                }
                alt="avatar"
                className="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span className="block truncate">
                {selectedItem ? itemToString(selectedItem) : 'Name'}
              </span>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <ul
              {...getMenuProps()}
              className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            >
              {/*
                Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
      
                Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
              */}
              {items.map((item, index) => (
                <li
                  className={`${
                    highlightedIndex === index ? 'text-white bg-indigo-600' : 'text-gray-900'
                  } cursor-default select-none relative py-2 pl-3 pr-9`}
                  key={`${item.name}`}
                  {...getItemProps({ item, index })}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    {/* Selected: "font-semibold", Not Selected: "font-normal" */}
                    <span
                      className={`${
                        itemToString(selectedItem) === item.name ? 'font-semibold' : 'font-normal'
                      } block truncate`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/*
                    Checkmark, only display for selected option.
                    Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                  */}
                  {itemToString(selectedItem) === item.name && (
                    <span
                      className={`${
                        highlightedIndex === index ? 'text-white' : 'text-indigo-600'
                      } absolute inset-y-0 right-0 flex items-center pr-4`}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuSelect;
