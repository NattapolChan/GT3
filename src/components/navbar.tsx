import Link from 'next/link'
import NavItem from './navitem'

const Navbar = () => {
  return (
    <nav className="lg:min-w-xs relative mx-auto flex w-full flex-row items-center justify-between gap-5 border-gray-700 bg-opacity-60 px-5 py-8 text-gray-100 sm:pb-8 lg:max-w-screen-lg lg:gap-0">
      <div>
        <h1>
          <Link href="/">
            <strong className="hover:text-teal-400">GT3</strong>
          </Link>
        </h1>
      </div>
      <div className="ml-[-0.80rem]">
        <NavItem />
      </div>
    </nav>
  )
}

export default Navbar
