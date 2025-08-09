import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLanguage } from '../../context/LanguageContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dir } = useLanguage();

  const positionClass = dir === 'ltr' ? 'left-0 border-r' : 'right-0 border-l';

  return <div className="min-h-screen bg-gray-50 flex flex-col" dir={dir}>
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} positionClass={positionClass} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>;
};
export default Layout;