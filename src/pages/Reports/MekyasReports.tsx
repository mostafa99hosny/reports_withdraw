import React, { useState, useEffect } from 'react';
import { FileText, Upload, Check, AlertTriangle, Search, Filter, Calendar, MapPin, RefreshCw, Loader, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTr, useLanguage } from '../../context/LanguageContext';

// تعريف بيانات التقارير أعلى الملف
const reportData = [
  {
    id: 1,
    reportName: 'كشف العقارات السكنية - الرياض',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '1.6 MB',
    date: '2024/05/15',
    status: 'مكتمل',
    propertyType: 'فيلا سكنية',
    location: 'الرياض',
    referenceNo: '065428',
    area: '500 م²',
    value: '2,500,000',
    priority: 'عالي',
    submittedBy: 'أحمد محمد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 2,
    reportName: 'كشف العقارات التجارية - جدة',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '0.9 MB',
    date: '2024/05/12',
    status: 'مكتمل',
    propertyType: 'مكتب تجاري',
    location: 'جدة',
    referenceNo: '065427',
    area: '300 م²',
    value: '1,800,000',
    priority: 'متوسط',
    submittedBy: 'سارة أحمد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 3,
    reportName: 'كشف العقارات الصناعية - الدمام',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '0.7 MB',
    date: '2024/05/10',
    status: 'مكتمل',
    propertyType: 'مستودع صناعي',
    location: 'الدمام',
    referenceNo: '065426',
    area: '1200 م²',
    value: '3,200,000',
    priority: 'عالي',
    submittedBy: 'محمد علي',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 4,
    reportName: 'كشف العقارات السكنية - الطائف',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '1.2 MB',
    date: '2024/05/08',
    status: 'قيد المراجعة',
    propertyType: 'شقة سكنية',
    location: 'الطائف',
    referenceNo: '065425',
    area: '180 م²',
    value: '850,000',
    priority: 'منخفض',
    submittedBy: 'فاطمة خالد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 5,
    reportName: 'كشف العقارات التجارية - أبها',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '0.8 MB',
    date: '2024/05/05',
    status: 'مكتمل',
    propertyType: 'محل تجاري',
    location: 'أبها',
    referenceNo: '065424',
    area: '120 م²',
    value: '650,000',
    priority: 'متوسط',
    submittedBy: 'عبدالله سعد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 6,
    reportName: 'كشف العقارات السكنية - تبوك',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '0.8 MB',
    date: '2024/05/01',
    status: 'مكتمل',
    propertyType: 'فيلا سكنية',
    location: 'تبوك',
    referenceNo: '065423',
    area: '450 م²',
    value: '2,100,000',
    priority: 'عالي',
    submittedBy: 'نورا حسن',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 7,
    reportName: 'كشف العقارات الاستثمارية - حائل',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '6.3 MB',
    date: '2024/04/28',
    status: 'مكتمل',
    propertyType: 'مجمع استثماري',
    location: 'حائل',
    referenceNo: '065422',
    area: '2500 م²',
    value: '8,500,000',
    priority: 'عالي',
    submittedBy: 'خالد عمر',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 8,
    reportName: 'كشف العقارات الزراعية - القصيم',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '5.2 MB',
    date: '2024/04/25',
    status: 'مكتمل',
    propertyType: 'أرض زراعية',
    location: 'القصيم',
    referenceNo: '065421',
    area: '5000 م²',
    value: '4,200,000',
    priority: 'متوسط',
    submittedBy: 'ريم محمد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 9,
    reportName: 'كشف عقارات سكنية - المدينة',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '1.1 MB',
    date: '2024/05/18',
    status: 'مكتمل',
    propertyType: 'شقة سكنية',
    location: 'المدينة',
    referenceNo: '065429',
    area: '140 م²',
    value: '900,000',
    priority: 'منخفض',
    submittedBy: 'سامي يوسف',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 10,
    reportName: 'كشف عقارات تجارية - مكة',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '2.0 MB',
    date: '2024/05/20',
    status: 'قيد المراجعة',
    propertyType: 'محل تجاري',
    location: 'مكة',
    referenceNo: '065430',
    area: '100 م²',
    value: '700,000',
    priority: 'متوسط',
    submittedBy: 'منى خالد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 11,
    reportName: 'كشف عقارات صناعية - ينبع',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '1.5 MB',
    date: '2024/05/22',
    status: 'مكتمل',
    propertyType: 'مستودع صناعي',
    location: 'ينبع',
    referenceNo: '065431',
    area: '900 م²',
    value: '2,800,000',
    priority: 'عالي',
    submittedBy: 'علي فهد',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 12,
    reportName: 'كشف عقارات زراعية - الجوف',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '3.2 MB',
    date: '2024/05/25',
    status: 'مكتمل',
    propertyType: 'أرض زراعية',
    location: 'الجوف',
    referenceNo: '065432',
    area: '3000 م²',
    value: '2,200,000',
    priority: 'منخفض',
    submittedBy: 'سعيد منصور',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 13,
    reportName: 'كشف عقارات استثمارية - نجران',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '4.5 MB',
    date: '2024/05/28',
    status: 'مكتمل',
    propertyType: 'مجمع استثماري',
    location: 'نجران',
    referenceNo: '065433',
    area: '1800 م²',
    value: '5,500,000',
    priority: 'عالي',
    submittedBy: 'نواف صالح',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 14,
    reportName: 'كشف عقارات سكنية - سكاكا',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '1.3 MB',
    date: '2024/05/30',
    status: 'قيد المراجعة',
    propertyType: 'فيلا سكنية',
    location: 'سكاكا',
    referenceNo: '065434',
    area: '350 م²',
    value: '1,400,000',
    priority: 'متوسط',
    submittedBy: 'هند عبدالعزيز',
    department: 'قسم العقارات',
    quantity: 1
  },
  {
    id: 15,
    reportName: 'كشف عقارات تجارية - جازان',
    reportType: 'PDF',
    source: 'نظام العقارات',
    size: '2.7 MB',
    date: '2024/06/01',
    status: 'مكتمل',
    propertyType: 'مكتب تجاري',
    location: 'جازان',
    referenceNo: '065435',
    area: '220 م²',
    value: '1,200,000',
    priority: 'منخفض',
    submittedBy: 'بدر الحربي',
    department: 'قسم العقارات',
    quantity: 1
  }
];

const MekyasReports: React.FC = () => {
  const tr = useTr();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'automatic' | 'single'>('automatic');
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const [singleSearchFilters, setSingleSearchFilters] = useState({
    referenceNo: '',
    reportName: '',
    location: '',
    propertyType: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const [singleSearchResults, setSingleSearchResults] = useState<any[]>([]);
  const [singleSearchPerformed, setSingleSearchPerformed] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'send' | 'sending' | null>(null);
  const [modalReport, setModalReport] = useState<any>(null);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [sendMessage, setSendMessage] = useState('');

  const [reports, setReports] = useState(reportData);
  const [editForm, setEditForm] = useState<any>(null);

  const [searchFilters, setSearchFilters] = useState({
    reportName: '',
    location: '',
    propertyType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    referenceNo: ''
  });

  const [bulkSendModalOpen, setBulkSendModalOpen] = useState(false);
  const [bulkSendStatus, setBulkSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [bulkSendResults, setBulkSendResults] = useState<any[]>([]);

  const [sendProgress, setSendProgress] = useState(0);
  const [bulkSendProgress, setBulkSendProgress] = useState(0);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const filteredData = reports.filter(report => {
    const basicMatch = searchFilters.referenceNo === '' ||
      (report.reportName?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase()) ||
      (report.source?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase()) ||
      (report.location?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase()) ||
      (report.submittedBy?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase()) ||
      (report.referenceNo?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase());

    const advancedMatch =
      (searchFilters.reportName === '' || (report.reportName?.toLowerCase() || '').includes(searchFilters.reportName.toLowerCase())) &&
      (searchFilters.location === '' || (report.location?.toLowerCase() || '').includes(searchFilters.location.toLowerCase())) &&
      (searchFilters.propertyType === '' || (report.propertyType?.toLowerCase() || '').includes(searchFilters.propertyType.toLowerCase())) &&
      (searchFilters.status === '' || report.status === searchFilters.status) &&
      (searchFilters.referenceNo === '' || (report.referenceNo?.toLowerCase() || '').includes(searchFilters.referenceNo.toLowerCase())) &&
      (searchFilters.dateFrom === '' || new Date(report.date) >= new Date(searchFilters.dateFrom)) &&
      (searchFilters.dateTo === '' || new Date(report.date) <= new Date(searchFilters.dateTo));

    return basicMatch && advancedMatch;
  });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSingleSearch = () => {
    const results = reports.filter(report => {
      return (
        (singleSearchFilters.referenceNo === '' || (report.referenceNo?.toLowerCase() || '').includes(singleSearchFilters.referenceNo.toLowerCase())) &&
        (singleSearchFilters.reportName === '' || (report.reportName?.toLowerCase() || '').includes(singleSearchFilters.reportName.toLowerCase())) &&
        (singleSearchFilters.location === '' || (report.location?.toLowerCase() || '').includes(singleSearchFilters.location.toLowerCase())) &&
        (singleSearchFilters.propertyType === '' || (report.propertyType?.toLowerCase() || '').includes(singleSearchFilters.propertyType.toLowerCase())) &&
        (singleSearchFilters.status === '' || report.status === singleSearchFilters.status) &&
        (singleSearchFilters.dateFrom === '' || new Date(report.date) >= new Date(singleSearchFilters.dateFrom)) &&
        (singleSearchFilters.dateTo === '' || new Date(report.date) <= new Date(singleSearchFilters.dateTo))
      );
    });
    setSingleSearchResults(results);
    setSingleSearchPerformed(true);
  };

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('mekyasAuth');
      if (!authData) {
        navigate('/auth/mekyas');
        return;
      }

      try {
        const auth = JSON.parse(authData);
        const loginTime = new Date(auth.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          localStorage.removeItem('mekyasAuth');
          navigate('/auth/mekyas');
          return;
        }

        const lastUpdate = localStorage.getItem('mekyasLastUpdate');
        if (lastUpdate) {
          setLastUpdateTime(lastUpdate);
        }
      } catch (error) {
        localStorage.removeItem('mekyasAuth');
        navigate('/auth/mekyas');
      }
    };

    checkAuth();
  }, [navigate]);

  const updateReportsFromMekyas = async () => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const now = new Date().toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastUpdateTime(now);
      localStorage.setItem('mekyasLastUpdate', now);
    } catch (error) {
      console.error('Error updating reports:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mekyasAuth');
    localStorage.removeItem('mekyasLastUpdate');
    navigate('/auth/mekyas');
  };

  const handleViewReport = (row: any) => {
    setModalReport(row);
    setModalType('view');
    setModalOpen(true);
  };

  const handleEditReport = (row: any) => {
    setEditForm({ ...row });
    setModalReport(row);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReports(reports.map(r => r.id === editForm.id ? { ...editForm } : r));
    setModalOpen(false);
  };

  const handleDeleteReport = (reportId: number) => {
    setModalReport(reports.find(r => r.id === reportId));
    setModalType('delete');
    setModalOpen(true);
  };

  const confirmDeleteReport = () => {
    setReports(reports.filter(r => r.id !== modalReport.id));
    setModalOpen(false);
    setModalReport(null);
  };

  const handleSendReport = (row: any) => {
    setModalReport(row);
    setModalType('sending');
    setModalOpen(true);
    setSendStatus('sending');
    setSendProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSendProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.1;
        setSendStatus(isSuccess ? 'success' : 'error');
        setSendMessage(isSuccess ? `تم إرسال التقرير بنجاح إلى نظام الهيئة - رقم المرجع: ${row.referenceNo}` : 'فشل في الإرسال - خطأ في الاتصال بنظام الهيئة');
      }
    }, 150);
  };

  const handleBulkDelete = () => {
    setReports(reports.filter((_, idx) => !selectedRows.includes(idx)));
    setSelectedRows([]);
  };

  const handleViewReportSingle = (report: any) => {
    setModalReport(report);
    setModalType('view');
    setModalOpen(true);
  };

  const handleSendReportSingle = (report: any) => {
    setModalReport(report);
    setModalType('sending');
    setModalOpen(true);
    setSendStatus('sending');
    setSendProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSendProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.1;
        setSendStatus(isSuccess ? 'success' : 'error');
        setSendMessage(isSuccess ? `تم إرسال التقرير بنجاح إلى نظام الهيئة - رقم المرجع: ${report.referenceNo}` : 'فشل في الإرسال - خطأ في الاتصال بنظام الهيئة');
      }
    }, 150);
  };

  const handleBulkSend = () => {
    setBulkSendModalOpen(true);
    setBulkSendStatus('sending');
    setBulkSendProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setBulkSendProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const results = selectedRows.map(idx => {
          const report = filteredData[idx];
          const isSuccess = Math.random() > 0.1;
          return {
            ...report,
            status: isSuccess ? 'success' : 'error',
            message: isSuccess ? `تم إرسال التقرير بنجاح - رقم المرجع: ${report.referenceNo}` : 'فشل في الإرسال'
          };
        });
        setBulkSendResults(results);
        setBulkSendStatus('success');
      }
    }, 150);
  };

  const handleResendSingleReport = (report: any, idx: number) => {
    // تحديث حالة الإرسال لهذا التقرير فقط
    setBulkSendResults(results => results.map((r, i) => {
      if (i === idx) {
        return { ...r, status: 'sending', message: 'جاري إعادة الإرسال...' };
      }
      return r;
    }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.2;
        setBulkSendResults(results => results.map((r, i) => {
          if (i === idx) {
            return {
              ...r,
              status: isSuccess ? 'success' : 'error',
              message: isSuccess ? `تم إرسال التقرير بنجاح - رقم المرجع: ${r.referenceNo}` : 'فشل في الإرسال'
            };
          }
          return r;
        }));
      }
    }, 200);
  };

  const columns = [{
    header: tr('الرقم','ID'),
    accessor: 'id',
    render: (value: number) => (
      <span className="font-medium text-gray-900">{value}</span>
    )
  }, {
    header: 'اسم التقرير',
    accessor: 'reportName',
    render: (value: string, row: any) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <div className="mr-3">
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.reportType} • {row.size}</div>
        </div>
      </div>
    )
  }, {
    header: 'المرجع',
    accessor: 'referenceNo',
    render: (value: string) => (
      <span className="text-sm font-mono text-gray-600">{value}</span>
    )
  }, {
    header: 'المقدم من',
    accessor: 'submittedBy',
    render: (value: string, row: any) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{row.department}</div>
      </div>
    )
  }, {
    header: 'نوع العقار',
    accessor: 'propertyType',
    render: (value: string) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {value}
      </span>
    )
  }, {
    header: 'الموقع',
    accessor: 'location',
    render: (value: string) => (
      <div className="flex items-center">
        <MapPin className="h-4 w-4 text-gray-400 ml-1" />
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    )
  }, {
    header: 'المساحة',
    accessor: 'area',
    render: (value: string) => (
      <span className="text-sm font-medium text-gray-900">{value}</span>
    )
  }, {
    header: 'القيمة',
    accessor: 'value',
    render: (value: string) => (
      <div className="text-sm font-medium text-gray-900">
        <span className="text-green-600">{value}</span>
        <span className="text-xs text-gray-500 mr-1">ريال</span>
      </div>
    )
  }, {
    header: 'الأولوية',
    accessor: 'priority',
    render: (value: string) => {
      const colors = {
        'عالي': 'bg-red-100 text-red-800',
        'متوسط': 'bg-yellow-100 text-yellow-800',
        'منخفض': 'bg-green-100 text-green-800'
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
      );
    }
  }, {
    header: 'التاريخ',
    accessor: 'date',
    render: (value: string) => (
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-400 ml-1" />
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    )
  }, {
    header: 'الحالة',
    accessor: 'status',
    render: (value: string) => {
      if (value === 'مكتمل') {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Check className="h-3 w-3 ml-1" />
              {value}
            </span>;
      } else if (value === 'قيد المراجعة') {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <AlertTriangle className="h-3 w-3 ml-1" />
              {value}
            </span>;
      }
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 ml-1" />
            {value}
          </span>;
    }
  }, {
    header: 'الإجراءات',
    accessor: 'actions',
    render: (_: any, row: any) => (
      <div className="flex items-center justify-center gap-2">
        <div className="sm:hidden relative">
          <button className="p-2 rounded-full hover:bg-gray-100" onClick={e => { e.stopPropagation(); handleViewReport(row); }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button className="action-btn action-view px-2 py-1 rounded text-blue-600 hover:bg-blue-50 border border-blue-200 flex items-center gap-1" title="عرض" onClick={() => handleViewReport(row)}>
            <FileText className="h-4 w-4" /> <span className="font-bold">عرض</span>
          </button>
          <button className="action-btn action-edit px-2 py-1 rounded text-yellow-600 hover:bg-yellow-50 border border-yellow-200 flex items-center gap-1" title="تعديل" onClick={() => handleEditReport(row)}>
            <i className="fa fa-edit" /> <span className="font-bold">تعديل</span>
          </button>
          <button className="action-btn action-delete px-2 py-1 rounded text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1" title="حذف" onClick={() => handleDeleteReport(row.id)}>
            <i className="fa fa-trash" /> <span className="font-bold">حذف</span>
          </button>
          <button className="action-btn action-send px-2 py-1 rounded text-green-600 hover:bg-green-50 border border-green-200 flex items-center gap-1" title="إرسال" onClick={() => handleSendReport(row)}>
            <Upload className="h-4 w-4" /> <span className="font-bold">إرسال</span>
          </button>
        </div>
      </div>
    )
  }];

  const handleRowSelect = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'automatic':
        return (
          <div>
            <div className="w-full flex justify-center mb-8 sticky top-0 z-40 bg-white border-b border-gray-200">
              <nav className="flex gap-2">
                <button className={`py-3 px-8 text-center border-b-2 text-lg font-bold rounded-t-lg transition-colors duration-150 ${activeTab === 'automatic' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('automatic')}>
                  سحب تقارير العقارات التلقائي
                </button>
                <button className={`py-3 px-8 text-center border-b-2 text-lg font-bold rounded-t-lg transition-colors duration-150 ${activeTab === 'single' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('single')}>
                  سحب تقرير عقارات واحد
                </button>
              </nav>
            </div>
            {/* نموذج البحث المتقدم أعلى جدول التقارير */}
            <div className="w-full max-w-4xl mx-auto mb-8 p-6 bg-white rounded-xl shadow border border-blue-100">
              <form className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end" onSubmit={e => {e.preventDefault();}}>
                <input
                  type="text"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-2"
                  placeholder="اسم التقرير..."
                  value={searchFilters.reportName}
                  onChange={e => setSearchFilters({ ...searchFilters, reportName: e.target.value })}
                />
                <input
                  type="text"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-2"
                  placeholder="الموقع..."
                  value={searchFilters.location}
                  onChange={e => setSearchFilters({ ...searchFilters, location: e.target.value })}
                />
                <select
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-2 bg-white"
                  value={searchFilters.status}
                  onChange={e => setSearchFilters({ ...searchFilters, status: e.target.value })}
                >
                  <option value="">الحالة...</option>
                  <option value="مكتمل">مكتمل</option>
                  <option value="قيد المراجعة">قيد المراجعة</option>
                  <option value="مرفوض">مرفوض</option>
                </select>
                <input
                  type="text"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-2"
                  placeholder="رقم المرجع..."
                  value={searchFilters.referenceNo}
                  onChange={e => setSearchFilters({ ...searchFilters, referenceNo: e.target.value })}
                />
                <input
                  type="text"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-2"
                  placeholder="نوع العقار..."
                  value={searchFilters.propertyType}
                  onChange={e => setSearchFilters({ ...searchFilters, propertyType: e.target.value })}
                />
                <input
                  type="date"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-1"
                  value={searchFilters.dateFrom}
                  onChange={e => setSearchFilters({ ...searchFilters, dateFrom: e.target.value })}
                />
                <input
                  type="date"
                  className="border border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-150 col-span-1"
                  value={searchFilters.dateTo}
                  onChange={e => setSearchFilters({ ...searchFilters, dateTo: e.target.value })}
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white font-bold rounded-lg px-8 py-3 col-span-2 mt-2 md:mt-0 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg text-lg"
                  onClick={() => {}}
                  title="بحث"
                >
                  <Search className="h-5 w-5" /> بحث
                </button>
              </form>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      سحب تقارير العقارات التلقائي
                    </h3>
                    <p className="text-gray-600">
                      اختر تقارير العقارات التي ترغب في سحبها وإرسالها تلقائياً إلى نظام الهيئة
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={updateReportsFromMekyas}
                      disabled={isUpdating}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        isUpdating
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isUpdating ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin ml-2" />
                          جاري التحديث...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 ml-2" />
                          تحديث من مقياس
                        </>
                      )}
                    </button>
                    {lastUpdateTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        آخر تحديث: {lastUpdateTime}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 font-bold disabled:opacity-50"
                      disabled={selectedRows.length === 0}
                      onClick={handleBulkSend}
                    >
                      <Upload className="inline-block h-5 w-5 mr-2" /> إرسال التقارير المحددة
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 font-bold disabled:opacity-50"
                      disabled={selectedRows.length === 0}
                      onClick={handleBulkDelete}
                    >
                      <i className="fa fa-trash mr-2" /> حذف التقارير المحددة
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[98vw] mx-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 text-sm table-fixed">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 text-center font-bold text-gray-700">تحديد</th>
                      {columns.map((col, idx) => (
                        <th key={idx} className={`px-4 py-3 text-center font-bold text-gray-700 ${[2,3,6,8,9].includes(idx) ? 'hidden sm:table-cell' : ''}`}>{col.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length + 1} className="py-12 text-center text-gray-500 font-bold">لا توجد تقارير</td>
                      </tr>
                    ) : (
                      paginatedData.map((row, idx) => (
                        <tr key={row.id} className={`transition-colors duration-150 ${selectedRows.includes(idx + (currentPage-1)*itemsPerPage) ? 'bg-blue-50 border-blue-200' : (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50')} hover:bg-blue-100`}>
                          <td className="px-4 py-3 text-center">
                            <input type="checkbox" checked={selectedRows.includes(idx + (currentPage-1)*itemsPerPage)} onChange={() => handleRowSelect(idx + (currentPage-1)*itemsPerPage)} className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                          </td>
                          {columns.map((col, colIdx) => (
                            col.accessor === 'actions'
                              ? (
                                <td key={colIdx} className={`px-4 py-3 text-center align-middle ${[2,3,6,8,9].includes(colIdx) ? 'hidden sm:table-cell' : ''}`}>{col.render ? col.render(null, row) : null}</td>
                              )
                              : (
                                <td key={colIdx} className={`px-4 py-3 text-center align-middle ${[2,3,6,8,9].includes(colIdx) ? 'hidden sm:table-cell' : ''}`}>{col.render ? col.render(row[col.accessor], row) : row[col.accessor]}</td>
                              )
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-blue-100 disabled:opacity-50"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >السابق</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={`px-3 py-1 rounded-lg font-bold transition-colors ${currentPage === i+1 ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
                        onClick={() => setCurrentPage(i+1)}
                      >{i+1}</button>
                    ))}
                    <button
                      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-blue-100 disabled:opacity-50"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >التالي</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'single':
        return (
          <div>
            <div className="w-full flex justify-center mb-8 sticky top-0 z-40 bg-white border-b border-gray-200">
              <nav className="flex gap-2">
                <button className={`py-3 px-8 text-center border-b-2 text-lg font-bold rounded-t-lg transition-colors duration-150 ${activeTab === 'automatic' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('automatic')}>
                  سحب تقارير العقارات التلقائي
                </button>
                <button className={`py-3 px-8 text-center border-b-2 text-lg font-bold rounded-t-lg transition-colors duration-150 ${activeTab === 'single' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('single')}>
                  سحب تقرير عقارات واحد
                </button>
              </nav>
            </div>
            <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <FileText className="h-7 w-7" /> سحب تقرير عقارات واحد
              </h2>
              <p className="mb-6 text-gray-600">ابحث عن تقرير عقاري محدد عبر رقم المرجع أو اسم التقرير أو عبر البحث المتقدم، ثم اعرض التفاصيل أو أرسل التقرير مباشرة.</p>
              <form className="flex flex-col gap-4 mb-6" onSubmit={e => {e.preventDefault(); handleSingleSearch();}}>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="رقم المرجع..."
                  value={singleSearchFilters.referenceNo}
                  onChange={e => setSingleSearchFilters({ ...singleSearchFilters, referenceNo: e.target.value })}
                />
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="اسم التقرير..."
                  value={singleSearchFilters.reportName}
                  onChange={e => setSingleSearchFilters({ ...singleSearchFilters, reportName: e.target.value })}
                />
                <button
                  type="button"
                  className="flex items-center gap-2 bg-gray-100 text-blue-700 font-bold rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                >
                  <Filter className="h-5 w-5" /> بحث متقدم
                </button>
                {showAdvancedSearch && (
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <input
                      type="text"
                      className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400"
                      placeholder="الموقع..."
                      value={singleSearchFilters.location}
                      onChange={e => setSingleSearchFilters({ ...singleSearchFilters, location: e.target.value })}
                    />
                    <input
                      type="text"
                      className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400"
                      placeholder="نوع العقار..."
                      value={singleSearchFilters.propertyType}
                      onChange={e => setSingleSearchFilters({ ...singleSearchFilters, propertyType: e.target.value })}
                    />
                    <select
                      className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400"
                      value={singleSearchFilters.status}
                      onChange={e => setSingleSearchFilters({ ...singleSearchFilters, status: e.target.value })}
                    >
                      <option value="">الحالة...</option>
                      <option value="مكتمل">مكتمل</option>
                      <option value="قيد المراجعة">قيد المراجعة</option>
                      <option value="مرفوض">مرفوض</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400 w-1/2"
                        value={singleSearchFilters.dateFrom}
                        onChange={e => setSingleSearchFilters({ ...singleSearchFilters, dateFrom: e.target.value })}
                      />
                      <input
                        type="date"
                        className="border rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400 w-1/2"
                        value={singleSearchFilters.dateTo}
                        onChange={e => setSingleSearchFilters({ ...singleSearchFilters, dateTo: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-5 w-5 inline-block mr-1" /> بحث
                </button>
              </form>
              {singleSearchPerformed && (
                singleSearchResults.length > 0 ? (
                  <div className="space-y-4">
                    {singleSearchResults.map((result, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-lg p-4 mb-2">
                        <div className="font-bold text-gray-700 mb-2">اسم التقرير</div>
                        <div className="text-lg text-blue-900">{result.reportName}</div>
                        <div className="font-bold text-gray-700 mt-2 mb-1">رقم المرجع</div>
                        <div className="text-lg text-gray-900">{result.referenceNo}</div>
                        <div className="font-bold text-gray-700 mt-2 mb-1">الحالة</div>
                        <div className="text-lg text-green-700">{result.status}</div>
                        <div className="flex gap-3 mt-6 justify-end">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700" onClick={() => handleViewReportSingle(result)}>
                            <FileText className="h-5 w-5 inline-block mr-1" /> عرض التفاصيل
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700" onClick={() => handleSendReportSingle(result)}>
                            <Upload className="h-5 w-5 inline-block mr-1" /> إرسال التقرير
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 mt-8">لا يوجد تقرير مطابق للبحث.</div>
                )
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="w-full">{renderActiveTabContent()}
    {modalOpen && modalReport && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 bg-opacity-70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-10 relative animate-fade-in border-2 border-blue-200">
          <button className="absolute top-4 left-4 text-gray-500 hover:text-red-600 text-3xl font-bold" onClick={() => setModalOpen(false)}>
            &times;
          </button>
          {modalType === 'view' && (
            <React.Fragment>
              <h3 className="text-2xl font-extrabold text-blue-700 mb-6 flex items-center gap-3">
                <FileText className="h-7 w-7" /> تفاصيل التقرير العقاري
              </h3>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div><span className="font-bold text-gray-700">اسم التقرير:</span> <span className="text-blue-900">{modalReport.reportName}</span></div>
                <div><span className="font-bold text-gray-700">رقم المرجع:</span> <span className="text-gray-900">{modalReport.referenceNo}</span></div>
                <div><span className="font-bold text-gray-700">الحالة:</span> <span className="text-green-700">{modalReport.status}</span></div>
                <div><span className="font-bold text-gray-700">نوع العقار:</span> <span>{modalReport.propertyType}</span></div>
                <div><span className="font-bold text-gray-700">الموقع:</span> <span>{modalReport.location}</span></div>
                <div><span className="font-bold text-gray-700">المساحة:</span> <span>{modalReport.area}</span></div>
                <div><span className="font-bold text-gray-700">القيمة:</span> <span className="text-green-700">{modalReport.value} ريال</span></div>
                <div><span className="font-bold text-gray-700">الأولوية:</span> <span>{modalReport.priority}</span></div>
                <div><span className="font-bold text-gray-700">المقدم من:</span> <span>{modalReport.submittedBy}</span></div>
                <div><span className="font-bold text-gray-700">القسم:</span> <span>{modalReport.department}</span></div>
              </div>
            </React.Fragment>
          )}
          {modalType === 'edit' && editForm && (
            <>
              <h3 className="text-2xl font-extrabold text-yellow-700 mb-6 flex items-center gap-3">
                <i className="fa fa-edit text-yellow-600 text-2xl" /> تعديل بيانات التقرير
              </h3>
              <form className="grid grid-cols-2 gap-4" onSubmit={handleEditFormSubmit}>
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.reportName} onChange={e => handleEditFormChange('reportName', e.target.value)} placeholder="اسم التقرير" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.referenceNo} onChange={e => handleEditFormChange('referenceNo', e.target.value)} placeholder="رقم المرجع" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.propertyType} onChange={e => handleEditFormChange('propertyType', e.target.value)} placeholder="نوع العقار" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.location} onChange={e => handleEditFormChange('location', e.target.value)} placeholder="الموقع" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.area} onChange={e => handleEditFormChange('area', e.target.value)} placeholder="المساحة" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.value} onChange={e => handleEditFormChange('value', e.target.value)} placeholder="القيمة" />
                <select className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.status} onChange={e => handleEditFormChange('status', e.target.value)}>
                  <option value="مكتمل">مكتمل</option>
                  <option value="قيد المراجعة">قيد المراجعة</option>
                  <option value="مرفوض">مرفوض</option>
                </select>
                <select className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.priority} onChange={e => handleEditFormChange('priority', e.target.value)}>
                  <option value="عالي">عالي</option>
                  <option value="متوسط">متوسط</option>
                  <option value="منخفض">منخفض</option>
                </select>
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.submittedBy} onChange={e => handleEditFormChange('submittedBy', e.target.value)} placeholder="المقدم من" />
                <input type="text" className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400" value={editForm.department} onChange={e => handleEditFormChange('department', e.target.value)} placeholder="القسم" />
                <div className="col-span-2 flex justify-end gap-3 mt-4">
                  <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300" onClick={() => setModalOpen(false)}>إلغاء</button>
                  <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700">حفظ التعديلات</button>
                </div>
              </form>
            </>
          )}
          {modalType === 'delete' && (
            <>
              <h3 className="text-2xl font-extrabold text-red-700 mb-6 flex items-center gap-3">
                <i className="fa fa-trash text-red-600 text-2xl" /> حذف التقرير العقاري
              </h3>
              <div className="mb-6 text-lg text-gray-700">هل أنت متأكد أنك تريد حذف التقرير <span className="font-bold text-blue-900">{modalReport.reportName}</span>؟ لا يمكن التراجع عن هذه العملية.</div>
              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300" onClick={() => setModalOpen(false)}>إلغاء</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700" onClick={confirmDeleteReport}>تأكيد الحذف</button>
              </div>
            </>
          )}
          {modalType === 'sending' && (
            <React.Fragment>
              <h3 className="text-2xl font-extrabold text-green-700 mb-6 flex items-center gap-3">
                <Upload className="h-7 w-7" /> إرسال التقرير إلى نظام الهيئة
              </h3>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="font-bold text-gray-700">اسم التقرير:</div>
                <div className="text-blue-900">{modalReport.reportName}</div>
                <div className="font-bold text-gray-700 mt-2">رقم المرجع:</div>
                <div className="text-gray-900">{modalReport.referenceNo}</div>
              </div>
              {sendStatus === 'sending' && (
                <div className="w-full my-4">
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-blue-500 transition-all duration-150" style={{ width: `${sendProgress}%` }}></div>
                  </div>
                  <div className="text-center text-blue-600 font-bold mt-2">جاري الإرسال... {sendProgress}%</div>
                </div>
              )}
              {sendStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-700 font-bold animate-fade-in">
                  <Check className="h-5 w-5" /> {sendMessage}
                </div>
              )}
              {sendStatus === 'error' && (
                <div className="flex flex-col items-center gap-3 text-red-700 font-bold animate-fade-in">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> {sendMessage}
                  </div>
                  <button
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700"
                    onClick={() => handleSendReportSingle(modalReport)}
                  >
                    إعادة الإرسال
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )}
    {bulkSendModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 bg-opacity-70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-10 relative animate-fade-in border-2 border-blue-200">
          <button className="absolute top-4 left-4 text-gray-500 hover:text-red-600 text-3xl font-bold" onClick={() => setBulkSendModalOpen(false)}>&times;</button>
          <h3 className="text-2xl font-extrabold text-green-700 mb-6 flex items-center gap-3">
            <Upload className="h-7 w-7" /> إرسال التقارير المحددة
          </h3>
          {bulkSendStatus === 'sending' && (
            <div className="w-full my-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-4 bg-blue-500 transition-all duration-150" style={{ width: `${bulkSendProgress}%` }}></div>
              </div>
              <div className="text-center text-blue-600 font-bold mt-2">جاري الإرسال... {bulkSendProgress}%</div>
            </div>
          )}
          {bulkSendStatus === 'success' && (
            <div className="space-y-4">
              {bulkSendResults.map((result, idx) => (
                <div key={idx} className={`p-3 rounded-lg flex items-center gap-3 ${result.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {result.status === 'success' ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                  <span className="font-bold">{result.reportName}</span>
                  <span className="text-xs">{result.message}</span>
                  {result.status === 'error' && (
                    <button
                      className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700"
                      onClick={() => handleResendSingleReport(result, idx)}
                    >
                      إعادة الإرسال
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </div>;
};

export default MekyasReports;