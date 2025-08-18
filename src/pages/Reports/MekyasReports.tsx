import React, { useState, useEffect } from 'react';
import { FileText, Upload, Check, AlertTriangle, Search, ChevronLeft, ArrowLeft, Filter, Calendar, MapPin, User, FileType, Hash, Building, RefreshCw, Loader, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Common/Table';
import ProgressBar from '../../components/Common/ProgressBar';
import { useTr, useLanguage } from '../../context/LanguageContext';
// Define workflow steps
type WorkflowStep = 'select' | 'verify' | 'send' | 'result';
const MekyasReports: React.FC = () => {
  const tr = useTr();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'automatic' | 'single'>('automatic');
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [progressStage, setProgressStage] = useState<'withdraw' | 'verify' | 'send'>('withdraw');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sendingProgress, setSendingProgress] = useState<Record<number, { progress: number; status: 'sending' | 'success' | 'error'; message?: string }>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('select');
  const [processingResult, setProcessingResult] = useState<'success' | 'error' | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<Record<string, boolean>>({});
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    reportName: '',
    location: '',
    propertyType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    referenceNo: ''
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('mekyasAuth');
      if (!authData) {
        navigate('/auth/mekyas');
        return;
      }

      try {
        const auth = JSON.parse(authData);
        // Check if token is still valid (24 hours)
        const loginTime = new Date(auth.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          localStorage.removeItem('mekyasAuth');
          navigate('/auth/mekyas');
          return;
        }

        // Set last update time from localStorage if exists
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

  // Function to update reports from Mekyas
  const updateReportsFromMekyas = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call to Mekyas to fetch latest reports
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update last update time
      const now = new Date().toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastUpdateTime(now);
      localStorage.setItem('mekyasLastUpdate', now);

      // Here you would normally update the reportData state with new data
      // For demo purposes, we'll just show success

    } catch (error) {
      console.error('Error updating reports:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to logout
  const handleLogout = () => {
    localStorage.removeItem('mekyasAuth');
    localStorage.removeItem('mekyasLastUpdate');
    navigate('/auth/mekyas');
  };

  // Sample data for the table - Real Estate Reports
  const reportData = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }];
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
  }];
  const handleRowSelect = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRows.length === reportData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(reportData.map((_, index) => index));
    }
  };
  const startProcess = () => {
    setCurrentStep('verify');
    // Initialize verification status for all selected reports
    const initialStatus: Record<string, boolean> = {};
    selectedRows.forEach(rowId => {
      initialStatus[rowId] = true;
    });
    setVerificationStatus(initialStatus);
  };
  const startSendingProcess = async () => {
    setCurrentStep('send');
    setIsProcessing(true);
    setSendingProgress({});

    // Start sending reports one by one with slight delays
    const selectedReports = selectedRows.map(index => reportData[index]);

    for (let i = 0; i < selectedReports.length; i++) {
      const reportIndex = selectedRows[i];
      const report = selectedReports[i];

      // Add small delay between starting each report (0.5 seconds)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Start sending this report (don't wait for completion)
      simulateReportSending(reportIndex, report);
    }

    setIsProcessing(false);
  };
  const cancelProcess = () => {
    setIsProcessing(false);
    setCurrentStep('select');
  };
  const resetWorkflow = () => {
    setCurrentStep('select');
    setSelectedRows([]);
    setProcessingResult(null);
    setProgressPercentage(0);
    setIsProcessing(false);
    setSendingProgress({});
  };

  // Simulate sending individual reports to authority system
  const simulateReportSending = async (reportIndex: number, reportData: any) => {
    return new Promise<{ success: boolean; message?: string }>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress between 5-20%

        setSendingProgress(prev => ({
          ...prev,
          [reportIndex]: {
            progress: Math.min(progress, 100),
            status: 'sending'
          }
        }));

        if (progress >= 100) {
          clearInterval(interval);

          // Simulate random success/failure (90% success rate)
          const isSuccess = Math.random() > 0.1;

          setSendingProgress(prev => ({
            ...prev,
            [reportIndex]: {
              progress: 100,
              status: isSuccess ? 'success' : 'error',
              message: isSuccess
                ? `تم إرسال التقرير بنجاح - رقم المرجع: REF-${Date.now().toString().slice(-6)}`
                : 'فشل في الإرسال - خطأ في الاتصال بنظام الهيئة'
            }
          }));

          resolve({
            success: isSuccess,
            message: isSuccess
              ? `تم إرسال التقرير بنجاح`
              : 'فشل في الإرسال'
          });
        }
      }, 200); // Update every 200ms
    });
  };
  const toggleVerificationStatus = (rowId: number) => {
    setVerificationStatus({
      ...verificationStatus,
      [rowId]: !verificationStatus[rowId]
    });
  };
  const filteredData = reportData.filter(report => {
    // Basic search
    const basicMatch = searchTerm === '' ||
      (report.reportName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.source?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.submittedBy?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.referenceNo?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    // Advanced search filters
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

  // Workflow steps component
  const renderWorkflowSteps = () => {
    const steps = [
      { id: 'select', name: 'اختيار التقارير' },
      { id: 'verify', name: 'التحقق من البيانات' },
      { id: 'send', name: 'إرسال التقارير' },
      { id: 'result', name: 'النتيجة' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    return (
      <div className="mb-8">
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                    currentStepIndex === stepIdx
                      ? 'bg-blue-600 text-white shadow-lg'
                      : currentStepIndex > stepIdx
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStepIndex > stepIdx ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <span>{stepIdx + 1}</span>
                    )}
                  </div>
                  <div className="mr-4">
                    <p className={`text-lg font-semibold ${
                      currentStepIndex === stepIdx ? 'text-blue-600' : currentStepIndex > stepIdx ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          currentStepIndex > stepIdx ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                        style={{ width: currentStepIndex > stepIdx ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Advanced search component
  const renderAdvancedSearch = () => {
    if (!showAdvancedSearch) return null;

    return (
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">البحث المتقدم</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم التقرير</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.reportName}
              onChange={(e) => setSearchFilters({...searchFilters, reportName: e.target.value})}
              placeholder="ابحث في اسم التقرير..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.location}
              onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              placeholder="ابحث في الموقع..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع العقار</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.propertyType}
              onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
              placeholder="ابحث في نوع العقار..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.status}
              onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
            >
              <option value="">جميع الحالات</option>
              <option value="مكتمل">مكتمل</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.dateFrom}
              onChange={(e) => setSearchFilters({...searchFilters, dateFrom: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.dateTo}
              onChange={(e) => setSearchFilters({...searchFilters, dateTo: e.target.value})}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setSearchFilters({
              reportName: '',
              location: '',
              propertyType: '',
              status: '',
              dateFrom: '',
              dateTo: '',
              referenceNo: ''
            })}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            مسح الفلاتر
          </button>
        </div>
      </div>
    );
  };

  const renderSelectStep = () => {
    return <div>
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

          {/* Search Section */}
          <div className="mb-4 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في التقارير..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                  showAdvancedSearch
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4" />
                بحث متقدم
              </button>
            </div>

            {renderAdvancedSearch()}
          </div>

          <Table columns={columns} data={filteredData} selectable={true} selectedRows={selectedRows} onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} />
        </div>

        {/* Continue Button - Always visible but disabled when no selection */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          {selectedRows.length > 0 ? (
            <h4 className="font-medium text-gray-900 mb-3">
              تم اختيار {selectedRows.length} تقارير
            </h4>
          ) : (
            <h4 className="font-medium text-gray-500 mb-3">
              لم يتم اختيار أي تقارير
            </h4>
          )}
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRows.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={startProcess}
              disabled={selectedRows.length === 0}
            >
              متابعة للتحقق من البيانات
            </button>
          </div>
        </div>
      </div>;
  };
  const renderVerifyStep = () => {
    return <div>
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentStep('select')} className="flex items-center text-blue-600 hover:text-blue-800 ml-4">
            <ChevronLeft className="h-5 w-5 ml-1" />
            <span>العودة للاختيار</span>
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            التحقق من بيانات التقارير
          </h3>
        </div>
        <div className="space-y-6 mb-6">
          {selectedRows.map(rowIndex => {
          const report = reportData[rowIndex];
          return <div key={rowIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-lg text-gray-900">
                      {report.reportName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {report.referenceNo}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-2 text-sm ${verificationStatus[rowIndex] ? 'text-green-600' : 'text-red-600'}`}>
                      {verificationStatus[rowIndex] ? 'تم التحقق' : 'لم يتم التحقق'}
                    </span>
                    <div className="relative inline-block w-10 ml-2 align-middle select-none">
                      <input type="checkbox" id={`verification-${rowIndex}`} className="sr-only" checked={verificationStatus[rowIndex]} onChange={() => toggleVerificationStatus(rowIndex)} />
                      <label htmlFor={`verification-${rowIndex}`} className={`block overflow-hidden h-6 rounded-full cursor-pointer ${verificationStatus[rowIndex] ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <span className={`absolute block h-5 w-5 rounded-full bg-white border border-gray-300 top-0.5 transition-transform duration-200 ease-in-out ${verificationStatus[rowIndex] ? 'right-0.5 transform -translate-x-0' : 'right-7'}`}></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">المصدر:</span>
                      <span className="text-sm font-medium">
                        {report.source}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">نوع العقار:</span>
                      <span className="text-sm font-medium">
                        {report.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">الموقع:</span>
                      <span className="text-sm font-medium">
                        {report.location}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">الكمية:</span>
                      <span className="text-sm font-medium">
                        {report.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">الحالة:</span>
                      <span className="text-sm font-medium">
                        {report.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">التاريخ:</span>
                      <span className="text-sm font-medium">{report.date}</span>
                    </div>
                  </div>
                </div>
                {!verificationStatus[rowIndex] && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">
                      يرجى التحقق من بيانات هذا التقرير قبل المتابعة
                    </p>
                  </div>}
              </div>;
        })}
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ml-3" onClick={() => setCurrentStep('select')}>
            العودة
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={startSendingProcess} disabled={Object.values(verificationStatus).some(status => !status)}>
            بدء عملية الإرسال
          </button>
        </div>
      </div>;
  };
  const renderSendStep = () => {
    const selectedReports = selectedRows.map(index => reportData[index]);

    return <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          إرسال التقارير إلى نظام الهيئة
        </h3>

        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-6">
              جاري إرسال {selectedReports.length} تقرير إلى نظام الهيئة. يرجى الانتظار حتى اكتمال العملية.
            </p>

            {/* Individual Report Progress */}
            <div className="space-y-4">
              {selectedReports.map((report, index) => {
                const reportIndex = selectedRows[index];
                const progress = sendingProgress[reportIndex];

                return (
                  <div key={reportIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 ml-2" />
                        <div>
                          <h4 className="font-medium text-gray-900">{report.reportName}</h4>
                          <p className="text-sm text-gray-600">رقم المرجع: {report.referenceNo}</p>
                        </div>
                      </div>

                      {/* Status Icon */}
                      <div className="flex items-center">
                        {!progress && (
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-500">{index + 1}</span>
                          </div>
                        )}
                        {progress?.status === 'sending' && (
                          <div className="w-6 h-6">
                            <Loader className="h-6 w-6 text-blue-600 animate-spin" />
                          </div>
                        )}
                        {progress?.status === 'success' && (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                        {progress?.status === 'error' && (
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>
                          {!progress && 'في الانتظار...'}
                          {progress?.status === 'sending' && 'جاري الإرسال...'}
                          {progress?.status === 'success' && 'تم الإرسال بنجاح'}
                          {progress?.status === 'error' && 'فشل في الإرسال'}
                        </span>
                        <span>{progress?.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            progress?.status === 'success' ? 'bg-green-500' :
                            progress?.status === 'error' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${progress?.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Message */}
                    {progress?.message && (
                      <div className={`text-sm p-2 rounded ${
                        progress.status === 'success'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {progress.message}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Overall Status */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse ml-2"></div>
                <p className="text-sm text-blue-700">
                  {Object.keys(sendingProgress).length === 0 && 'استعداد لبدء الإرسال...'}
                  {Object.keys(sendingProgress).length > 0 && Object.keys(sendingProgress).length < selectedReports.length &&
                    `جاري إرسال التقرير ${Object.keys(sendingProgress).length} من ${selectedReports.length}`}
                  {Object.keys(sendingProgress).length === selectedReports.length &&
                    Object.values(sendingProgress).every(p => p.status !== 'sending') &&
                    'اكتملت عملية الإرسال'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              onClick={cancelProcess}
              disabled={Object.values(sendingProgress).some(p => p.status === 'sending')}
            >
              إلغاء العملية
            </button>

            {Object.keys(sendingProgress).length === selectedReports.length &&
             Object.values(sendingProgress).every(p => p.status !== 'sending') && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCurrentStep('result')}
              >
                عرض النتائج
              </button>
            )}
          </div>
        </div>
      </div>;
  };
  const renderResultStep = () => {
    const selectedReports = selectedRows.map(index => reportData[index]);
    const successCount = Object.values(sendingProgress).filter(p => p.status === 'success').length;
    const errorCount = Object.values(sendingProgress).filter(p => p.status === 'error').length;
    const totalCount = selectedReports.length;

    return <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          نتائج إرسال التقارير
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full ml-3">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي التقارير</p>
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full ml-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">نجح الإرسال</p>
                <p className="text-2xl font-bold text-green-600">{successCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full ml-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">فشل الإرسال</p>
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className={`bg-white p-6 rounded-lg border mb-6 ${
          errorCount === 0 ? 'border-green-200' : errorCount === totalCount ? 'border-red-200' : 'border-yellow-200'
        }`}>
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              errorCount === 0 ? 'bg-green-100' : errorCount === totalCount ? 'bg-red-100' : 'bg-yellow-100'
            }`}>
              {errorCount === 0 ? (
                <Check className="h-8 w-8 text-green-600" />
              ) : errorCount === totalCount ? (
                <AlertTriangle className="h-8 w-8 text-red-600" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              )}
            </div>

            <h4 className="text-xl font-medium mb-2">
              {errorCount === 0 ? 'تمت العملية بنجاح' :
               errorCount === totalCount ? 'فشلت العملية' :
               'اكتملت العملية جزئياً'}
            </h4>

            <p className="text-gray-600 mb-4">
              {errorCount === 0 ? `تم إرسال جميع التقارير (${successCount}) بنجاح إلى نظام الهيئة` :
               errorCount === totalCount ? 'فشل في إرسال جميع التقارير، يرجى المحاولة مرة أخرى' :
               `تم إرسال ${successCount} تقرير بنجاح، وفشل إرسال ${errorCount} تقرير`}
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-lg font-medium text-gray-900">تفاصيل النتائج</h4>
          </div>

          <div className="divide-y divide-gray-200">
            {selectedReports.map((report, index) => {
              const reportIndex = selectedRows[index];
              const progress = sendingProgress[reportIndex];

              return (
                <div key={reportIndex} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-3 ${
                        progress?.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {progress?.status === 'success' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900">{report.reportName}</h5>
                        <p className="text-sm text-gray-600">رقم المرجع: {report.referenceNo}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        progress?.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {progress?.status === 'success' ? 'تم الإرسال' : 'فشل الإرسال'}
                      </span>
                    </div>
                  </div>

                  {progress?.message && (
                    <div className={`mt-2 p-2 rounded text-sm ${
                      progress.status === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {progress.message}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 space-x-reverse">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={resetWorkflow}
          >
            إرسال تقارير جديدة
          </button>

          {errorCount > 0 && (
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                // Reset only failed reports for retry
                const failedIndexes = selectedRows.filter(index =>
                  sendingProgress[index]?.status === 'error'
                );
                setSelectedRows(failedIndexes);
                setSendingProgress({});
                setCurrentStep('verify');
              }}
            >
              إعادة إرسال التقارير الفاشلة ({errorCount})
            </button>
          )}
        </div>
      </div>;
  };
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'automatic':
        switch (currentStep) {
          case 'select':
            return renderSelectStep();
          case 'verify':
            return renderVerifyStep();
          case 'send':
            return renderSendStep();
          case 'result':
            return renderResultStep();
          default:
            return renderSelectStep();
        }
      case 'single':
        switch (currentStep) {
          case 'select':
            return <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    سحب تقرير عقارات واحد
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ابحث عن تقرير عقارات محدد وقم بسحبه وإرساله إلى نظام الهيئة
                  </p>

                  {/* Single Report Search Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">البحث عن التقرير</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Search className="h-4 w-4 inline ml-1" />
                          رقم المرجع
                        </label>
                        <input
                          type="text"
                          placeholder="أدخل رقم المرجع (مثال: 065428)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchFilters.referenceNo}
                          onChange={(e) => setSearchFilters({...searchFilters, referenceNo: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="h-4 w-4 inline ml-1" />
                          اسم التقرير
                        </label>
                        <input
                          type="text"
                          placeholder="أدخل اسم التقرير أو جزء منه"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchFilters.reportName}
                          onChange={(e) => setSearchFilters({...searchFilters, reportName: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline ml-1" />
                          الموقع
                        </label>
                        <input
                          type="text"
                          placeholder="أدخل اسم المدينة أو المنطقة"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchFilters.location}
                          onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building className="h-4 w-4 inline ml-1" />
                          نوع العقار
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchFilters.propertyType}
                          onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                        >
                          <option value="">جميع الأنواع</option>
                          <option value="فيلا سكنية">فيلا سكنية</option>
                          <option value="مكتب تجاري">مكتب تجاري</option>
                          <option value="مستودع صناعي">مستودع صناعي</option>
                          <option value="شقة سكنية">شقة سكنية</option>
                          <option value="محل تجاري">محل تجاري</option>
                          <option value="مجمع استثماري">مجمع استثماري</option>
                          <option value="أرض زراعية">أرض زراعية</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={() => {
                          // Simulate search and select the first matching report
                          const matchingReport = filteredData[0];
                          if (matchingReport) {
                            setSelectedRows([0]);
                          }
                        }}
                      >
                        <Search className="h-5 w-5 inline ml-2" />
                        البحث عن التقرير
                      </button>
                      <button
                        onClick={() => setSearchFilters({
                          reportName: '',
                          location: '',
                          propertyType: '',
                          status: '',
                          dateFrom: '',
                          dateTo: '',
                          referenceNo: ''
                        })}
                        className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        مسح الحقول
                      </button>
                    </div>
                  </div>

                  {/* Search Results */}
                  {filteredData.length > 0 && (searchFilters.referenceNo || searchFilters.reportName || searchFilters.location || searchFilters.propertyType) && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">نتائج البحث</h4>
                      <div className="space-y-3">
                        {filteredData.slice(0, 3).map((report, index) => (
                          <div
                            key={report.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedRows.includes(index)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedRows([index])}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <FileText className="h-5 w-5 text-blue-600 ml-2" />
                                  <h5 className="font-medium text-gray-900">{report.reportName}</h5>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">المرجع:</span> {report.referenceNo}
                                  </div>
                                  <div>
                                    <span className="font-medium">الموقع:</span> {report.location}
                                  </div>
                                  <div>
                                    <span className="font-medium">النوع:</span> {report.propertyType}
                                  </div>
                                  <div>
                                    <span className="font-medium">التاريخ:</span> {report.date}
                                  </div>
                                </div>
                              </div>
                              <div className="mr-4">
                                {selectedRows.includes(index) ? (
                                  <div className="flex items-center text-blue-600">
                                    <Check className="h-5 w-5 ml-1" />
                                    <span className="text-sm font-medium">محدد</span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-500">انقر للتحديد</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {filteredData.length > 3 && (
                        <p className="text-sm text-gray-500 mt-3 text-center">
                          وجد {filteredData.length} تقرير، يتم عرض أول 3 نتائج
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                  <h4 className="font-medium text-gray-500 mb-3">
                    {selectedRows.length > 0 ? `تم اختيار التقرير للسحب` : 'ابحث عن التقرير وحدده للمتابعة'}
                  </h4>
                  <div className="flex justify-end">
                    <button
                      className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                        selectedRows.length > 0
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={selectedRows.length === 0}
                      onClick={startProcess}
                    >
                      {selectedRows.length > 0 ? 'سحب التقرير والمتابعة' : 'حدد تقرير للمتابعة'}
                    </button>
                  </div>
                </div>
              </div>;
          case 'verify':
            return renderVerifyStep();
          case 'send':
            return renderSendStep();
          case 'result':
            return renderResultStep();
          default:
            return renderSelectStep();
        }

    }
  };
  return <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تقارير العقارات</h1>
          <p className="text-gray-600">إدارة سحب وإرسال تقارير نظام العقارات</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-4 w-4 ml-2" />
          تسجيل الخروج
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${activeTab === 'automatic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('automatic')}>
              سحب تقارير العقارات التلقائي
            </button>
            <button className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${activeTab === 'single' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('single')}>
              سحب تقرير عقارات واحد
            </button>
          </nav>
        </div>
        <div className="p-6">
          {/* Show workflow steps for all tabs */}
          {renderWorkflowSteps()}
          {renderActiveTabContent()}
        </div>
      </div>
    </div>;
};
export default MekyasReports;