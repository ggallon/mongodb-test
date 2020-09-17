import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'

const linkStyles = {
  all: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
  isOn: 'text-white bg-gray-900 ',
  isOff: 'text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white'
}

const cx = classNames.bind(linkStyles)

function DesktopSidebarItem({
  children,
  className,
  href,
  as
}) {
  const router = useRouter()
  const LinkClassName = cx('all', className, {
    isOn: router.route === href,
    isOff: router.route !== href
  })

  return (
    <Link href={href} as={as}>
      <a className={LinkClassName} role="menuitem">{children}</a>
    </Link>
  )
}

export default DesktopSidebarItem
