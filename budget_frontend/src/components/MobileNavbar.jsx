import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

function MobileNavbar({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
  user,
}) {

  if (!isOpen) return null;
  const { logout } = useAuth();

  return (
    <div className="md:hidden">
      <ul className="flex flex-col p-4 space-y-4">
        {user ? (
          <>
            <li className="flex justify-center py-3">
              <Link to='/' 
              className="transition hover:text-gray-200">
                Overview
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/profile' className="transition hover:text-gray-200">
                Profile
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="transition hover:text-gray-200">
                Planner
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="transition hover:text-gray-200">
                Saving
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="transition hover:text-gray-200">
                History
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <span className="font-medium">
                Hi, {user.username}
              </span>
            </li>
            <li className="flex justify-center py-3">
                <a onClick={() => logout()} 
                className='p-2 font-semibold text-red-600 transition rounded-lg'
                >
                    Logout
                </a>
            </li>
          </>
        ) : (
          <>
            <li className="flex justify-center py-3 rounded-lg">
              <button
                onClick={onOpenLogin}
                className="text-lg transition hover:text-gray-200"
              >
                Login
              </button>
            </li>

            <li className="flex justify-center py-3 rounded-lg">
              <button
                onClick={onOpenRegister}
                className="text-lg transition hover:text-gray-200"
              >
                Register
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MobileNavbar;
