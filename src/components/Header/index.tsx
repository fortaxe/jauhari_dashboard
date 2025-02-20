import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useLocation } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { useTransactionSearch } from "../../context/TransactionSearchContext";
import { useWithdrawalSearch } from "../../context/WithdrawalHistoryContext";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  setSearchTerm?: (term: string) => void; // Accept setSearchTerm as a prop
}) => {
 const { pathname } = useLocation();

// Dynamically use the correct search context
const { searchTerm, setSearchTerm } =
  pathname === "/recent-transactions"
    ? useTransactionSearch()
    : pathname === "/withdrawal-history"
    ? useWithdrawalSearch()
    : useSearch();

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('Search input changed:', e.target.value);
  setSearchTerm(e.target.value);
};

  return (
    <header className="sticky top-0 z-999 flex w-full bg-[#f5f7fa] dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

     
      <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
          {(pathname === "/users" || pathname === "/recent-transactions" || pathname === "/withdrawal-history") && (
            <div className="relative flex items-center justify-between w-[347px] h-[48px]">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm || ""}
                onChange={handleSearchChange}
               
                className="rounded-[13px] py-[14px] px-[32px] bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125 border border-[#7A231C]"
              />


            </div>
          )}

          </form>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}



          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>
  

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex hidden items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>

  );
};

export default Header;
