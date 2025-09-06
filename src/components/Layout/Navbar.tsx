import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, LogOut, Settings, LogIn } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onMenuToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({
  onMenuToggle
}) => {
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const authData = localStorage.getItem('userAuth');
    if (authData) {
      try {
        const auth = JSON.parse(authData);
        setUser(auth.user);
      } catch (error) {
        localStorage.removeItem('userAuth');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };
  const { t, lang, setLang } = useLanguage();

  return <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden" onClick={onMenuToggle}>
              <span className="sr-only">Menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-600 text-xl font-bold">
                {t('appName')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language toggle icons */}
            <div className="flex items-center gap-2" aria-label="Change Language">
              <button
                onClick={() => setLang('ar')}
                className={`text-xs px-2 py-1 rounded border ${lang === 'ar' ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:text-gray-900'}`}
                title="العربية"
              >
                AR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`text-xs px-2 py-1 rounded border ${lang === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:text-gray-900'}`}
                title="English"
              >
                EN
              </button>
            </div>

            {user ? (
              <>
                <button className="text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button
                    className="flex items-center text-sm focus:outline-none"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ml-2">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.company}</div>
                    </div>
                  </button>
                  {userDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">{user.company}</p>
                      </div>
                      <Link
                        to="/settings"
                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 ml-2" />
                        <span>{t('settings')}</span>
                      </Link>
                      <button
                        className="flex w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 ml-2" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <LogIn className="h-4 w-4 ml-2" />
                  {t('login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;