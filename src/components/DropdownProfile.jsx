import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import { logoutUser } from '../api';
import UserAvatar from '../images/user-avatar-32.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../services/UserContext';
import { checkUser } from '../api';

function DropdownProfile({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const trigger = useRef(null);
  const dropdown = useRef(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkUser();
        context.setState({name: user.data.name,
                          verified: user.data.verified,
                          role: user.data.role,
                          company_id: user.data.company_id
                        });   
      } catch (error) {
        localStorage.clear();
        navigate('/Login');
      }
      if (context.state.role === 'SuperAdmin') {
        navigate('/Dashboard/SuperAdmin');
      }
    };
  
    fetchUser();
  }, []);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = async () => {
    await logoutUser(navigate);
  };
 
   

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{context.state.name}</span>
          <svg className="w-3 h-3 ml-1 fill-current shrink-0 text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
            <div className="font-medium text-slate-800 dark:text-slate-100">{context.state.name}</div>
            <div className="text-xs italic text-slate-500 dark:text-slate-400">Company ID: {context.state.company_id}</div>
            <div className="text-xs italic text-slate-500 dark:text-slate-400">Role: {context.state.role}</div>
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  handleLogout();
                }}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;