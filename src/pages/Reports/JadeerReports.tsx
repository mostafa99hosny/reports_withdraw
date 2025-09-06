import React, { useState } from 'react';
import { Eye, Edit, Trash2, Send, Printer, FileText, Paperclip, Copy, Clock, CheckCircle, XCircle, Bookmark, Search, History, Image } from 'lucide-react';

// بيانات تجريبية حديثة
const reportsData = [
  // ... 10 تقارير متنوعة ...
  {
    id: 1,
    client: 'بنك الجزيرة',
    model: 'تقرير مختصر - مباني',
    reference: '5516',
    assignment: '2444271',
    assignmentDate: '25-08-2025',
    deed: '6807362259400000',
    piece: '3',
    owner: 'عبدالرحمن بن محمد بن عبدالرحمن العبيد',
    propertyType: 'أرض',
    address: 'الخبر - العقربية',
    contact: '0505825013',
    value: '0.00',
    status: 'المراجعة',
    statusColor: 'bg-purple-100 text-purple-700',
    time: '8 ساعات',
    timer: '04:05:15',
    attachments: 4,
    images: 20,
    lastUpdate: '25-08-2025 07:00 PM - عبدالله عبدالرحمن النهدي',
    inspector: 'عبدالله عبدالرحمن النهدي',
  },
  {
    id: 2,
    client: 'البنك السعودي الفرنسي',
    model: 'تقرير مختصر - مباني',
    reference: '5517',
    assignment: '2025947832',
    assignmentDate: '25-08-2025',
    deed: '530114007404',
    piece: '509',
    owner: 'شركة إثراء الرياض العقارية',
    propertyType: 'فيلا سكنية',
    address: 'الدمام - ضاحية الملك فهد',
    contact: '0556233129',
    value: '564,120.00',
    status: 'المراجعة',
    statusColor: 'bg-purple-100 text-purple-700',
    time: '8 ساعات',
    timer: '04:23:59',
    attachments: 3,
    images: 52,
    lastUpdate: '25-08-2025 06:44 PM - عبدالله عبدالرحمن النهدي',
    inspector: 'عبدالله عبدالرحمن النهدي',
  },
  // ... أضف 8 تقارير أخرى متنوعة بنفس الهيكل ...
  {
    id: 3,
    client: 'عملاء أفراد',
    model: 'تقرير مختصر - مباني',
    reference: '5508',
    assignment: '5508',
    assignmentDate: '21-08-2025',
    deed: '811603002118',
    piece: '3',
    owner: 'موضي بنت ابراهيم بن عبدالعزيز البراهيم',
    propertyType: 'أرض مقام عليها مباني',
    address: 'الدرعية - العمارية',
    contact: '0505844674',
    value: '23,439,826.00',
    status: 'التدقيق',
    statusColor: 'bg-teal-100 text-teal-700',
    time: '4 أيام و 4 ساعات',
    timer: '09:35:37',
    attachments: 2,
    images: 29,
    lastUpdate: '25-08-2025 04:29 PM - عمر الأنصاري',
    inspector: 'عبدالعزيز خالد الخالد',
  },
  {
    id: 4,
    client: 'عملاء أفراد',
    model: 'تقرير مختصر - مباني',
    reference: '5510',
    assignment: '5510',
    assignmentDate: '21-08-2025',
    deed: '311603002117',
    piece: '11',
    owner: 'خالد بن محمد بن عبدالعزيز العنقري',
    propertyType: 'أرض مقام عليها مباني',
    address: 'الدرعية - العمارية',
    contact: '0505844674',
    value: '19,593,461.00',
    status: 'التدقيق',
    statusColor: 'bg-teal-100 text-teal-700',
    time: '4 أيام و 4 ساعات',
    timer: '09:35:43',
    attachments: 2,
    images: 17,
    lastUpdate: '25-08-2025 01:32 PM - عمر الأنصاري',
    inspector: 'عبدالعزيز خالد الخالد',
  },
  {
    id: 5,
    client: 'البنك السعودي الفرنسي',
    model: 'تقرير مختصر - مباني',
    reference: '5496',
    assignment: '2025954435',
    assignmentDate: '19-08-2025',
    deed: '160002714090',
    piece: '64 / 1',
    owner: 'مؤسسة سلطان شارد محسن العتيبي للتطوير والاستثمار العقاري',
    propertyType: 'فيلا سكنية',
    address: 'الخبر - الامواج',
    contact: '0541830033',
    value: '1,554,651.50',
    status: 'معلقة',
    statusColor: 'bg-indigo-100 text-indigo-700',
    time: '6 أيام و 6 ساعات',
    timer: '129:34:26',
    attachments: 4,
    images: 44,
    lastUpdate: '20-08-2025 01:33 PM - عمر الأنصاري',
    inspector: 'احتشام ال هزيم',
  },
  {
    id: 6,
    client: 'البنك السعودي الفرنسي',
    model: 'تقرير مختصر - مباني',
    reference: '5481',
    assignment: '2025950531',
    assignmentDate: '17-08-2025',
    deed: '371411002106',
    piece: 'بدون',
    owner: 'احمد علي عبدالله عسيري',
    propertyType: 'فيلا سكنية',
    address: 'ابها - العلايه',
    contact: '0563907037',
    value: '0.00',
    status: 'معلقة',
    statusColor: 'bg-indigo-100 text-indigo-700',
    time: '8 أيام و 6 ساعات',
    timer: '174:50:04',
    attachments: 2,
    images: 26,
    lastUpdate: '18-08-2025 04:17 PM - عمر الأنصاري',
    inspector: 'عبدالله جبران',
  },
  {
    id: 7,
    client: 'عملاء أفراد',
    model: 'تقرير مختصر - مباني',
    reference: '5509',
    assignment: '5509',
    assignmentDate: '21-08-2025',
    deed: '511607002745',
    piece: '17',
    owner: 'خالد بن محمد بن عبدالعزيز العنقري',
    propertyType: 'أرض مقام عليها مباني',
    address: 'الدرعية - العمارية',
    contact: '0505844674',
    value: '19,318,000.00',
    status: 'التدقيق',
    statusColor: 'bg-teal-100 text-teal-700',
    time: '4 أيام و 4 ساعات',
    timer: '09:35:50',
    attachments: 2,
    images: 34,
    lastUpdate: '25-08-2025 01:32 PM - عمر الأنصاري',
    inspector: 'عبدالعزيز خالد الخالد',
  },
  {
    id: 8,
    client: 'عملاء أفراد',
    model: 'تقرير مختصر - مباني',
    reference: '5515',
    assignment: '-',
    assignmentDate: '25-08-2025',
    deed: '310119023634',
    piece: '40',
    owner: 'موضي عبد المحسن بن سليمان الخرينق',
    propertyType: 'عمارة',
    address: 'الرياض - الشفا',
    contact: '0500005183',
    value: '0.00',
    status: 'المعاينة',
    statusColor: 'bg-blue-100 text-blue-700',
    time: '13 ساعة',
    timer: '13:22:41',
    attachments: 5,
    images: 0,
    lastUpdate: '25-08-2025 09:45 AM - جنادة الأنصاري',
    inspector: 'عبدالعزيز خالد الخالد',
  },
  {
    id: 9,
    client: 'البنك السعودي الفرنسي',
    model: 'تقرير مختصر - مباني',
    reference: '5514',
    assignment: '2025951972',
    assignmentDate: '24-08-2025',
    deed: '411522001248',
    piece: '302',
    owner: 'شركة الراجحي للتطوير المحدودة',
    propertyType: 'فيلا سكنية',
    address: 'الخرج - الهدا',
    contact: '0557809661',
    value: '0.00',
    status: 'المعاينة',
    statusColor: 'bg-blue-100 text-blue-700',
    time: 'يوم و 11 ساعة',
    timer: '35:00:33',
    attachments: 3,
    images: 0,
    lastUpdate: '24-08-2025 12:07 PM - جنادة الأنصاري',
    inspector: 'محمد فهد النويبت',
  },
  {
    id: 10,
    client: 'عملاء أفراد',
    model: 'تقرير مختصر - مباني',
    reference: '5512',
    assignment: '5512',
    assignmentDate: '20-08-2025',
    deed: '210119023634',
    piece: '22',
    owner: 'سارة بنت محمد بن عبدالعزيز',
    propertyType: 'شقة',
    address: 'جدة - الحمراء',
    contact: '0500005184',
    value: '1,000,000.00',
    status: 'جديدة',
    statusColor: 'bg-orange-100 text-orange-700',
    time: '3 ساعات',
    timer: '03:22:41',
    attachments: 1,
    images: 2,
    lastUpdate: '20-08-2025 09:45 AM - جنادة الأنصاري',
    inspector: 'سارة الزهراني',
  },
];

const JadeerReports = () => {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{type: string, report: any} | null>(null);
  const [reports, setReports] = useState(reportsData);
  const [editData, setEditData] = useState<any>(null);

  const handleAction = (type: string, report: any) => {
    if (type === 'edit') {
      setEditData({ ...report });
    }
    setModal({ type, report });
  };

  const handleDelete = (id: number) => {
    setReports(prev => prev.filter(r => r.id !== id));
    setModal(null);
  };

  const handleSend = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'مرسلة', statusColor: 'bg-green-100 text-green-700' } : r));
    setModal(null);
  };

  const handleEditSave = () => {
    setReports(prev => prev.map(r => r.id === editData.id ? { ...editData } : r));
    setModal(null);
    setEditData(null);
  };

  const filteredReports = reports.filter(r =>
    r.client.includes(search) || r.reference.includes(search) || r.owner.includes(search) || r.address.includes(search)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="h-8 w-8 text-purple-600" /> تقارير جدير
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-purple-400 w-64"
            placeholder="الرقم المرجعي، رقم التكليف، اسم العميل..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="bg-purple-600 text-white font-bold rounded-lg px-6 py-2 hover:bg-purple-700 flex items-center gap-2">
            <Search className="h-5 w-5" /> بحث
          </button>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-orange-50 rounded-xl shadow flex flex-col items-center py-6">
          <Clock className="h-8 w-8 text-orange-400 mb-2" />
          <div className="font-bold text-orange-700">جديدة</div>
          <div className="text-xl font-bold text-orange-700">2</div>
        </div>
        <div className="bg-blue-50 rounded-xl shadow flex flex-col items-center py-6">
          <Printer className="h-8 w-8 text-blue-400 mb-2" />
          <div className="font-bold text-blue-700">المعاينة</div>
          <div className="text-xl font-bold text-blue-700">2</div>
        </div>
        <div className="bg-purple-50 rounded-xl shadow flex flex-col items-center py-6">
          <History className="h-8 w-8 text-purple-400 mb-2" />
          <div className="font-bold text-purple-700">المراجعة</div>
          <div className="text-xl font-bold text-purple-700">2</div>
        </div>
        <div className="bg-teal-50 rounded-xl shadow flex flex-col items-center py-6">
          <CheckCircle className="h-8 w-8 text-teal-400 mb-2" />
          <div className="font-bold text-teal-700">التدقيق</div>
          <div className="text-xl font-bold text-teal-700">3</div>
        </div>
        <div className="bg-green-50 rounded-xl shadow flex flex-col items-center py-6">
          <Bookmark className="h-8 w-8 text-green-400 mb-2" />
          <div className="font-bold text-green-700">مرسلة</div>
          <div className="text-xl font-bold text-green-700">29</div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-center font-bold text-gray-700">التكليف</th>
              <th className="px-2 py-3 text-center font-bold text-gray-700">التفاصيل</th>
              <th className="px-2 py-3 text-center font-bold text-gray-700">القيمة</th>
              <th className="px-2 py-3 text-center font-bold text-gray-700">الحالة</th>
              <th className="px-2 py-3 text-center font-bold text-gray-700">الإجراءات</th>
              <th className="px-2 py-3 text-center font-bold text-gray-700">الصور</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500 font-bold">لا توجد تقارير</td>
              </tr>
            ) : (
              filteredReports.map((report, idx) => (
                <tr key={report.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-2 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-purple-700">{report.client}</span>
                      <span className="text-xs text-gray-500">{report.model}</span>
                      <span className="text-xs text-gray-500">الرقم المرجعي: {report.reference}</span>
                      <span className="text-xs text-gray-500">رقم التكليف: {report.assignment}</span>
                      <span className="text-xs text-gray-500">تاريخ التكليف: {report.assignmentDate}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-gray-500">رقم الصك: <span className="font-mono text-gray-700">{report.deed}</span></span>
                      <span className="text-xs text-gray-500">رقم القطعة: {report.piece}</span>
                      <span className="text-xs text-gray-500">اسم العميل: {report.owner}</span>
                      <span className="text-xs text-gray-500">نوع العقار: {report.propertyType}</span>
                      <span className="text-xs text-gray-500">العنوان: {report.address}</span>
                      <span className="text-xs text-gray-500">رقم التواصل: {report.contact}</span>
                      <span className="text-xs text-gray-500">المعاين: {report.inspector}</span>
                      <span className="text-xs text-gray-500">آخر تحديث: {report.lastUpdate}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center font-bold text-green-700">{report.value}</td>
                  <td className="px-2 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.statusColor}`}>{report.status}</span>
                    <div className="text-xs text-gray-500 mt-1">{report.time}</div>
                    <div className="text-xs text-red-600 font-mono">{report.timer}</div>
                  </td>
                  <td className="px-2 py-3 text-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700" title="عرض التقرير" onClick={() => handleAction('view', report)}><Eye className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" title="تعديل" onClick={() => handleAction('edit', report)}><Edit className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700" title="حذف" onClick={() => handleAction('delete', report)}><Trash2 className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700" title="إرسال إلى الهيئة" onClick={() => handleAction('send', report)}><Send className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300" title="تحميل PDF" onClick={() => handleAction('pdf', report)}><FileText className="h-4 w-4" /></button>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center">
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1" title="الصور">
                      <Image className="h-4 w-4" />
                      <span className="ml-1 text-xs font-bold text-blue-700">{report.images}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in border-2 border-purple-200">
            <button className="absolute top-4 left-4 text-gray-500 hover:text-red-600 text-3xl font-bold" onClick={() => { setModal(null); setEditData(null); }}>&times;</button>
            {modal.type === 'view' && (
              <div>
                <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"><Eye className="h-5 w-5" /> عرض التقرير</h3>
                <div className="text-gray-700">تفاصيل التقرير: {modal.report.reference} - {modal.report.owner}</div>
                <div className="mt-4 text-sm text-gray-500">{JSON.stringify(modal.report, null, 2)}</div>
              </div>
            )}
            {modal.type === 'edit' && editData && (
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2"><Edit className="h-5 w-5" /> تعديل التقرير</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">اسم العميل</label>
                  <input className="w-full border rounded px-2 py-1 mb-2" value={editData.owner} onChange={e => setEditData({ ...editData, owner: e.target.value })} />
                  <label className="block text-sm font-bold text-gray-700">القيمة</label>
                  <input className="w-full border rounded px-2 py-1 mb-2" value={editData.value} onChange={e => setEditData({ ...editData, value: e.target.value })} />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 mt-2" onClick={handleEditSave}>حفظ التعديلات</button>
                </div>
              </div>
            )}
            {modal.type === 'delete' && (
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2"><Trash2 className="h-5 w-5" /> حذف التقرير</h3>
                <div className="text-gray-700 mb-4">هل أنت متأكد من حذف التقرير رقم {modal.report.reference}؟</div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700" onClick={() => handleDelete(modal.report.id)}>تأكيد الحذف</button>
              </div>
            )}
            {modal.type === 'send' && (
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2"><Send className="h-5 w-5" /> إرسال التقرير</h3>
                <div className="text-gray-700 mb-4">سيتم إرسال التقرير رقم {modal.report.reference} إلى الهيئة.</div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700" onClick={() => handleSend(modal.report.id)}>تأكيد الإرسال</button>
              </div>
            )}
            {modal.type === 'pdf' && (
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText className="h-5 w-5" /> تحميل PDF</h3>
                <div className="text-gray-700">سيتم تحميل ملف PDF للتقرير رقم {modal.report.reference}.</div>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800" onClick={() => {setModal(null);}}>تحميل</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JadeerReports;
