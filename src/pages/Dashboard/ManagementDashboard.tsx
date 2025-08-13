import React, { useState } from 'react';
import { ArrowUpRight, BarChart, ChevronDown, Check, Edit, Filter, FileText, MessageSquare, MoreHorizontal, Phone, Plus, Search, Mail, Users, Package, Building, Briefcase, Eye, EyeOff, Trash2, X, Save } from 'lucide-react';
import { useTr, useLanguage } from '../../context/LanguageContext';
// Define types for our data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar?: string;
  permissions?: string[];
}

interface Company {
  id: number;
  name: string;
  package: string;
  status: string;
  logo?: string;
  createdAt: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  users: User[];
}
interface PackageType {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  usersLimit: number;
  reportsLimit: number;
  storageLimit: string;
  status: string;
  popularChoice?: boolean;
}
interface SupportTicket {
  id: number;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  assignedTo?: string;
  messages?: TicketMessage[];
}
interface TicketMessage {
  id: number;
  ticketId: number;
  sender: string;
  senderRole: 'user' | 'support';
  senderAvatar?: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}
interface Notification {
  id: number;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  date: string;
}
// Sample data for companies with their users
const companies: Company[] = [{
  id: 1,
  name: 'شركة المستقبل العقارية',
  package: 'المتقدمة',
  status: 'نشط',
  logo: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=F',
  createdAt: '2023-01-15T10:30:00',
  contactPerson: 'أحمد محمد',
  contactEmail: 'ahmed@future-re.com',
  contactPhone: '+966501234567',
  users: [{
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@future-re.com',
    role: 'مدير الشركة',
    status: 'نشط',
    lastActive: '2023-05-20T14:30:00',
    avatar: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=A',
    permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك']
  }, {
    id: 2,
    name: 'فاطمة الزهراني',
    email: 'fatima@future-re.com',
    role: 'محاسب',
    status: 'نشط',
    lastActive: '2023-05-20T12:15:00',
    avatar: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=F',
    permissions: ['عرض التقارير']
  }, {
    id: 3,
    name: 'عبدالله السعد',
    email: 'abdullah@future-re.com',
    role: 'مطور',
    status: 'نشط',
    lastActive: '2023-05-19T16:45:00',
    avatar: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=E',
    permissions: ['إدارة التقارير', 'تطوير النظام']
  }]
}, {
  id: 2,
  name: 'شركة الرياض العقارية',
  package: 'الأساسية',
  status: 'نشط',
  logo: 'https://via.placeholder.com/40/10B981/FFFFFF?text=R',
  createdAt: '2023-02-20T14:15:00',
  contactPerson: 'سارة الأحمد',
  contactEmail: 'sara@riyadh-re.com',
  contactPhone: '+966512345678',
  users: [{
    id: 4,
    name: 'سارة الأحمد',
    email: 'sara@riyadh-re.com',
    role: 'مدير الشركة',
    status: 'نشط',
    lastActive: '2023-05-19T10:15:00',
    avatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=S',
    permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك']
  }, {
    id: 5,
    name: 'محمد الغامدي',
    email: 'mohammed@riyadh-re.com',
    role: 'مساعد إداري',
    status: 'نشط',
    lastActive: '2023-05-18T14:30:00',
    avatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=M',
    permissions: ['عرض التقارير']
  }]
}, {
  id: 3,
  name: 'مجموعة الخليج للعقارات',
  package: 'الاحترافية',
  status: 'نشط',
  logo: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=G',
  createdAt: '2022-11-05T09:45:00',
  contactPerson: 'محمد العلي',
  contactEmail: 'mohammed@gulf-re.com',
  contactPhone: '+966523456789',
  users: [{
    id: 6,
    name: 'محمد العلي',
    email: 'mohammed@gulf-re.com',
    role: 'مدير الشركة',
    status: 'نشط',
    lastActive: '2023-05-20T09:45:00',
    avatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=M',
    permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك']
  }, {
    id: 7,
    name: 'نورا القحطاني',
    email: 'nora@gulf-re.com',
    role: 'مدير مالي',
    status: 'نشط',
    lastActive: '2023-05-19T11:20:00',
    avatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=N',
    permissions: ['إدارة التقارير', 'عرض التقارير']
  }, {
    id: 8,
    name: 'خالد الشمري',
    email: 'khalid@gulf-re.com',
    role: 'محلل بيانات',
    status: 'متوقف',
    lastActive: '2023-05-15T08:30:00',
    avatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=K',
    permissions: ['عرض التقارير']
  }]
}, {
  id: 4,
  name: 'عقارات المملكة المتحدة',
  package: 'الأساسية',
  status: 'متوقف',
  logo: 'https://via.placeholder.com/40/6366F1/FFFFFF?text=U',
  createdAt: '2023-03-10T11:20:00',
  contactPerson: 'خالد المالكي',
  contactEmail: 'khalid@uk-re.com',
  contactPhone: '+966534567890',
  users: [{
    id: 9,
    name: 'خالد المالكي',
    email: 'khalid@uk-re.com',
    role: 'مدير الشركة',
    status: 'متوقف',
    lastActive: '2023-04-20T15:30:00',
    avatar: 'https://via.placeholder.com/40/6366F1/FFFFFF?text=K',
    permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك']
  }]
}, {
  id: 5,
  name: 'مؤسسة العمران للعقارات',
  package: 'الأساسية',
  status: 'نشط',
  logo: 'https://via.placeholder.com/40/EC4899/FFFFFF?text=O',
  createdAt: '2023-04-05T16:30:00',
  contactPerson: 'فهد العمران',
  contactEmail: 'fahad@omran-re.com',
  contactPhone: '+966545678901',
  users: [{
    id: 10,
    name: 'فهد العمران',
    email: 'fahad@omran-re.com',
    role: 'مدير الشركة',
    status: 'نشط',
    lastActive: '2023-05-20T13:15:00',
    avatar: 'https://via.placeholder.com/40/EC4899/FFFFFF?text=F',
    permissions: ['إدارة المستخدمين', 'إدارة التقارير', 'إدارة الاشتراك']
  }, {
    id: 11,
    name: 'ريم الدوسري',
    email: 'reem@omran-re.com',
    role: 'سكرتيرة',
    status: 'نشط',
    lastActive: '2023-05-19T09:30:00',
    avatar: 'https://via.placeholder.com/40/EC4899/FFFFFF?text=R',
    permissions: ['عرض التقارير']
  }]
}];
// Get all users from all companies
const getAllUsers = () => {
  return companies.flatMap(company =>
    company.users.map(user => ({
      ...user,
      companyName: company.name,
      companyId: company.id
    }))
  );
};
// Sample data for packages
const packages: PackageType[] = [{
  id: 1,
  name: 'الباقة الأساسية',
  price: 1999,
  period: 'شهري',
  features: ['سحب التقارير التلقائي', 'إدارة حتى 5 مستخدمين', 'تخزين التقارير لمدة 3 أشهر', 'دعم فني بالبريد الإلكتروني'],
  usersLimit: 5,
  reportsLimit: 100,
  storageLimit: '5GB',
  status: 'نشط'
}, {
  id: 2,
  name: 'الباقة المتقدمة',
  price: 4999,
  period: 'شهري',
  features: ['سحب التقارير التلقائي', 'إدارة حتى 10 مستخدمين', 'تخزين التقارير لمدة سنة كاملة', 'دعم فني على مدار الساعة', 'تقارير تحليلية متقدمة'],
  usersLimit: 10,
  reportsLimit: 500,
  storageLimit: '20GB',
  status: 'نشط',
  popularChoice: true
}, {
  id: 3,
  name: 'الباقة الاحترافية',
  price: 9999,
  period: 'شهري',
  features: ['سحب التقارير التلقائي', 'إدارة عدد غير محدود من المستخدمين', 'تخزين التقارير لمدة 3 سنوات', 'دعم فني على مدار الساعة', 'تقارير تحليلية متقدمة', 'واجهة برمجة التطبيقات (API)', 'تخصيص كامل للنظام'],
  usersLimit: 999,
  reportsLimit: 999,
  storageLimit: '100GB',
  status: 'نشط'
}];
// Sample data for support tickets
const supportTickets: SupportTicket[] = [{
  id: 1,
  subject: 'مشكلة في سحب التقارير التلقائي',
  status: 'مفتوح',
  priority: 'عالي',
  createdAt: '2023-11-22T10:30:00',
  updatedAt: '2023-11-22T10:30:00',
  company: 'شركة المستقبل العقارية',
  assignedTo: 'محمد الدعم',
  messages: [{
    id: 1,
    ticketId: 1,
    sender: 'سارة الأحمد',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/D97706/FFFFFF?text=S',
    message: 'نواجه مشكلة في سحب التقارير بشكل تلقائي منذ الصباح. هل يمكن المساعدة في حل المشكلة؟',
    timestamp: '2023-11-22T10:30:00'
  }, {
    id: 2,
    ticketId: 1,
    sender: 'محمد الدعم',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=M',
    message: 'شكراً للتواصل معنا. هل يمكن مشاركة رسائل الخطأ التي تظهر لديكم أثناء محاولة سحب التقارير؟',
    timestamp: '2023-11-22T10:45:00'
  }, {
    id: 3,
    ticketId: 1,
    sender: 'سارة الأحمد',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/D97706/FFFFFF?text=S',
    message: 'نعم، تظهر رسالة "فشل في الاتصال بالخادم" عند محاولة سحب التقارير. سأرفق لكم لقطة شاشة للخطأ.',
    timestamp: '2023-11-22T11:00:00',
    attachments: ['screenshot1.jpg']
  }]
}, {
  id: 2,
  subject: 'استفسار عن ترقية الباقة',
  status: 'قيد المعالجة',
  priority: 'متوسط',
  createdAt: '2023-11-21T14:15:00',
  updatedAt: '2023-11-22T09:20:00',
  company: 'شركة الرياض العقارية',
  assignedTo: 'أحمد المساعد',
  messages: [{
    id: 4,
    ticketId: 2,
    sender: 'أحمد الراشد',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/4F46E5/FFFFFF?text=A',
    message: 'نرغب في معرفة تفاصيل ترقية الباقة من الأساسية إلى المتقدمة وما هي الخطوات المطلوبة؟',
    timestamp: '2023-11-21T14:15:00'
  }, {
    id: 5,
    ticketId: 2,
    sender: 'أحمد المساعد',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=A',
    message: 'مرحباً بك، يمكنك ترقية الباقة من خلال صفحة الاشتراكات في لوحة التحكم. سأرسل لك دليل مفصل بالخطوات المطلوبة.',
    timestamp: '2023-11-21T15:30:00'
  }, {
    id: 6,
    ticketId: 2,
    sender: 'أحمد المساعد',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=A',
    message: 'تم إرسال دليل الترقية إلى بريدك الإلكتروني. هل هناك أي استفسارات أخرى؟',
    timestamp: '2023-11-22T09:20:00',
    attachments: ['upgrade_guide.pdf']
  }]
}, {
  id: 3,
  subject: 'طلب إضافة مستخدمين جدد',
  status: 'مغلق',
  priority: 'منخفض',
  createdAt: '2023-11-20T11:45:00',
  updatedAt: '2023-11-21T13:30:00',
  company: 'مجموعة الخليج للعقارات',
  assignedTo: 'سارة الدعم',
  messages: [{
    id: 7,
    ticketId: 3,
    sender: 'محمد العلي',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/059669/FFFFFF?text=M',
    message: 'نحتاج إلى إضافة 3 مستخدمين جدد للنظام. هل يمكن مساعدتنا في ذلك؟',
    timestamp: '2023-11-20T11:45:00'
  }, {
    id: 8,
    ticketId: 3,
    sender: 'سارة الدعم',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/8B5CF6/FFFFFF?text=S',
    message: 'بالتأكيد، يمكنك إضافة المستخدمين من خلال قسم إدارة المستخدمين في لوحة التحكم. هل ترغب في مساعدة لإضافتهم؟',
    timestamp: '2023-11-20T13:20:00'
  }, {
    id: 9,
    ticketId: 3,
    sender: 'محمد العلي',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/059669/FFFFFF?text=M',
    message: 'تمكنت من إضافتهم بنجاح، شكراً لكم على المساعدة السريعة!',
    timestamp: '2023-11-21T10:15:00'
  }, {
    id: 10,
    ticketId: 3,
    sender: 'سارة الدعم',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/8B5CF6/FFFFFF?text=S',
    message: 'سعداء بمساعدتك! هل هناك أي استفسارات أخرى يمكننا المساعدة فيها؟',
    timestamp: '2023-11-21T11:00:00'
  }, {
    id: 11,
    ticketId: 3,
    sender: 'محمد العلي',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/059669/FFFFFF?text=M',
    message: 'لا، شكراً لكم. يمكن إغلاق التذكرة.',
    timestamp: '2023-11-21T12:45:00'
  }, {
    id: 12,
    ticketId: 3,
    sender: 'سارة الدعم',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/8B5CF6/FFFFFF?text=S',
    message: 'تم إغلاق التذكرة. نشكرك على التواصل معنا ونسعد بخدمتك دائماً.',
    timestamp: '2023-11-21T13:30:00'
  }]
}, {
  id: 4,
  subject: 'خطأ في عرض التقارير',
  status: 'مفتوح',
  priority: 'عالي',
  createdAt: '2023-11-22T08:30:00',
  updatedAt: '2023-11-22T08:30:00',
  company: 'عقارات المملكة المتحدة',
  messages: [{
    id: 13,
    ticketId: 4,
    sender: 'خالد المالكي',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/DC2626/FFFFFF?text=K',
    message: 'نواجه مشكلة في عرض التقارير المسحوبة حديثاً. البيانات لا تظهر بشكل صحيح.',
    timestamp: '2023-11-22T08:30:00',
    attachments: ['error_report.jpg']
  }]
}, {
  id: 5,
  subject: 'طلب استعادة حساب',
  status: 'قيد المعالجة',
  priority: 'عالي',
  createdAt: '2023-11-21T09:10:00',
  updatedAt: '2023-11-22T10:15:00',
  company: 'مؤسسة العمران للعقارات',
  assignedTo: 'خالد المساعد',
  messages: [{
    id: 14,
    ticketId: 5,
    sender: 'فهد العمران',
    senderRole: 'user',
    senderAvatar: 'https://via.placeholder.com/40/6366F1/FFFFFF?text=F',
    message: 'نرجو المساعدة في استعادة حساب المستخدم "عبدالله السالم" الذي تم إيقافه بالخطأ.',
    timestamp: '2023-11-21T09:10:00'
  }, {
    id: 15,
    ticketId: 5,
    sender: 'خالد المساعد',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=K',
    message: 'شكراً للتواصل معنا. سنقوم بمراجعة الحساب والتحقق من المشكلة.',
    timestamp: '2023-11-21T10:30:00'
  }, {
    id: 16,
    ticketId: 5,
    sender: 'خالد المساعد',
    senderRole: 'support',
    senderAvatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=K',
    message: 'نحتاج إلى بعض المعلومات الإضافية للتحقق من هوية المستخدم. هل يمكنكم تزويدنا برقم الهوية أو البريد الإلكتروني المسجل للمستخدم؟',
    timestamp: '2023-11-22T10:15:00'
  }]
}];
const ManagementDashboard: React.FC = () => {
  const tr = useTr();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTicketFilter, setShowTicketFilter] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [viewingTicket, setViewingTicket] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Get all users from companies
  const allUsers = getAllUsers();
  // Format date time helper
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US');
  };
  // Filtered tickets based on search term
  const filteredTickets = supportTickets.filter(ticket => ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || ticket.company.toLowerCase().includes(searchTerm.toLowerCase()));
  // Filtered companies based on search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.users.some(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filtered users based on search term
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Render the overview tab
  const renderOverviewTab = () => {
    return <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {tr('إجمالي الشركات','Total companies')}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                  {companies.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">+12%</span>
              <span className="text-sm text-gray-500 mr-1">
                {tr('من الشهر الماضي','since last month')}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {tr('إجمالي المستخدمين','Total users')}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                  {allUsers.length}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">+8%</span>
              <span className="text-sm text-gray-500 mr-1">
                {tr('من الشهر الماضي','since last month')}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {tr('إجمالي الاشتراكات','Active subscriptions')}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                  {companies.filter(c => c.status === 'نشط').length}
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">+5%</span>
              <span className="text-sm text-gray-500 mr-1">
                {tr('من الشهر الماضي','since last month')}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {tr('التذاكر المفتوحة','Open tickets')}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                  {supportTickets.filter(t => t.status === 'مفتوح').length}
                </h3>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-red-600 font-medium">+15%</span>
              <span className="text-sm text-gray-500 mr-1">
                {tr('من الشهر الماضي','since last month')}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {tr('أحدث الشركات','Latest companies')}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tr('الشركة','Company')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tr('المستخدمين','Users')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tr('الباقة','Package')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tr('الحالة','Status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.slice(0, 5).map(company => <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {company.logo && <div className="flex-shrink-0 h-10 w-10 ml-3">
                              <img className="h-10 w-10 rounded-full" src={company.logo} alt={company.name} />
                            </div>}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {company.contactEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.users.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.package}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${company.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {company.status}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                {tr('عرض جميع الشركات','View all companies')}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {tr('أحدث التذاكر','Latest tickets')}
            </h3>
            <div className="space-y-4">
              {supportTickets.slice(0, 3).map(ticket => <div key={ticket.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {ticket.subject}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.status === 'مفتوح' ? 'bg-blue-100 text-blue-800' : ticket.status === 'قيد المعالجة' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{ticket.company}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {formatDateTime(ticket.createdAt)}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-xs">
                      {tr('عرض التفاصيل','View details')}
                    </button>
                  </div>
                </div>)}
            </div>
            <div className="mt-4 flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={() => setActiveTab('support')}>
                {tr('عرض جميع التذاكر','View all tickets')}
              </button>
            </div>
          </div>
        </div>
      </div>;
  };
  // Render the companies tab
  const renderCompaniesTab = () => {
    return <div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder="البحث في الشركات والمستخدمين..." className="w-full md:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              onClick={() => setShowModal('addUser')}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة مستخدم
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => setShowModal('addCompany')}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة شركة
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Company Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {company.logo && (
                      <div className="flex-shrink-0 h-12 w-12 ml-4">
                        <img className="h-12 w-12 rounded-full" src={company.logo} alt={company.name} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{company.contactEmail}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{company.users.length} مستخدم</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{company.package}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${company.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {company.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 px-3 py-1 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCompany(company);
                        setShowModal('editCompany');
                      }}
                    >
                      تعديل الشركة
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900 px-3 py-1 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCompany(company);
                        setShowModal('addUserToCompany');
                      }}
                    >
                      إضافة مستخدم
                    </button>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedCompany === company.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Users List */}
              {expandedCompany === company.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      مستخدمو الشركة ({company.users.length})
                    </h4>
                    <div className="space-y-2">
                      {company.users.map(user => (
                        <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {user.avatar && (
                                <div className="flex-shrink-0 h-8 w-8 ml-3">
                                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">{user.role}</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                              <div className="flex space-x-1">
                                <button
                                  className="text-blue-600 hover:text-blue-900 text-sm"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setSelectedCompany(company);
                                    setShowModal('editUser');
                                  }}
                                >
                                  تعديل
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900 text-sm"
                                  onClick={() => {
                                    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
                                      // Handle delete user
                                      console.log('Delete user:', user.id);
                                    }
                                  }}
                                >
                                  حذف
                                </button>
                              </div>
                            </div>
                          </div>
                          {user.permissions && user.permissions.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">الصلاحيات:</div>
                              <div className="flex flex-wrap gap-1">
                                {user.permissions.map((permission, index) => (
                                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                    {permission}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>;
  };

  // Render the packages tab
  const renderPackagesTab = () => {
    return <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">الباقات المتاحة</h3>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => setShowModal('addPackage')}
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة باقة
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map(pkg => <div key={pkg.id} className={`bg-white rounded-lg shadow-sm border ${pkg.popularChoice ? 'border-blue-500' : 'border-gray-200'} overflow-hidden relative`}>
              {pkg.popularChoice && <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium">
                  الأكثر شيوعاً
                </div>}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 mr-1">ر.س / {pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 ml-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>)}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">المستخدمين:</span>
                    <span className="font-medium text-gray-900">
                      {pkg.usersLimit === 999 ? 'غير محدود' : pkg.usersLimit}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">التقارير شهرياً:</span>
                    <span className="font-medium text-gray-900">
                      {pkg.reportsLimit === 999 ? 'غير محدود' : pkg.reportsLimit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">مساحة التخزين:</span>
                    <span className="font-medium text-gray-900">
                      {pkg.storageLimit}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowModal('editPackage');
                      }}
                    >
                      تعديل
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
                          console.log('Delete package:', pkg.id);
                        }
                      }}
                    >
                      حذف
                    </button>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${pkg.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pkg.status}
                  </span>
                </div>
              </div>
            </div>)}
        </div>
      </div>;
  };
  // Render the support tab
  const renderSupportTab = () => {
    // If viewing a specific ticket
    if (viewingTicket !== null) {
      const ticket = supportTickets.find(t => t.id === viewingTicket);
      if (!ticket) {
        return <div className="p-8 text-center">
            <p className="text-gray-500">التذكرة غير موجودة</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => setViewingTicket(null)}>
              العودة إلى قائمة التذاكر
            </button>
          </div>;
      }
      return <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <div className="flex items-center">
                <button className="text-blue-600 hover:text-blue-800 ml-2" onClick={() => setViewingTicket(null)}>
                  <ArrowUpRight className="h-5 w-5 transform rotate-180" />
                </button>
                <h2 className="text-lg font-medium text-gray-900">
                  {ticket.subject}
                </h2>
              </div>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  تذكرة #{ticket.id}
                </span>
                <span className="text-sm text-gray-500">{ticket.company}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.priority === 'عالي' ? 'bg-red-100 text-red-800' : ticket.priority === 'متوسط' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                  {ticket.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.status === 'مفتوح' ? 'bg-blue-100 text-blue-800' : ticket.status === 'قيد المعالجة' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {ticket.status !== 'مغلق' && <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm">
                  <Check className="h-4 w-4 ml-1" />
                  إغلاق التذكرة
                </button>}
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                <Edit className="h-4 w-4 ml-1" />
                تعديل
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  تم إنشاء التذكرة: {formatDateTime(ticket.createdAt)}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500 ml-2">المسؤول:</div>
                {ticket.assignedTo ? <div className="text-sm font-medium text-gray-900">
                    {ticket.assignedTo}
                  </div> : <button className="text-sm text-blue-600 hover:text-blue-800">
                    تعيين مسؤول
                  </button>}
              </div>
            </div>
            {/* Ticket messages */}
            <div className="space-y-6 mb-6 max-h-96 overflow-y-auto p-2">
              {ticket.messages && ticket.messages.map(message => <div key={message.id} className={`flex ${message.senderRole === 'support' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-2xl rounded-lg p-4 ${message.senderRole === 'support' ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className="flex items-center mb-2">
                        {message.senderAvatar && <img src={message.senderAvatar} alt={message.sender} className="h-8 w-8 rounded-full ml-2" />}
                        <div>
                          <div className="font-medium text-gray-900">
                            {message.sender}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDateTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-700">{message.message}</div>
                      {message.attachments && message.attachments.length > 0 && <div className="mt-2 flex flex-wrap gap-2">
                            {message.attachments.map((attachment, index) => <div key={index} className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm flex items-center">
                                <FileText className="h-4 w-4 text-blue-500 ml-1" />
                                {attachment}
                              </div>)}
                          </div>}
                    </div>
                  </div>)}
            </div>
            {/* Reply form */}
            {ticket.status !== 'مغلق' && <div className="border-t border-gray-200 pt-4">
                <div className="mb-2 text-sm font-medium text-gray-700">
                  إضافة رد
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <textarea className="w-full px-3 py-2 focus:outline-none resize-none" rows={4} placeholder="اكتب ردك هنا..." value={newMessage} onChange={e => setNewMessage(e.target.value)}></textarea>
                  <div className="bg-gray-50 p-2 flex justify-between items-center">
                    <div className="flex">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                    <button className={`px-4 py-1 rounded-lg ${newMessage.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} disabled={!newMessage.trim()}>
                      إرسال
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>;
    }
    // Calculate ticket statistics
    const openTickets = supportTickets.filter(t => t.status === 'مفتوح').length;
    const inProgressTickets = supportTickets.filter(t => t.status === 'قيد المعالجة').length;
    const closedTickets = supportTickets.filter(t => t.status === 'مغلق').length;
    const highPriorityTickets = supportTickets.filter(t => t.priority === 'عالي').length;
    const unassignedTickets = supportTickets.filter(t => !t.assignedTo).length;
    const avgResponseTime = '2.5'; // This would be calculated from actual data

    return <div>
        {/* Support Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">إجمالي التذاكر</div>
                <div className="text-2xl font-bold text-gray-900">{supportTickets.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">مفتوحة</div>
                <div className="text-2xl font-bold text-blue-600">{openTickets}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">قيد المعالجة</div>
                <div className="text-2xl font-bold text-amber-600">{inProgressTickets}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">مغلقة</div>
                <div className="text-2xl font-bold text-green-600">{closedTickets}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">أولوية عالية</div>
                <div className="text-2xl font-bold text-red-600">{highPriorityTickets}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="mr-3">
                <div className="text-sm font-medium text-gray-500">غير معينة</div>
                <div className="text-2xl font-bold text-gray-600">{unassignedTickets}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 gap-4">
            <h2 className="text-lg font-medium text-gray-900">
              إدارة تذاكر الدعم
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="البحث في التذاكر..." className="w-full md:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="relative">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50" onClick={() => setShowTicketFilter(!showTicketFilter)}>
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية
                  <ChevronDown className="h-4 w-4 mr-2" />
                </button>
                {showTicketFilter && <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <div className="mb-2 font-medium">الحالة</div>
                        <div className="space-y-1">
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            مفتوح
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            قيد المعالجة
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            مغلق
                          </label>
                        </div>
                      </div>
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <div className="mb-2 font-medium">الأولوية</div>
                        <div className="space-y-1">
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            عالي
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            متوسط
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="ml-2" />
                            منخفض
                          </label>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 mt-2 pt-2 px-4 py-2">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          تطبيق
                        </button>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم التذكرة
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموضوع والوصف
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الشركة والمستخدم
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأولوية
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المسؤول
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإنشاء
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر تحديث
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عدد الردود
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map(ticket => {
                  const firstMessage = ticket.messages && ticket.messages.length > 0 ? ticket.messages[0] : null;
                  const lastMessage = ticket.messages && ticket.messages.length > 0 ? ticket.messages[ticket.messages.length - 1] : null;

                  return <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                        {ticket.messages && ticket.messages.some(m => m.senderRole === 'user' && new Date(m.timestamp) > new Date(Date.now() - 24*60*60*1000)) &&
                          <div className="mr-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" title="رد جديد"></div>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {ticket.subject}
                        </div>
                        {firstMessage && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {firstMessage.message.length > 80 ? firstMessage.message.substring(0, 80) + '...' : firstMessage.message}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {ticket.company}
                      </div>
                      {firstMessage && (
                        <div className="text-xs text-gray-500 mt-1">
                          بواسطة: {firstMessage.sender}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.priority === 'عالي' ? 'bg-red-100 text-red-800' : ticket.priority === 'متوسط' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.status === 'مفتوح' ? 'bg-blue-100 text-blue-800' : ticket.status === 'قيد المعالجة' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {ticket.assignedTo ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-blue-600">
                                {ticket.assignedTo.charAt(0)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-900">{ticket.assignedTo}</div>
                          </div>
                        ) : (
                          <button className="text-sm text-blue-600 hover:text-blue-800 border border-blue-300 px-2 py-1 rounded">
                            تعيين مسؤول
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(ticket.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        منذ {Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24))} يوم
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(ticket.updatedAt)}
                      </div>
                      {lastMessage && (
                        <div className="text-xs text-gray-500">
                          آخر رد: {lastMessage.sender}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="bg-gray-100 rounded-full px-2 py-1 text-sm font-medium text-gray-700">
                          {ticket.messages ? ticket.messages.length : 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium transition-colors"
                          onClick={() => setViewingTicket(ticket.id)}
                        >
                          عرض التفاصيل
                        </button>
                        {ticket.status !== 'مغلق' && (
                          <button className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-2 py-1 rounded text-sm transition-colors">
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                عرض {filteredTickets.length} من أصل {supportTickets.length}{' '}
                تذكرة
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  السابق
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                  1
                </span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support Team Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">أداء فريق الدعم</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">م</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">محمد الدعم</div>
                    <div className="text-xs text-gray-500">مختص دعم فني</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">1 تذكرة</div>
                  <div className="text-xs text-gray-500">متوسط الرد: 1.2 ساعة</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-green-600">أ</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">أحمد المساعد</div>
                    <div className="text-xs text-gray-500">مختص دعم فني</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">1 تذكرة</div>
                  <div className="text-xs text-gray-500">متوسط الرد: 3.5 ساعة</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-purple-600">س</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">سارة الدعم</div>
                    <div className="text-xs text-gray-500">مختص دعم فني</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">1 تذكرة</div>
                  <div className="text-xs text-gray-500">متوسط الرد: 2.1 ساعة</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-orange-600">خ</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">خالد المساعد</div>
                    <div className="text-xs text-gray-500">مختص دعم فني</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">1 تذكرة</div>
                  <div className="text-xs text-gray-500">متوسط الرد: 1.8 ساعة</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إحصائيات الأداء</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">متوسط وقت الاستجابة</span>
                <span className="text-sm font-medium text-gray-900">2.1 ساعة</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">متوسط وقت الحل</span>
                <span className="text-sm font-medium text-gray-900">1.5 يوم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">معدل الرضا</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">التذاكر المحلولة اليوم</span>
                <span className="text-sm font-medium text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">التذاكر المحلولة هذا الأسبوع</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">التذاكر المحلولة هذا الشهر</span>
                <span className="text-sm font-medium text-gray-900">45</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">توزيع التذاكر حسب النوع</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">مشاكل تقنية</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">استفسارات عامة</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">طلبات ترقية</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h1>
        <p className="text-gray-600">إدارة النظام والمستخدمين والتقارير</p>
      </div>
      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('overview')}>
              نظرة عامة
            </button>
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'companies' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('companies')}>
              إدارة الشركات والمستخدمين
            </button>
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'packages' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('packages')}>
              إدارة الباقات
            </button>
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'support' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('support')}>
              الدعم الفني
            </button>
          </nav>
        </div>
        <div className="p-6">
          {/* Render active tab content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'companies' && renderCompaniesTab()}
          {activeTab === 'packages' && renderPackagesTab()}
          {activeTab === 'support' && renderSupportTab()}
        </div>
      </div>

      {/* Add Company Modal */}
      {showModal === 'addCompany' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">إضافة شركة جديدة</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل اسم الشركة"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني للتواصل</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الشخص المسؤول</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل اسم الشخص المسؤول"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الباقة</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">اختر الباقة</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إضافة الشركة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {showModal === 'editCompany' && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تعديل الشركة</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني للتواصل</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.contactEmail}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.contactPhone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الشخص المسؤول</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.contactPerson}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الباقة</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.package}
                >
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedCompany.status}
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                  <option value="معلق">معلق</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
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

      {/* Add User Modal */}
      {showModal === 'addUser' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">إضافة مستخدم جديد</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الشركة</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">اختر الشركة</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>
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
                  <option value="مدير الشركة">مدير الشركة</option>
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
                    <span className="mr-2 text-sm text-gray-700">إدارة المستخدمين</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="mr-2 text-sm text-gray-700">إدارة الاشتراك</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
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

      {/* Add User to Company Modal */}
      {showModal === 'addUserToCompany' && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">إضافة مستخدم إلى {selectedCompany.name}</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
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
                  <option value="مدير الشركة">مدير الشركة</option>
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
                    <span className="mr-2 text-sm text-gray-700">إدارة المستخدمين</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="mr-2 text-sm text-gray-700">إدارة الاشتراك</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
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
      {showModal === 'editUser' && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تعديل المستخدم</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
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
                  <option value="مدير الشركة">مدير الشركة</option>
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
                  <option value="غير نشط">غير نشط</option>
                  <option value="معلق">معلق</option>
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
                      defaultChecked={selectedUser.permissions?.includes('إدارة المستخدمين')}
                    />
                    <span className="mr-2 text-sm text-gray-700">إدارة المستخدمين</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedUser.permissions?.includes('إدارة الاشتراك')}
                    />
                    <span className="mr-2 text-sm text-gray-700">إدارة الاشتراك</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
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

      {/* Add Package Modal */}
      {showModal === 'addPackage' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">إضافة باقة جديدة</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الباقة</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل اسم الباقة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعر (ريال سعودي)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل السعر"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">فترة الاشتراك</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">اختر الفترة</option>
                    <option value="شهري">شهري</option>
                    <option value="ربع سنوي">ربع سنوي</option>
                    <option value="نصف سنوي">نصف سنوي</option>
                    <option value="سنوي">سنوي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد المستخدمين</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="عدد المستخدمين المسموح"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد التقارير</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="عدد التقارير المسموح"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مساحة التخزين</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: 10GB"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الميزات</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل ميزة"
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل ميزة أخرى"
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل ميزة أخرى"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="mr-2 text-sm text-gray-700">الباقة الأكثر شيوعاً</span>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إضافة الباقة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showModal === 'editPackage' && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تعديل الباقة</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الباقة</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعر (ريال سعودي)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.price}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">فترة الاشتراك</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.period}
                  >
                    <option value="شهري">شهري</option>
                    <option value="ربع سنوي">ربع سنوي</option>
                    <option value="نصف سنوي">نصف سنوي</option>
                    <option value="سنوي">سنوي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد المستخدمين</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.usersLimit}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد التقارير</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.reportsLimit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مساحة التخزين</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPackage.storageLimit}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedPackage.status}
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الميزات</label>
                <div className="space-y-2">
                  {selectedPackage.features.map((feature, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={feature}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked={selectedPackage.popularChoice}
                />
                <span className="mr-2 text-sm text-gray-700">الباقة الأكثر شيوعاً</span>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
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
export default ManagementDashboard;