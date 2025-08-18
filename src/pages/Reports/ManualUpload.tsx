import React, { useState } from 'react';
import { Upload, FileText, Check, AlertTriangle, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/Common/ProgressBar';
import { useTr, useLanguage } from '../../context/LanguageContext';

// Define workflow steps
type WorkflowStep = 'upload' | 'verify' | 'send' | 'result';

const ManualUpload: React.FC = () => {
  const tr = useTr();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('upload');
  const [progressStage, setProgressStage] = useState<'withdraw' | 'verify' | 'send'>('withdraw');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<'success' | 'error' | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<{excel: File | null, pdfs: File[]}>({
    excel: null,
    pdfs: []
  });

  const resetWorkflow = () => {
    setCurrentStep('upload');
    setProgressStage('withdraw');
    setProgressPercentage(0);
    setIsProcessing(false);
    setProcessingResult(null);
    setVerificationStatus({});
    setUploadedFiles({excel: null, pdfs: []});
  };

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({...prev, excel: file}));
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB per file
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`الملف ${file.name} يتجاوز الحد المسموح (10 ميجابايت)`);
        return false;
      }
      if (file.type !== 'application/pdf') {
        alert(`الملف ${file.name} ليس ملف PDF صالح`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => ({...prev, pdfs: [...prev.pdfs, ...validFiles]}));
  };

  const removePdf = (index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      pdfs: prev.pdfs.filter((_, i) => i !== index)
    }));
  };

  const startProcess = () => {
    setCurrentStep('verify');
    // Initialize verification status
    const initialStatus: Record<string, boolean> = {
      'excel': true,
      'pdfs': true,
      'data': true
    };
    setVerificationStatus(initialStatus);
  };

  const startSendingProcess = async () => {
    setCurrentStep('send');
    setIsProcessing(true);
    setProgressStage('send');
    setProgressPercentage(0);

    // Simulate sending process
    for (let i = 0; i <= 100; i += 10) {
      setProgressPercentage(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate result
    const success = Math.random() > 0.3; // 70% success rate
    setProcessingResult(success ? 'success' : 'error');
    setCurrentStep('result');
    setIsProcessing(false);
  };

  const cancelProcess = () => {
    setIsProcessing(false);
    setCurrentStep('upload');
  };

  const renderWorkflowSteps = () => {
    const steps = [
      { key: 'upload', label: 'رفع الملفات', icon: Upload },
      { key: 'verify', label: 'التحقق من البيانات', icon: FileText },
      { key: 'send', label: 'الإرسال', icon: Check },
      { key: 'result', label: 'النتيجة', icon: AlertTriangle }
    ];

    const getStepIndex = (step: WorkflowStep) => {
      return steps.findIndex(s => s.key === step);
    };

    const currentStepIndex = getStepIndex(currentStep);

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive ? 'border-blue-500 bg-blue-500 text-white' :
                  isCompleted ? 'border-green-500 bg-green-500 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  <StepIcon className="h-5 w-5" />
                </div>
                <div className="mr-3">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderUploadStep = () => {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            رفع تقرير يدوياً
          </h3>
          <p className="text-gray-600 mb-4">
            قم برفع ملفات تقرير العقارات من جهازك لإرسالها إلى نظام الهيئة
          </p>
          <div className="space-y-4">
            {/* Excel Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-2">
                اسحب ملف Excel أو انقر للتحميل
              </p>
              <p className="text-gray-500 text-sm">
                يجب أن يكون الملف بصيغة XLSX أو XLS
              </p>
              <input 
                type="file" 
                className="hidden" 
                accept=".xlsx,.xls" 
                id="excel-upload"
                onChange={handleExcelUpload}
              />
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                onClick={() => document.getElementById('excel-upload')?.click()}
              >
                اختيار ملف Excel
              </button>
              {uploadedFiles.excel && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  تم رفع: {uploadedFiles.excel.name}
                </div>
              )}
            </div>

            {/* PDF Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-2">
                اسحب ملفات PDF المرتبطة أو انقر للتحميل
              </p>
              <p className="text-gray-500 text-sm">
                يمكنك تحميل عدة ملفات PDF
              </p>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf" 
                multiple 
                id="pdf-upload"
                onChange={handlePdfUpload}
              />
              <button 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" 
                onClick={() => document.getElementById('pdf-upload')?.click()}
              >
                اختيار ملفات PDF
              </button>
              {uploadedFiles.pdfs.length > 0 && (
                <div className="mt-3 space-y-1">
                  {uploadedFiles.pdfs.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                      <span>{file.name}</span>
                      <button 
                        onClick={() => removePdf(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {(uploadedFiles.excel || uploadedFiles.pdfs.length > 0) && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h4 className="font-medium text-gray-500 mb-3">
              الملفات جاهزة للمعالجة
            </h4>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={startProcess}
              >
                متابعة للتحقق من البيانات
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderVerifyStep = () => {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            التحقق من البيانات
          </h3>
          <p className="text-gray-600 mb-4">
            يتم الآن التحقق من صحة البيانات المرفوعة
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">ملف Excel</div>
                <div className="text-sm text-gray-500">تم التحقق من البيانات بنجاح</div>
              </div>
            </div>
            <span className="text-green-600 text-sm font-medium">صحيح</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">ملفات PDF</div>
                <div className="text-sm text-gray-500">تم التحقق من الملفات المرفقة</div>
              </div>
            </div>
            <span className="text-green-600 text-sm font-medium">صحيح</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">تطابق البيانات</div>
                <div className="text-sm text-gray-500">البيانات متطابقة ومتسقة</div>
              </div>
            </div>
            <span className="text-green-600 text-sm font-medium">صحيح</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('upload')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </button>
          <button
            onClick={startSendingProcess}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            بدء الإرسال
          </button>
        </div>
      </div>
    );
  };

  const renderSendStep = () => {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            إرسال التقارير
          </h3>
          <p className="text-gray-600 mb-4">
            يتم الآن إرسال التقارير إلى نظام الهيئة
          </p>
        </div>

        <div className="mb-6">
          <ProgressBar 
            percentage={progressPercentage} 
            stage={progressStage}
            showStageText={true}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={cancelProcess}
            disabled={!isProcessing}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            إلغاء العملية
          </button>
        </div>
      </div>
    );
  };

  const renderResultStep = () => {
    return (
      <div className="text-center">
        {processingResult === 'success' ? (
          <div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              تم الإرسال بنجاح!
            </h3>
            <p className="text-gray-600 mb-6">
              تم إرسال التقارير إلى نظام الهيئة بنجاح
            </p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              فشل في الإرسال
            </h3>
            <p className="text-gray-600 mb-6">
              حدث خطأ أثناء إرسال التقارير. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4 space-x-reverse">
          <button
            onClick={resetWorkflow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            رفع تقرير جديد
          </button>
          <button
            onClick={() => navigate('/reports/view')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            عرض التقارير
          </button>
        </div>
      </div>
    );
  };

  const renderActiveContent = () => {
    switch (currentStep) {
      case 'upload':
        return renderUploadStep();
      case 'verify':
        return renderVerifyStep();
      case 'send':
        return renderSendStep();
      case 'result':
        return renderResultStep();
      default:
        return renderUploadStep();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">رفع تقرير يدوياً</h1>
          <p className="text-gray-600">رفع وإرسال تقارير العقارات يدوياً إلى نظام الهيئة</p>
        </div>
        <button
          onClick={() => navigate('/reports/mekyas')}
          className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          العودة إلى تقارير مقياس
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Show workflow steps */}
          {renderWorkflowSteps()}
          {renderActiveContent()}
        </div>
      </div>
    </div>
  );
};

export default ManualUpload;