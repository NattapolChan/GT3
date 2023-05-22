import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export interface NavItemHeaderAnimation {
    name: string;
    x: number;
    y: number;
    w: string;
  }

export const navItemsSelected: { [key: string]: NavItemHeaderAnimation } = {
  '/': {
    name: 'home',
    x: 1,
    y: -3,
    w: '60px',
  },
  '/about': {
    name: 'about',
    x: 65,
    y: -3,
    w: '60px',
  },
  '/signin': {
    name: 'signin',
    x: 127,
    y: -3,
    w: '70px',
  },
  '/tabs': {
    name: 'your tabs',
    x: 203,
    y: -3,
    w: '45px',
  },
};

const LinksNav = () => {

  let pathname = usePathname() as string;
  return (
    <>
      {
        Object.entries(navItemsSelected).map(([path, { name }]) => {

          const isActive = (pathname.includes(path) && path.length > 1) || (pathname=='/' && path=='/');

          return (
            <Link
              key={path}
              href={path}
              className={clsx(
                'hidden lg:inline-block transition ease hover:text-teal-400 py-[2px] px-[10px]',
                {
                  'text-neutral-500': !isActive,
                  'font-bold': isActive,
                }
              )}>

              {name}

            </Link>
          )
        })
      }
    </>
  )
}

export default LinksNav;