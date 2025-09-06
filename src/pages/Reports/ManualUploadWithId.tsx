import React, { useState } from 'react';
import { Upload, Send, RefreshCw, Trash2 } from 'lucide-react';

const ManualUploadWithId: React.FC = () => {
  // Steps: 1) Upload Excel, 2) Report ID, 3) Send Reports
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [reportId, setReportId] = useState('');

  // Reports list for final step
  const [reports, setReports] = useState<{ id: string; status: string }[]>([]);

  const steps = [
    { key: 'uploadExcel', label: 'رفع تقرير Excel' },
    { key: 'reportId', label: 'رقم التقرير' },
    { key: 'sendReports', label: 'ارسال التقارير' }
  ];

  const startOver = () => {
    setStep(1);
    setExcelFile(null);
    setReportId('');
    setReports([]);
  };

  const handleAddReport = () => {
    if (!reportId.trim()) return;
    setReports([{ id: reportId.trim(), status: 'جديد' }]);
    setStep(3);
  };

  const handleSend = (id: string) => {
    setReports(prev => prev.map(r => (r.id === id ? { ...r, status: 'م��سلة' } : r)));
  };

  const handleResend = (id: string) => {
    setReports(prev => prev.map(r => (r.id === id ? { ...r, status: 'تمت إعادة الإرسال' } : r)));
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg" style={{ fontFamily: 'Cairo, Tahoma, Arial' }}>
      {/* Stepper */}
      <div className="w-full flex justify-center items-center mb-10">
        <div className="flex flex-row-reverse gap-6 w-full max-w-3xl">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex-1 flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl transition-all ${idx === step - 1 ? 'bg-blue-700 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-base font-semibold transition-all ${idx === step - 1 ? 'text-blue-800' : 'text-gray-500'}`}>{s.label}</span>
              {idx < steps.length - 1 && (
                <div className={`h-1 w-full mt-2 rounded ${idx < step - 1 ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Upload Excel */}
      {step === 1 && (
        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center text-center bg-white hover:border-blue-400 transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={40} />
            <div className="mb-2 font-semibold text-gray-700">اسحب ملف Excel أو انقر للتحميل</div>
            <div className="mb-4 text-sm text-gray-500">يجب أن يكون الملف بصيغة XLSX أو XLS</div>
            <input
              type="file"
              accept=".xlsx,.xls"
              id="re-excel-upload-with-id"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0] || null;
                setExcelFile(file);
              }}
            />
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all cursor-pointer mt-2" onClick={() => document.getElementById('re-excel-upload-with-id')?.click()}>
              اختيار ملف Excel
            </button>
            {excelFile && (
              <div className="mt-2 text-green-600 text-sm">تم اختيار الملف: {excelFile.name}</div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-2 rounded border border-blue-600 bg-white text-blue-600 font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 disabled:opacity-60"
              type="button"
              onClick={() => setStep(2)}
              disabled={!excelFile}
            >
              متابعة
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Report ID input */}
      {step === 2 && (
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-6 border">
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="re-report-id-input">رقم التقرير</label>
            <input
              id="re-report-id-input"
              type="text"
              className="form-control w-full h-12 text-lg"
              placeholder="أدخل رقم التقرير"
              value={reportId}
              onChange={e => setReportId(e.target.value)}
            />
          </div>
          <div className="flex justify-between md:justify-end gap-4">
            <button
              className="px-6 py-2 rounded border border-gray-400 bg-white text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
              type="button"
              onClick={() => setStep(1)}
            >
              رجوع
            </button>
            <button
              className="px-6 py-2 rounded border border-blue-600 bg-white text-blue-600 font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 disabled:opacity-60"
              type="button"
              onClick={handleAddReport}
              disabled={!reportId.trim()}
            >
              متابعة
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Final - Send Reports */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-700">ارسال تقارير العقارات</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border rounded-xl shadow mb-8 text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 border text-center">رقم التقرير</th>
                  <th className="px-4 py-2 border text-center">الحالة</th>
                  <th className="px-4 py-2 border text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 border text-center text-gray-500">لا توجد تقارير</td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r.id}>
                      <td className="px-4 py-2 border text-center font-mono">{r.id}</td>
                      <td className="px-4 py-2 border text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <div className="flex flex-wrap gap-2 justify-center">
                          <button
                            className="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-green-700 font-bold"
                            type="button"
                            onClick={() => handleSend(r.id)}
                            title="إرسال"
                          >
                            <Send className="h-4 w-4" /> إرسال
                          </button>
                          <button
                            className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-blue-700 font-bold"
                            type="button"
                            onClick={() => handleResend(r.id)}
                            title="إعادة الإرسال"
                          >
                            <RefreshCw className="h-4 w-4" /> إعادة الإرسال
                          </button>
                          <button
                            className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-700 font-bold"
                            type="button"
                            onClick={() => handleDelete(r.id)}
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" /> حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary px-8 py-3 text-lg" type="button" onClick={startOver}>رفع تقرير جديد</button>
          </div>
        </div>
      )}

      <style>{`
        .form-control {
          background: #fff;
          border: 1.5px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 1.06rem;
          transition: border-color 0.2s;
          box-shadow: 0 1px 2px #0001;
        }
        .form-control:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 2px #2563eb22;
        }
        .btn-primary {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: #1d4ed8;
        }
      `}</style>
    </div>
  );
};

export default ManualUploadWithId;
