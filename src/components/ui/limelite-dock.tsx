import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNavVertical = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newTop = activeItem.offsetTop + activeItem.offsetHeight / 2 - limelight.offsetHeight / 2;
      limelight.style.top = `${newTop}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null;
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative flex flex-col items-center w-16 rounded-lg bg-neutral-900 text-white border border-neutral-700 py-2 shadow-lg ${className}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={el => { navItemRefs.current[index] = el; }}
          className={`relative z-20 flex w-full cursor-pointer items-center justify-center py-5 ${iconContainerClassName}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(
            icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
            {
              className: `w-6 h-6 transition-opacity duration-100 ease-in-out ${
                activeIndex === index ? 'opacity-100' : 'opacity-40'
              } text-primary drop-shadow-lg ${((icon as React.ReactElement<{ className?: string }>).props?.className || '')} ${iconClassName || ''}`,
            }
          )}
        </a>
      ))}

      <div
        ref={limelightRef}
        className={`absolute left-0 z-10 h-11 w-[5px] rounded-full bg-primary shadow-[50px_0_15px_var(--primary)] ${
          isReady ? 'transition-[top] duration-400 ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ top: '-999px' }}
      >
        <div className="absolute top-[-30%] left-[5px] h-[160%] w-14 [clip-path:polygon(100%_5%,0_25%,0_75%,100%_95%)] bg-gradient-to-r from-primary/60 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};