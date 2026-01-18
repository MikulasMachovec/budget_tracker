import { Link } from 'react-router-dom';

function MobileNavbar({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
  user,
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <ul className="flex flex-col space-y-4 p-4">
        {user ? (
          <>
            <li className="flex justify-center py-3">
              <Link to='/' 
              className="hover:text-gray-200 transition">
                Overview
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/profile' className="hover:text-gray-200 transition">
                Profile
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="hover:text-gray-200 transition">
                Planner
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="hover:text-gray-200 transition">
                Saving
              </Link>
            </li>

            <li className="flex justify-center py-3">
              <Link to='/' className="hover:text-gray-200 transition">
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
                className='text-red-600 font-semibold p-2 rounded-lg transition'
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
                className="text-lg hover:text-gray-200 transition"
              >
                Login
              </button>
            </li>

            <li className="flex justify-center py-3 rounded-lg">
              <button
                onClick={onOpenRegister}
                className="text-lg hover:text-gray-200 transition"
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
