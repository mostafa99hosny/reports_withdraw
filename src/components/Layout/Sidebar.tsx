import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, FileText, Settings, Home, ChevronRight, ChevronDown, HelpCircle, Building2, Cog } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
interface SidebarProps {
  isOpen: boolean;
  positionClass?: string;
}
interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  subItems?: {
    name: string;
    path: string;
  }[];
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  positionClass
}) => {
  const location = useLocation();
  const { t, dir } = useLanguage();
  // Track which menus are expanded
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  // Close all menus on first mount
  React.useEffect(() => {
    setExpandedMenus({});
  }, []);

  const isRTL = dir === 'rtl';
  const iconMargin = isRTL ? 'ml-3' : 'mr-3';
  const textMargin = isRTL ? 'mr-3' : 'ml-3';

  const menuItems: MenuItem[] = [{
    name: 'home',
    path: '/',
    icon: <Home className="h-5 w-5" />
  }, {
    name: 'reports',
    path: '/reports',
    icon: <Building2 className="h-5 w-5" />, // أيقونة عقارات واضحة
    subItems: [{
      name: 'mekyasReports',
      path: '/auth/mekyas'
    }, {
      name: 'jadeerReports',
      path: '/auth/jadeer' // أولاً صفحة تسجيل الدخول
    }, {
      name: 'noqraReports',
      path: '/reports/noqra'
    }, {
      name: 'manualUpload',
      path: '/reports/manual-upload'
    }, {
      name: 'manualUploadWithId',
      path: '/reports/manual-upload-with-id'
    }, {
      name: 'viewReports',
      path: '/reports/view'
    }]
  }, 
  {
    name: 'equipmentReports',
    path: '/equipment-reports',
    icon: <Cog className="h-5 w-5" />, // أيقونة معدات واضحة
    subItems: [
      {
        name: 'manualUploadEquipment',
        path: '/equipment-reports/manual-upload'
      },
      {
        name: 'manualUploadEquipmentWithId',
        path: '/equipment-reports/manual-upload-with-id'
      }
    ]
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    icon: <BarChart className="h-5 w-5" />
  }, {
    name: 'settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }, {
    name: 'support',
    path: '/support',
    icon: <HelpCircle className="h-5 w-5" />
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const isSubActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };
  return <aside className={`sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-blue-50 via-white to-blue-100 border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-10 ${positionClass || 'right-0 border-l'}`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <div className="space-y-2">
                  <div className={`flex items-start min-w-0 p-2 rounded-lg cursor-pointer transition-colors font-semibold text-gray-700 ${isSubActive(item.path) ? 'bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800 shadow' : 'hover:bg-blue-100 hover:text-blue-700'}`} onClick={() => toggleMenu(item.path)}>
                    <span className={`${iconMargin} text-blue-600`}>{item.icon}</span>
                    <span className={`flex-1 min-w-0 ${textMargin} whitespace-normal break-words leading-snug`} title={t(item.name)}>{t(item.name)}</span>
                    {expandedMenus[item.path] ? <ChevronDown className="h-4 w-4 text-blue-600" /> : <ChevronRight className="h-4 w-4 text-blue-400" />}
                  </div>
                  {expandedMenus[item.path] && (
                    <ul className={`${isRTL ? 'mr-6 border-r pr-3' : 'ml-6 border-l pl-3'} space-y-1 border-blue-200`}>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path} className={`flex items-start min-w-0 p-2 rounded-lg font-medium transition-colors ${isActive(subItem.path) ? 'bg-gradient-to-r from-blue-400 to-blue-200 text-white shadow' : 'hover:bg-blue-50 hover:text-blue-700 text-gray-700'}`}>
                            <span className="flex-1 min-w-0 whitespace-normal break-words leading-snug" title={t(subItem.name)}>
                              {t(subItem.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={item.path} className={`flex items-start min-w-0 p-2 rounded-lg font-semibold transition-colors ${isActive(item.path) ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow' : 'hover:bg-blue-100 hover:text-blue-700 text-gray-700'}`}>
                  <span className={`${iconMargin} text-blue-600`}>{item.icon}</span>
                  <span className={`flex-1 min-w-0 ${textMargin} whitespace-normal break-words leading-snug`} title={t(item.name)}>{t(item.name)}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        aside {
          border-radius: 1rem 0 0 1rem;
        }
        .shadow-lg {
          box-shadow: 0 4px 24px 0 rgba(37,99,235,0.08);
        }
        .bg-gradient-to-b {
          background: linear-gradient(to bottom, #eff6ff 0%, #fff 60%, #dbeafe 100%);
        }
        .bg-gradient-to-r {
          background: linear-gradient(to right, #3b82f6 0%, #60a5fa 100%);
        }
      `}</style>
    </aside>;
};
export default Sidebar;