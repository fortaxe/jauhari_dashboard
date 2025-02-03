// import { Link } from 'react-router-dom';
// import DropdownMessage from "./Header/DropdownMessage";
// import DropdownNotification from "./Header/DropdownNotification";
// import DropdownUser from "./Header/DropdownUser";
// import LogoIcon from '../images/logo/logo-icon.svg';
// import DarkModeSwitcher from "./Header/DarkModeSwitcher";
// import { useLocation } from "react-router-dom";


// interface UsersHeaderProps {
//     searchTerm: string;
//     setSearchTerm: (term: string) => void;
//     sidebarOpen?: boolean;
//     setSidebarOpen?: (open: boolean) => void;
// }

// const UsersHeader: React.FC<UsersHeaderProps> = ({
//     searchTerm,
//     setSearchTerm,
//     sidebarOpen,
//     setSidebarOpen
// }) => {
//     const location = useLocation();

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSidebarToggle = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setSidebarOpen?.(!sidebarOpen);
//     };

//     return (
//         <header className="sticky top-0 z-999 flex w-full bg-[#f5f7fa] dark:bg-boxdark dark:drop-shadow-none">
//             <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
//                 <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
//                     {/* Hamburger Toggle Button */}
//                     <button
//                         aria-controls="sidebar"
//                         onClick={handleSidebarToggle}
//                         className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
//                     >
//                         <span className="relative block h-5.5 w-5.5 cursor-pointer">
//                             <span className="du-block absolute right-0 h-full w-full">
//                                 <span
//                                     className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!w-full delay-300'}`}
//                                 ></span>
//                                 <span
//                                     className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && 'delay-400 !w-full'}`}
//                                 ></span>
//                                 <span
//                                     className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!w-full delay-500'}`}
//                                 ></span>
//                             </span>
//                             <span className="absolute right-0 h-full w-full rotate-45">
//                                 <span
//                                     className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!h-0 !delay-[0]'}`}
//                                 ></span>
//                                 <span
//                                     className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!h-0 !delay-200'}`}
//                                 ></span>
//                             </span>
//                         </span>
//                     </button>

//                     <Link className="block flex-shrink-0 lg:hidden" to="/">
//                         <img src={LogoIcon} alt="Logo" />
//                     </Link>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="hidden sm:block">
//                     <form onSubmit={(e) => e.preventDefault()}>
//                         <div className="relative flex items-center justify-between w-[347px] h-[48px]">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 className="rounded-[13px] py-[14px] px-[32px] bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125 border border-[#7A231C]"
//                             />
//                         </div>
//                     </form>
//                 </div>

//                 {/* Right Side Menu */}
//                 <div className="flex items-center gap-3 2xsm:gap-7">
//                     <ul className="flex hidden items-center gap-2 2xsm:gap-4">
//                         <DarkModeSwitcher />
//                         <DropdownNotification />
//                         <DropdownMessage />
//                     </ul>

//                     <DropdownUser />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default UsersHeader;