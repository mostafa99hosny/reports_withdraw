import React, { useState } from 'react';
import { User, Bell, Shield, Package, Save, Users, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
const UserSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'subscription' | 'users'>('profile');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Sample company users data (would come from API based on current user's company)
  const [companyUsers, setCompanyUsers] = useState([
    {
      id: 1,
      name: 'أحمد الراشد',
      email: 'ahmed.alrashid@company.com',
      role: 'مدير الشركة',
      status: 'نشط',
      lastActive: '2023-05-20T14:30:00',
      permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك'],
      avatar: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=A'
    },
    {
      id: 2,
      name: 'فاطمة الزهراني',
      email: 'fatima@company.com',
      role: 'محاسب',
      status: 'نشط',
      lastActive: '2023-05-20T12:15:00',
      permissions: ['عرض التقارير'],
      avatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=F'
    },
    {
      id: 3,
      name: 'عبدالله السعد',
      email: 'abdullah@company.com',
      role: 'مطور',
      status: 'متوقف',
      lastActive: '2023-05-18T16:45:00',
      permissions: ['إدارة التقارير'],
      avatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=E'
    }
  ]);
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SA');
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              الملف الشخصي
            </h2>
            <div className="mb-6 flex items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="h-10 w-10 text-gray-500" />
              </div>
              <div className="mr-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  تغيير الصورة
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأول
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الاسم الأول" defaultValue="أحمد" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأخير
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الاسم الأخير" defaultValue="الراشد" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="البريد الإلكتروني" defaultValue="ahmed.alrashid@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="رقم الهاتف" defaultValue="+966501234567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الشركة
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الشركة" defaultValue="شركة الرياض العقارية" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنصب
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="المنصب" defaultValue="مدير التقارير" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="العنوان" defaultValue="الرياض، المملكة العربية السعودية" rows={3} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الموقع الإلكتروني
              </label>
              <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="الموقع الإلكتروني" defaultValue="https://ahmed-alrashid.com" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نبذة شخصية
              </label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="نبذة شخصية" defaultValue="خبير في مجال التقارير العقارية مع أكثر من 10 سنوات من الخبرة" rows={5} />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Save className="h-4 w-4 ml-2" />
                حفظ التغييرات
              </button>
            </div>
          </div>;
      case 'notifications':
        return <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              الإشعارات
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      إشعارات البريد الإلكتروني
                    </h3>
                    <p className="text-sm text-gray-500">
                      استلام الإشعارات عبر البريد الإلكتروني
                    </p>
                  </div>
                  <div className="relative inline-block w-10 ml-2 align-middle select-none">
                    <input type="checkbox" name="email-notifications" id="email-notifications" className="sr-only toggle-checkbox" defaultChecked />
                    <label htmlFor="email-notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer toggle-label"></label>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      إشعارات النظام
                    </h3>
                    <p className="text-sm text-gray-500">
                      استلام الإشعارات داخل النظام
                    </p>
                  </div>
                  <div className="relative inline-block w-10 ml-2 align-middle select-none">
                    <input type="checkbox" name="system-notifications" id="system-notifications" className="sr-only toggle-checkbox" defaultChecked />
                    <label htmlFor="system-notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer toggle-label"></label>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      تنبيهات التقارير
                    </h3>
                    <p className="text-sm text-gray-500">
                      الإشعار عند اكتمال عملية سحب أو إرسال التقارير
                    </p>
                  </div>
                  <div className="relative inline-block w-10 ml-2 align-middle select-none">
                    <input type="checkbox" name="report-alerts" id="report-alerts" className="sr-only toggle-checkbox" defaultChecked />
                    <label htmlFor="report-alerts" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer toggle-label"></label>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              .toggle-label {
                transition: background-color 0.2s ease;
              }
              .toggle-label:after {
                content: '';
                position: absolute;
                top: 2px;
                right: 2px;
                width: 18px;
                height: 18px;
                background-color: white;
                border-radius: 50%;
                transition: right 0.2s ease;
              }
              .toggle-checkbox:checked + .toggle-label {
                background-color: #3b82f6;
              }
              .toggle-checkbox:checked + .toggle-label:after {
                right: calc(100% - 20px);
              }
            `}</style>
          </div>;
      case 'security':
        return <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">الأمان</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">
                  تغيير كلمة المرور
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      كلمة المرور الحالية
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="كلمة المرور الحالية" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      كلمة المرور الجديدة
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="كلمة المرور الجديدة" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="تأكيد كلمة المرور الجديدة" />
                  </div>
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      تغيير كلمة المرور
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">
                  المصادقة الثنائية
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  تفعيل المصادقة الثنائية لزيادة أمان حسابك
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  تفعيل المصادقة الثنائية
                </button>
              </div>
            </div>
          </div>;
      case 'subscription':
        return <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">الاشتراك</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">الباقة الحالية</h3>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  نشط
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center ml-4">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      الباقة المتقدمة
                    </h4>
                    <p className="text-sm text-gray-600">
                      تاريخ التجديد: 15/12/2023
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-3">ميزات الباقة</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  سحب وإرسال التقارير بشكل تلقائي
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  إدارة حتى 10 مستخدمين
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تخزين التقارير لمدة سنة كاملة
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  دعم فني على مدار الساعة
                </li>
              </ul>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  ترقية الباقة
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">سجل الفواتير</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الفاتورة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المبلغ
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        INV-2023-001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15/11/2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        5,000 ر.س
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          مدفوعة
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">
                          تحميل
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        INV-2023-002
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15/10/2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        5,000 ر.س
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          مدفوعة
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">
                          تحميل
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>;
      case 'users':
        return <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">إدارة مستخدمي الشركة</h2>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => setShowAddUserModal(true)}
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة مستخدم
              </button>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المستخدم
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الدور
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        آخر نشاط
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {companyUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {user.avatar && (
                              <div className="flex-shrink-0 h-10 w-10 ml-3">
                                <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(user.lastActive)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-blue-600 hover:text-blue-900 ml-3"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditUserModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4 inline ml-1" />
                            تعديل
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4 inline ml-1" />
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* User permissions for each user */}
            <div className="mt-6 space-y-4">
              {companyUsers.map(user => (
                <div key={`permissions-${user.id}`} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    صلاحيات {user.name}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>;
    }
  };
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات المستخدم</h1>
        <p className="text-gray-600">إدارة ملفك الشخصي وإعدادات الحساب</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-64 border-b md:border-b-0 md:border-l border-gray-200">
            <nav className="p-4 space-y-1">
              <button className={`flex items-center px-4 py-2 w-full text-right rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('profile')}>
                <User className="h-5 w-5 ml-2" />
                الملف الشخصي
              </button>
              <button className={`flex items-center px-4 py-2 w-full text-right rounded-lg ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('notifications')}>
                <Bell className="h-5 w-5 ml-2" />
                الإشعارات
              </button>
              <button className={`flex items-center px-4 py-2 w-full text-right rounded-lg ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('security')}>
                <Shield className="h-5 w-5 ml-2" />
                الأمان
              </button>
              <button className={`flex items-center px-4 py-2 w-full text-right rounded-lg ${activeTab === 'subscription' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('subscription')}>
                <Package className="h-5 w-5 ml-2" />
                الاشتراك
              </button>
              <button className={`flex items-center px-4 py-2 w-full text-right rounded-lg ${activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('users')}>
                <Users className="h-5 w-5 ml-2" />
                إدارة المستخدمين
              </button>
            </nav>
          </div>
          <div className="flex-1 p-6">{renderTabContent()}</div>
        </div>
      </div>
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة مستخدم جديد</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="أدخل الاسم الكامل" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="أدخل البريد الإلكتروني" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10" 
                    placeholder="أدخل كلمة المرور" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">اختر الدور</option>
                  <option value="محاسب">محاسب</option>
                  <option value="مطور">مطور</option>
                  <option value="مساعد إداري">مساعد إداري</option>
                  <option value="محلل بيانات">محلل بيانات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصلاحيات</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="mr-2 text-sm text-gray-700">عرض التقارير</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="mr-2 text-sm text-gray-700">إدارة التقارير</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="mr-2 text-sm text-gray-700">تطوير النظام</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إضافة المستخدم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">تعديل المستخدم</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue={selectedUser.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue={selectedUser.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUser.role}
                >
                  <option value="محاسب">محاسب</option>
                  <option value="مطور">مطور</option>
                  <option value="مساعد إداري">مساعد إداري</option>
                  <option value="محلل بيانات">محلل بيانات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUser.status}
                >
                  <option value="نشط">نشط</option>
                  <option value="متوقف">متوقف</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصلاحيات</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedUser.permissions?.includes('عرض التقارير')}
                    />
                    <span className="mr-2 text-sm text-gray-700">عرض التقارير</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedUser.permissions?.includes('إدارة التقارير')}
                    />
                    <span className="mr-2 text-sm text-gray-700">إدارة التقارير</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedUser.permissions?.includes('تطوير النظام')}
                    />
                    <span className="mr-2 text-sm text-gray-700">تطوير النظام</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setShowEditUserModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>;
};
export default UserSettings;