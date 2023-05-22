import Link from 'next/link';
import NavItem from './navitem';

const Navbar = () => {
  return (
      <nav className='w-full lg:min-w-xs lg:max-w-screen-lg flex items-center justify-between flex-row relative border-gray-700 mx-auto px-5 py-8 sm:pb-8 bg-opacity-60 text-gray-100 gap-5 lg:gap-0'>
        <div>
          <h1>
            <Link href='/'>
                <strong className='hover:text-teal-400'>GT3</strong>
            </Link>
          </h1>
        </div>
        <div className='ml-[-0.80rem]'>
          <NavItem />
        </div>
      </nav>
  )
}

export default Navbar;