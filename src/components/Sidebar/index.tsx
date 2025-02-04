import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/jauhari_logo.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#7A231C] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname === '/' ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >
                  <svg
                    className="[&>path]:stroke-white [&>path]:group-hover:stroke-[#7A231C] [&>path]:group-[.bg-white]:stroke-[#7A231C]"
                    width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.89555 9.65775C1.98236 10.851 2.63499 11.8107 3.44602 11.9436C4.04844 12.0424 4.66697 12.1272 5.29758 12.1272C5.92821 12.1272 6.54672 12.0424 7.14914 11.9436C7.96018 11.8107 8.6128 10.851 8.69962 9.65775C8.7637 8.77689 8.81782 7.87253 8.81782 6.95056C8.81782 6.02857 8.7637 5.12423 8.69962 4.24336C8.6128 3.05013 7.96018 2.09042 7.14914 1.95747C6.54672 1.85873 5.92821 1.77393 5.29758 1.77393C4.66697 1.77393 4.04844 1.85873 3.44602 1.95747C2.63499 2.09042 1.98236 3.05013 1.89555 4.24336C1.83146 5.12423 1.77734 6.02857 1.77734 6.95056C1.77734 7.87253 1.83146 8.77689 1.89555 9.65775Z" stroke="#7A231C" strokeWidth="1.281" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.1349 11.399C19.048 10.2065 18.3939 9.24744 17.5811 9.11458C16.9772 9.0159 16.3574 8.93115 15.7254 8.93115C15.0934 8.93115 14.4734 9.0159 13.8697 9.11458C13.0568 9.24744 12.4027 10.2065 12.3157 11.399C12.2515 12.2793 12.1973 13.1831 12.1973 14.1044C12.1973 15.0259 12.2515 15.9296 12.3157 16.8099C12.4027 18.0023 13.0568 18.9615 13.8697 19.0943C14.4734 19.1929 15.0934 19.2777 15.7254 19.2777C16.3574 19.2777 16.9772 19.1929 17.5811 19.0943C18.3939 18.9615 19.048 18.0023 19.1349 16.8099C19.1992 15.9296 19.2534 15.0259 19.2534 14.1044C19.2534 13.1831 19.1992 12.2793 19.1349 11.399Z" stroke="#7A231C" strokeWidth="1.281" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.89555 18.3856C1.98236 18.8167 2.63499 19.1635 3.44602 19.2115C4.04844 19.2473 4.66697 19.2779 5.29758 19.2779C5.92821 19.2779 6.54672 19.2473 7.14914 19.2115C7.96018 19.1635 8.6128 18.8167 8.69962 18.3856C8.7637 18.0673 8.81782 17.7404 8.81782 17.4072C8.81782 17.074 8.7637 16.7472 8.69962 16.4289C8.6128 15.9978 7.96018 15.651 7.14914 15.603C6.54672 15.5672 5.92821 15.5366 5.29758 15.5366C4.66697 15.5366 4.04844 15.5672 3.44602 15.603C2.63499 15.651 1.98236 15.9978 1.89555 16.4289C1.83146 16.7472 1.77734 17.074 1.77734 17.4072C1.77734 17.7404 1.83146 18.0673 1.89555 18.3856Z" stroke="#7A231C" strokeWidth="1.281" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.1349 2.6663C19.048 2.2351 18.3939 1.88829 17.5811 1.84025C16.9772 1.80457 16.3574 1.77393 15.7254 1.77393C15.0934 1.77393 14.4734 1.80457 13.8697 1.84025C13.0568 1.88829 12.4027 2.2351 12.3157 2.6663C12.2515 2.98462 12.1973 3.31142 12.1973 3.64458C12.1973 3.97776 12.2515 4.30456 12.3157 4.62288C12.4027 5.05407 13.0568 5.40088 13.8697 5.44893C14.4734 5.4846 15.0934 5.51525 15.7254 5.51525C16.3574 5.51525 16.9772 5.4846 17.5811 5.44893C18.3939 5.40088 19.048 5.05407 19.1349 4.62288C19.1992 4.30456 19.2534 3.97776 19.2534 3.64458C19.2534 3.31142 19.1992 2.98462 19.1349 2.6663Z" stroke="#7A231C" strokeWidth="1.281" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/users"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("users") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >
                  <svg
                    className="[&>g>path]:stroke-white [&>g>path]:group-hover:stroke-[#7A231C] [&>g>path]:group-[.bg-white]:stroke-[#7A231C]"
                    width={21}
                    height={21}
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_573_830)">
                      <path
                        d="M7.21289 5.56987C7.21289 6.44155 7.55916 7.27752 8.17553 7.89389C8.7919 8.51026 9.62788 8.85654 10.4996 8.85654C11.3712 8.85654 12.2072 8.51026 12.8236 7.89389C13.44 7.27752 13.7862 6.44155 13.7862 5.56987C13.7862 4.69819 13.44 3.86221 12.8236 3.24585C12.2072 2.62948 11.3712 2.2832 10.4996 2.2832C9.62788 2.2832 8.7919 2.62948 8.17553 3.24585C7.55916 3.86221 7.21289 4.69819 7.21289 5.56987Z"
                        strokeWidth="1.28"
                      />
                      <path
                        d="M17.0724 15.0193C17.0724 17.0614 17.0724 18.7168 10.4991 18.7168C3.92578 18.7168 3.92578 17.0614 3.92578 15.0193C3.92578 12.9772 6.86876 11.3218 10.4991 11.3218C14.1295 11.3218 17.0724 12.9772 17.0724 15.0193Z"
                        strokeWidth="1.28"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_573_830">
                        <rect width={21} height={21} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    User Management
                  </span>
                </NavLink>
              </li>

              {/* gsp management */}
              {/* <li>
                <NavLink
                  to="/gsp-management"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] py-2 px-4 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes('gsp-management') && 'bg-white dark:bg-meta-4 text-[#7A231C]'
                    }`}
                >
                  <svg width={19} height={17} viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.86642 10.3052C2.03897 9.82497 2.46747 9.50329 2.97402 9.44125C3.46292 9.38168 4.11902 9.32129 4.77512 9.32129C5.43122 9.32129 6.08732 9.38168 6.57662 9.44125C7.08318 9.50288 7.51168 9.82497 7.68423 10.3052C7.94798 11.0394 8.32184 12.3146 8.55807 14.1313C8.64024 14.7615 8.19859 15.3236 7.5655 15.3774C6.91802 15.4324 5.9879 15.4838 4.77512 15.4838C3.56275 15.4838 2.63262 15.4324 1.98556 15.377C1.35205 15.3236 0.910408 14.7615 0.992164 14.1313C1.2288 12.3146 1.60266 11.0394 1.86642 10.3052Z" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.3156 10.3052C11.4882 9.82497 11.9167 9.50329 12.4232 9.44125C12.9121 9.38168 13.5686 9.32129 14.2243 9.32129C14.8804 9.32129 15.5365 9.38168 16.0258 9.44125C16.5324 9.50288 16.9609 9.82497 17.1334 10.3052C17.3972 11.0394 17.7711 12.3146 18.0073 14.1313C18.0895 14.7615 17.6478 15.3236 17.0147 15.3774C16.3672 15.4324 15.4371 15.4838 14.2243 15.4838C13.012 15.4838 12.0818 15.4324 11.4348 15.377C10.8013 15.3236 10.3596 14.7615 10.4414 14.1313C10.678 12.3146 11.0519 11.0394 11.3156 10.3052Z" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.59103 2.49957C6.76358 2.01931 7.19208 1.69762 7.69863 1.63559C8.18752 1.57602 8.84404 1.51562 9.49973 1.51562C10.1558 1.51562 10.8119 1.57602 11.3012 1.63559C11.8078 1.69721 12.2363 2.01931 12.4088 2.49957C12.6726 3.23373 13.0464 4.50896 13.2827 6.32566C13.3648 6.95588 12.9232 7.5179 12.2901 7.57172C11.6426 7.62677 10.7125 7.67812 9.49973 7.67812C8.28736 7.67812 7.35723 7.62677 6.71017 7.57131C6.07666 7.5179 5.63502 6.95588 5.71677 6.32566C5.95341 4.50896 6.32727 3.23373 6.59103 2.49957Z" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>


                  GSP Management
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/recent-transactions"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("recent-transactions") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >

<svg 
  className="[&>path]:stroke-white group-hover:[&>path]:stroke-[#7A231C] group-[.bg-white]:[&>path]:stroke-[#7A231C]"
  width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path d="M3.92654 4.74854H17.0732C17.0732 4.74854 18.7165 4.74854 18.7165 6.39187V14.6085C18.7165 14.6085 18.7165 16.2519 17.0732 16.2519H3.92654C3.92654 16.2519 2.2832 16.2519 2.2832 14.6085V6.39187C2.2832 6.39187 2.2832 4.74854 3.92654 4.74854Z" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.2832 8.85645H18.7165" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    Recent Transactions
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/business-setup"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("business-setup") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >

<svg 
  className="[&>path]:stroke-white group-hover:[&>path]:stroke-[#7A231C] group-[.bg-white]:[&>path]:stroke-[#7A231C]"
  width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path d="M5.01953 1.88672H15.9789V19.1133H5.01953V1.88672Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M7.36719 5.02051H8.93398" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M7.36719 8.15381H8.93398" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M7.36719 11.2793H8.93398" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M9.7207 5.02051H11.2793" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M9.7207 8.15381H11.2793" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M9.7207 11.2793H11.2793" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M12.0664 5.02051H13.6332" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M12.0664 8.15381H13.6332" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M12.0664 11.2793H13.6332" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M8.1543 15.2002H12.8547V19.1131H8.1543V15.2002Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M5.02031 19.1133H1.88672V12.0668L5.02031 10.5V19.1133Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M15.9805 19.1133H19.1141V12.0668L15.9805 10.5V19.1133Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                  </svg>

                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    Business Setup
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pages"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("pages") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >

                  <svg
                    className="[&>path]:stroke-white group-hover:[&>path]:stroke-[#7A231C] group-[.bg-white]:[&>path]:stroke-[#7A231C]"
                    width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path d="M5.79883 12.0669H12.066" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M5.79883 8.93311H12.066" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M5.79883 15.2002H12.066" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M14.4125 7.3666V19.1135H3.45312V5.02051H14.4125V7.3666Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M14.4137 15.9797H17.5473V4.23281V1.88672H6.58789V5.02031" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                  </svg>


                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">

                    Pages and Media
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/banner-setup"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("banner-setup") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >

                  <svg
                    className="[&>path]:stroke-white group-hover:[&>path]:stroke-[#7A231C] group-[.bg-white]:[&>path]:stroke-[#7A231C]"
                    width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path d="M1.88672 1.88672H19.1133V19.1133H1.88672V1.88672Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M1.88672 16.7673L7.36641 11.2876L12.0668 15.9798L15.2004 12.8462L19.1133 16.7673" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                    <path d="M10.5 7.3666C10.5 7.78214 10.6651 8.18066 10.9589 8.47449C11.2527 8.76833 11.6513 8.9334 12.0668 8.9334C12.4823 8.9334 12.8809 8.76833 13.1747 8.47449C13.4685 8.18066 13.6336 7.78214 13.6336 7.3666C13.6336 6.95106 13.4685 6.55254 13.1747 6.25871C12.8809 5.96488 12.4823 5.7998 12.0668 5.7998C11.6513 5.7998 11.2527 5.96488 10.9589 6.25871C10.6651 6.55254 10.5 6.95106 10.5 7.3666Z" stroke="white" strokeWidth="1.28" strokeMiterlimit={10} />
                  </svg>



                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    Banner Setup
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payment-info"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes("payment-info") ? 'bg-white dark:bg-meta-4 text-[#7A231C]' : ''
                    }`}
                >


                  <svg
                    className="[&>path]:stroke-white [&>path]:group-hover:stroke-[#7A231C] [&>path]:group-[.bg-white]:stroke-[#7A231C]"
                    width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.57047 7.2132C5.57047 5.90569 6.08988 4.65172 7.01443 3.72717C7.93899 2.80261 9.19295 2.2832 10.5005 2.2832C11.808 2.2832 13.062 2.80261 13.9865 3.72717C14.9111 4.65172 15.4305 5.90569 15.4305 7.2132C15.4305 12.9649 17.8955 14.6082 17.8955 14.6082H3.10547C3.10547 14.6082 5.57047 12.9649 5.57047 7.2132Z" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.10352 17.895C9.24105 18.1452 9.44323 18.3538 9.68895 18.4991C9.93466 18.6444 10.2149 18.7211 10.5003 18.7211C10.7858 18.7211 11.066 18.6444 11.3118 18.4991C11.5575 18.3538 11.7596 18.1452 11.8972 17.895" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>



                  <span className="group-hover:text-[#7A231C] group-[.bg-white]:text-[#7A231C]">
                    Payment Info
                  </span>
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div className='hidden'>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-[13px] py-2 px-4 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-white dark:bg-meta-4 text-[#7A231C]'
                    }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9801)">
                      <path
                        d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                        fill=""
                      />
                      <path
                        d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9801">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Chart
                </NavLink>
              </li>
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-[13px] px-4 py-2 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${(pathname === '/ui' || pathname.includes('ui')) &&
                          'bg-white dark:bg-meta-4 text-[#7A231C]'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9807)">
                            <path
                              d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                              fill=""
                            />
                            <path
                              d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                              fill=""
                            />
                            <path
                              d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9807">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        UI Elements
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/ui/alerts"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Alerts
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/ui/buttons"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Buttons
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-[13px] py-2 px-4 font-medium text-white hover:text-[#7A231C] duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${(pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-white dark:bg-meta-4 text-[#7A231C]'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/signin"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/auth/signup"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign Up
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
