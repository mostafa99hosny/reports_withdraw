import React, { useState } from 'react';
import { Search, FileText, FileSpreadsheet, Check, AlertTriangle, Clock, Upload, Eye, Filter, ChevronDown, Calendar, User, Building, TrendingUp, Activity, CheckCircle, XCircle, AlertCircle, X, Download, MapPin, DollarSign, Users2, Timer, HardDrive, BarChart3 } from 'lucide-react';
import Table from '../../components/Common/Table';
import { useTr, useLanguage } from '../../context/LanguageContext';
const ViewReports: React.FC = () => {
  const tr = useTr();
  const { lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('الكل');
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Enhanced sample data for the reports table
  const reportData = [
    {
      id: 'RPT-2024-001',
      name: 'تقرير تقييم عقار سكني - الرياض',
      type: 'PDF',
      source: 'مقياس',
      size: '2.4 MB',
      createdDate: '2024-01-15T10:30:00',
      uploadedDate: '2024-01-15T10:35:00',
      status: 'مكتمل',
      propertyType: 'سكني',
      location: 'الرياض - حي النرجس',
      propertyId: 'PROP-2024-001',
      evaluationAmount: '850,000',
      requestedBy: 'أحمد محمد الأحمد',
      company: 'شركة المستقبل العقارية',
      processingTime: '5 دقائق',
      recordsCount: 1,
      lastModified: '2024-01-15T10:35:00',
      downloadCount: 3,
      notes: 'تم التقييم بنجاح وفقاً للمعايير المحددة'
    },
    {
      id: 'RPT-2024-002',
      name: 'بيانات عقارات تجارية - جدة',
      type: 'XLSX',
      source: 'مقياس',
      size: '4.8 MB',
      createdDate: '2024-01-14T14:20:00',
      uploadedDate: '2024-01-14T14:25:00',
      status: 'مكتمل',
      propertyType: 'تجاري',
      location: 'جدة - حي الروضة',
      propertyId: 'PROP-2024-002',
      evaluationAmount: '1,250,000',
      requestedBy: 'فاطمة الزهراني',
      company: 'شركة الرياض العقارية',
      processingTime: '8 دقائق',
      recordsCount: 15,
      lastModified: '2024-01-14T14:25:00',
      downloadCount: 7,
      notes: 'تقرير شامل يحتوي على 15 عقار تجاري'
    },
    {
      id: 'RPT-2024-003',
      name: 'تقرير تقييم أرض زراعية - القصيم',
      type: 'PDF',
      source: 'مقياس',
      size: '1.2 MB',
      createdDate: '2024-01-13T09:15:00',
      uploadedDate: '2024-01-13T09:18:00',
      status: 'خطأ في البيانات',
      propertyType: 'زراعي',
      location: 'القصيم - بريدة',
      propertyId: 'PROP-2024-003',
      evaluationAmount: '320,000',
      requestedBy: 'عبدالله السعد',
      company: 'مجموعة الخليج للعقارات',
      processingTime: '12 دقيقة',
      recordsCount: 1,
      lastModified: '2024-01-13T09:18:00',
      downloadCount: 0,
      notes: 'خطأ في إحداثيات الموقع - يتطلب مراجعة'
    },
    {
      id: 'RPT-2024-004',
      name: 'بيانات مجمع سكني - الدمام',
      type: 'XLSX',
      source: 'مقياس',
      size: '15.6 MB',
      createdDate: '2024-01-12T16:45:00',
      uploadedDate: '2024-01-12T16:52:00',
      status: 'قيد المعالجة',
      propertyType: 'سكني',
      location: 'الدمام - حي الشاطئ',
      propertyId: 'PROP-2024-004',
      evaluationAmount: '2,850,000',
      requestedBy: 'سارة الأحمد',
      company: 'عقارات المملكة المتحدة',
      processingTime: '25 دقيقة',
      recordsCount: 45,
      lastModified: '2024-01-12T17:10:00',
      downloadCount: 1,
      notes: 'مجمع سكني كبير يحتوي على 45 وحدة سكنية'
    },
    {
      id: 'RPT-2024-005',
      name: 'تقرير تقييم مبنى إداري - الرياض',
      type: 'PDF',
      source: 'مقياس',
      size: '3.1 MB',
      createdDate: '2024-01-11T11:30:00',
      uploadedDate: '2024-01-11T11:33:00',
      status: 'مكتمل',
      propertyType: 'إداري',
      location: 'الرياض - حي العليا',
      propertyId: 'PROP-2024-005',
      evaluationAmount: '4,200,000',
      requestedBy: 'محمد العلي',
      company: 'مؤسسة العمران للعقارات',
      processingTime: '7 دقائق',
      recordsCount: 1,
      lastModified: '2024-01-11T11:33:00',
      downloadCount: 12,
      notes: 'مبنى إداري حديث في موقع استراتيجي'
    },
    {
      id: 'RPT-2024-006',
      name: 'بيانات عقارات استثمارية - مكة',
      type: 'XLSX',
      source: 'مقياس',
      size: '5.7 MB',
      createdDate: '2024-01-10T13:20:00',
      uploadedDate: '2024-01-10T13:28:00',
      status: 'مكتمل',
      propertyType: 'استثماري',
      location: 'مكة المكرمة - العزيزية',
      propertyId: 'PROP-2024-006',
      evaluationAmount: '1,850,000',
      requestedBy: 'نورا القحطاني',
      company: 'شركة المستقبل العقارية',
      processingTime: '15 دقيقة',
      recordsCount: 8,
      lastModified: '2024-01-10T13:28:00',
      downloadCount: 5,
      notes: 'مجموعة عقارات استثمارية متنوعة'
    },
    {
      id: 'RPT-2024-007',
      name: 'تقرير تقييم فيلا - الطائف',
      type: 'PDF',
      source: 'مقياس',
      size: '2.8 MB',
      createdDate: '2024-01-09T15:45:00',
      uploadedDate: null,
      status: 'فشل في الرفع',
      propertyType: 'سكني',
      location: 'الطائف - حي الشهداء',
      propertyId: 'PROP-2024-007',
      evaluationAmount: '950,000',
      requestedBy: 'خالد الشمري',
      company: 'مجموعة الخليج للعقارات',
      processingTime: '6 دقائق',
      recordsCount: 1,
      lastModified: '2024-01-09T15:51:00',
      downloadCount: 0,
      notes: 'خطأ في الاتصال بالخادم أثناء الرفع'
    },
    {
      id: 'RPT-2024-008',
      name: 'بيانات مشروع سكني - المدينة',
      type: 'XLSX',
      source: 'مقياس',
      size: '8.2 MB',
      createdDate: '2024-01-08T08:30:00',
      uploadedDate: '2024-01-08T08:38:00',
      status: 'مكتمل',
      propertyType: 'سكني',
      location: 'المدينة المنورة - العوالي',
      propertyId: 'PROP-2024-008',
      evaluationAmount: '3,200,000',
      requestedBy: 'ريم الدوسري',
      company: 'مؤسسة العمران للعقارات',
      processingTime: '18 دقيقة',
      recordsCount: 25,
      lastModified: '2024-01-08T08:38:00',
      downloadCount: 9,
      notes: 'مشروع سكني متكامل يضم 25 وحدة سكنية'
    }
  ];
  // Helper functions
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale) + ' ' + date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  };

  const openReportDetails = (report: any) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ أقل من ساعة';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  // Calculate statistics
  const totalReports = reportData.length;
  const completedReports = reportData.filter(r => r.status === 'مكتمل').length;
  const errorReports = reportData.filter(r => r.status.includes('خطأ') || r.status.includes('فشل')).length;
  const processingReports = reportData.filter(r => r.status === 'قيد المعالجة').length;
  const totalSize = reportData.reduce((sum, r) => sum + parseFloat(r.size.replace(' MB', '')), 0);
  const totalDownloads = reportData.reduce((sum, r) => sum + r.downloadCount, 0);
  const totalRecords = reportData.reduce((sum, r) => sum + r.recordsCount, 0);

  // Filter data
  const filteredData = reportData.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'الكل' || report.status === selectedStatus;
    const matchesType = selectedType === 'الكل' || report.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{tr('عرض التقارير','View Reports')}</h1>
        <p className="text-gray-600">{tr('تتبع ومراقبة تقارير العقارات من نظام مقياس','Track and monitor real estate reports from Mekyas')}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mr-4">
              <div className="text-sm font-medium text-gray-500">{tr('إجمالي التقارير','Total reports')}</div>
              <div className="text-2xl font-bold text-gray-900">{totalReports}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mr-4">
              <div className="text-sm font-medium text-gray-500">{tr('مكتملة','Completed')}</div>
              <div className="text-2xl font-bold text-green-600">{completedReports}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="mr-4">
              <div className="text-sm font-medium text-gray-500">{tr('بها أخطاء','With errors')}</div>
              <div className="text-2xl font-bold text-red-600">{errorReports}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mr-4">
              <div className="text-sm font-medium text-gray-500">{tr('قيد المعالجة','Processing')}</div>
              <div className="text-2xl font-bold text-amber-600">{processingReports}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{tr('إجمالي الحجم','Total size')}</div>
              <div className="text-lg font-semibold text-gray-900">{totalSize.toFixed(1)} MB</div>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{tr('إجمالي التحميلات','Total downloads')}</div>
              <div className="text-lg font-semibold text-gray-900">{totalDownloads}</div>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{tr('إجمالي السجلات','Total records')}</div>
              <div className="text-lg font-semibold text-gray-900">{totalRecords}</div>
            </div>
            <Building className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-medium text-gray-900">{tr('تفاصيل التقارير','Report details')}</h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder={tr('البحث في التقارير...','Search reports...')}
                  className="w-full md:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Filter className="h-4 w-4 ml-2" />
                  {tr('تصفية','Filter')}
                  <ChevronDown className="h-4 w-4 mr-2" />
                </button>
                
                {showFilter && (
                  <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <div className="mb-2 font-medium">{tr('الحالة','Status')}</div>
                        <select 
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value="الكل">{tr('جميع الحالات','All statuses')}</option>
                          <option value="مكتمل">{tr('مكتمل','Completed')}</option>
                          <option value="قيد المعالجة">{tr('قيد المعالجة','Processing')}</option>
                          <option value="خطأ في البيانات">{tr('خطأ في البيانات','Data error')}</option>
                          <option value="فشل في الرفع">{tr('فشل في الرفع','Upload failed')}</option>
                        </select>
                      </div>
                      
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <div className="mb-2 font-medium">{tr('نوع الملف','File type')}</div>
                        <select 
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="الكل">{tr('جميع الأنواع','All types')}</option>
                          <option value="PDF">PDF</option>
                          <option value="XLSX">Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم التقرير
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تفاصيل التقرير
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العقار والموقع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المطلوب والشركة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة التقرير
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التوقيت والأداء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإحصائيات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التتبع
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.id}</div>
                    <div className="text-xs text-gray-500">{report.propertyId}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 ml-3">
                        {report.type === 'PDF' ? (
                          <FileText className="h-8 w-8 text-red-500" />
                        ) : (
                          <FileSpreadsheet className="h-8 w-8 text-green-500" />
                        )}
                      </div>
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {report.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {report.type} • {report.size}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {report.notes}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{report.propertyType}</div>
                      <div className="text-xs text-gray-500 mt-1">{report.location}</div>
                      <div className="text-xs text-green-600 font-medium mt-1">
                        {report.evaluationAmount} ريال
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{report.requestedBy}</div>
                      <div className="text-xs text-gray-500 mt-1">{report.company}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-start">
                      {report.status === 'مكتمل' && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
                          <CheckCircle className="h-3 w-3 ml-1" />
                          مكتمل
                        </span>
                      )}
                      {report.status === 'قيد المعالجة' && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 flex items-center">
                          <Clock className="h-3 w-3 ml-1" />
                          قيد المعالجة
                        </span>
                      )}
                      {(report.status.includes('خطأ') || report.status.includes('فشل')) && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center">
                          <XCircle className="h-3 w-3 ml-1" />
                          {report.status}
                        </span>
                      )}
                      
                      {report.uploadedDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          رُفع: {getTimeDifference(report.uploadedDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 ml-1" />
                        {formatDateTime(report.createdDate)}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 ml-1" />
                        معالجة: {report.processingTime}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        آخر تعديل: {getTimeDifference(report.lastModified)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      <div className="bg-blue-100 rounded-full px-2 py-1 text-xs font-medium text-blue-800 mb-1">
                        {report.recordsCount} سجل
                      </div>
                      <div className="bg-green-100 rounded-full px-2 py-1 text-xs font-medium text-green-800">
                        {report.downloadCount} تحميل
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <button 
                        onClick={() => openReportDetails(report)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center"
                      >
                        <Eye className="h-3 w-3 ml-1" />
                        عرض التفاصيل
                      </button>
                      
                      {report.status === 'مكتمل' && (
                        <div className="flex items-center text-xs text-green-600">
                          <CheckCircle className="h-3 w-3 ml-1" />
                          جاهز للتحميل
                        </div>
                      )}
                      
                      {report.status === 'قيد المعالجة' && (
                        <div className="flex items-center text-xs text-amber-600">
                          <Clock className="h-3 w-3 ml-1 animate-spin" />
                          جاري المعالجة
                        </div>
                      )}
                      
                      {(report.status.includes('خطأ') || report.status.includes('فشل')) && (
                        <div className="flex items-center text-xs text-red-600">
                          <AlertCircle className="h-3 w-3 ml-1" />
                          يتطلب مراجعة
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              عرض {filteredData.length} من أصل {reportData.length} تقرير
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

      {/* Report Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full ml-4">
                    {selectedReport.type === 'PDF' ? (
                      <FileText className="h-8 w-8 text-white" />
                    ) : (
                      <FileSpreadsheet className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedReport.name}</h2>
                    <p className="text-blue-100">رقم التقرير: {selectedReport.id}</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status Banner */}
              <div className="mb-6">
                {selectedReport.status === 'مكتمل' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 ml-3" />
                    <div>
                      <div className="font-medium text-green-800">التقرير مكتمل وجاهز</div>
                      <div className="text-sm text-green-600">يمكنك تحميل التقرير الآن</div>
                    </div>
                    <div className="mr-auto">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل التقرير
                      </button>
                    </div>
                  </div>
                )}

                {selectedReport.status === 'قيد المعالجة' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
                    <Clock className="h-6 w-6 text-amber-600 ml-3 animate-spin" />
                    <div>
                      <div className="font-medium text-amber-800">التقرير قيد المعالجة</div>
                      <div className="text-sm text-amber-600">سيكون جاهزاً قريباً</div>
                    </div>
                  </div>
                )}

                {(selectedReport.status.includes('خطأ') || selectedReport.status.includes('فشل')) && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <XCircle className="h-6 w-6 text-red-600 ml-3" />
                    <div>
                      <div className="font-medium text-red-800">{selectedReport.status}</div>
                      <div className="text-sm text-red-600">يتطلب مراجعة من الفريق التقني</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Report Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 ml-2" />
                    معلومات التقرير
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">نوع الملف:</span>
                      <span className="font-medium">{selectedReport.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">حجم الملف:</span>
                      <span className="font-medium">{selectedReport.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المصدر:</span>
                      <span className="font-medium">{selectedReport.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد السجلات:</span>
                      <span className="font-medium">{selectedReport.recordsCount} سجل</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد التحميلات:</span>
                      <span className="font-medium">{selectedReport.downloadCount} مرة</span>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 text-green-600 ml-2" />
                    معلومات العقار
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم العقار:</span>
                      <span className="font-medium">{selectedReport.propertyId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">نوع العقار:</span>
                      <span className="font-medium">{selectedReport.propertyType}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">الموقع:</span>
                      <span className="font-medium text-right">{selectedReport.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">قيمة التقييم:</span>
                      <span className="font-medium text-green-600">{selectedReport.evaluationAmount} ريال</span>
                    </div>
                  </div>
                </div>

                {/* Request Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 text-purple-600 ml-2" />
                    معلومات الطلب
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">المطلوب:</span>
                      <span className="font-medium text-right">{selectedReport.requestedBy}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">الشركة:</span>
                      <span className="font-medium text-right">{selectedReport.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الإنشاء:</span>
                      <span className="font-medium">{formatDateTime(selectedReport.createdDate)}</span>
                    </div>
                    {selectedReport.uploadedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الرفع:</span>
                        <span className="font-medium">{formatDateTime(selectedReport.uploadedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 text-orange-600 ml-2" />
                    معلومات الأداء
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">وقت المعالجة:</span>
                      <span className="font-medium">{selectedReport.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">آخر تعديل:</span>
                      <span className="font-medium">{getTimeDifference(selectedReport.lastModified)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      <span className={`font-medium ${
                        selectedReport.status === 'مكتمل' ? 'text-green-600' :
                        selectedReport.status === 'قيد المعالجة' ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {selectedReport.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {selectedReport.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">ملاحظات:</h4>
                  <p className="text-blue-800">{selectedReport.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                {selectedReport.status === 'مكتمل' && (
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Download className="h-5 w-5 ml-2" />
                    تحميل التقرير
                  </button>
                )}
                
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Eye className="h-5 w-5 ml-2" />
                  معاينة التقرير
                </button>
                
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default ViewReports;