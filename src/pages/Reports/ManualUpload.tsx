import React, { useState } from 'react';
import { Upload, Check, AlertTriangle } from 'lucide-react';

const ManualUpload: React.FC = () => {
  // Main report fields
  const [form, setForm] = useState({
    title: '',
    purpose_id: '',
    value_premise_id: '',
    report_type: 'Complete',
    valued_at: '',
    submitted_at: '',
    assumptions: '',
    special_assumptions: '',
    value: '',
    currency_id: '1',
    excel_file: null as File | null,
    pdf_file: null as File | null,
    report_number: '',
  });

  // Step state
  const [step, setStep] = useState(1);

  // State for clients, users, valuers, hasUser
  const [clients, setClients] = useState([{ name: '', telephone: '', email: '' }]);
  const [users, setUsers] = useState([{ name: '' }]);
  const [valuers, setValuers] = useState([{ id: '', contribution: '100' }]);
  const [hasUser, setHasUser] = useState(false);

  // Result status column
  const [resultStatus, setResultStatus] = useState<'جديد' | 'مكتمل جزئي' | ' مكتمل'>('جديد');

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm(f => ({ ...f, [name]: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const addClient = () => setClients(cs => [...cs, { name: '', telephone: '', email: '' }]);
  const removeClient = () => setClients(cs => cs.length > 1 ? cs.slice(0, -1) : cs);
  const handleClientChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClients(cs => cs.map((c, idx) => idx === i ? { ...c, [name.split('[')[2].replace(']', '')]: value } : c));
  };

  const addUser = () => setUsers(us => [...us, { name: '' }]);
  const removeUser = () => setUsers(us => us.length > 1 ? us.slice(0, -1) : us);
  const handleUserChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setUsers(us => us.map((u, idx) => idx === i ? { ...u, name: e.target.value } : u));
  };

  const addValuer = () => setValuers(vs => [...vs, { id: '', contribution: '100' }]);
  const removeValuer = () => setValuers(vs => vs.length > 1 ? vs.slice(0, -1) : vs);
  const handleValuerChange = (i: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValuers(vs => vs.map((v, idx) => idx === i ? { ...v, [name.split('[')[2].replace(']', '')]: value } : v));
  };

  // Stepper component for upload steps (Reordered and simplified)
  const steps = [
    { key: 'reportDetails', label: 'بيانات التقرير' },
    { key: 'uploadExcel', label: 'رفع تقرير Excel' },
    { key: 'result', label: 'نتيجة ارسال التقارير' },
  ];
  const currentStepIndex = step - 1;

  // State for modals and edit/send logic
  const [showSendModal, setShowSendModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(form);

  // State for progress
  const [sendProgress, setSendProgress] = useState(0);

  // إرسال التقرير
  const handleSendReport = () => {
    setSendStatus('sending');
    setSendProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSendProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.2;
        setSendStatus(isSuccess ? 'success' : 'error');
        if (isSuccess) {
          setTimeout(() => {
            setShowSendModal(false);
            setSendStatus(null);
            setSendProgress(0);
          }, 1200);
        }
      }
    }, 150);
  };

  // حفظ التعديلات
  const handleSaveEdit = () => {
    setForm(editForm);
    setShowEditModal(false);
  };

  return (
    <form className="max-w-[1600px] mx-auto p-8 bg-white rounded-2xl shadow-lg" method="POST" encType="multipart/form-data" style={{ fontFamily: 'Cairo, Tahoma, Arial', fontSize: '1.08rem' }}>
      {/* Stepper Bar */}
      <div className="w-full flex justify-center items-center mb-10">
        <div className="flex flex-row-reverse gap-6 w-full max-w-4xl">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex-1 flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl transition-all
                ${idx === currentStepIndex ? 'bg-blue-700 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}
              `}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-base font-semibold transition-all ${idx === currentStepIndex ? 'text-blue-800' : 'text-gray-500'}`}>{s.label}</span>
              {idx < steps.length - 1 && (
                <div className={`h-1 w-full mt-2 rounded ${idx < currentStepIndex ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Report Details */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">تقرير جديد</h2>
          <h3 className="text-xl font-semibold mb-4 text-blue-800">معلومات التقرير</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">عنوان التقرير *</label>
              <input className="form-control w-full h-12 text-lg" type="text" name="title" value={form.title} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">الغرض من التقييم *</label>
              <select className="form-control w-full h-12 text-lg" name="purpose_id" value={form.purpose_id} onChange={handleChange}>
                <option value="">تحديد</option>
                <option value="1">البيع</option>
                <option value="2">الشراء</option>
                <option value="5">تقدير القيمة الإيجاري��</option>
                <option value="6">التأمين</option>
                <option value="8">أغراض محاسبية</option>
                <option value="9">التمويل</option>
                <option value="10">النزاعات والتقاضي</option>
                <option value="12">الضرائب</option>
                <option value="14">أخرى</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">فرضية القيمة*</label>
              <select className="form-control w-full h-12 text-lg" name="value_premise_id" value={form.value_premise_id} onChange={handleChange}>
                <option value="">تحديد</option>
                <option value="1">الاستخدام الأعلى والأفضل</option>
                <option value="2">الاستخدام الحالي</option>
                <option value="3">التصفية المنظمة</option>
                <option value="4">البيع القسري</option>
                <option value="5">أخرى</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block mb-2 font-semibold text-gray-700">نوع التقرير *</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="form-check-input" id="report-type-complete" name="report_type" type="radio" value="Complete" checked={form.report_type === 'Complete'} onChange={handleChange} />
                  <span>تقرير مفصل</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="form-check-input" id="report-type-2" name="report_type" type="radio" value="Summary" checked={form.report_type === 'Summary'} onChange={handleChange} />
                  <span>ملخص التقرير</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="form-check-input" id="report-type-3" name="report_type" type="radio" value="Review with Opinion" checked={form.report_type === 'Review with Opinion'} onChange={handleChange} />
                  <span>مراجعة مع قيمة جديدة</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="form-check-input" id="report-type-4" name="report_type" type="radio" value="Review without Opinion" checked={form.report_type === 'Review without Opinion'} onChange={handleChange} />
                  <span>مراجعة بدون قيمة جديدة</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">تاريخ التقييم *</label>
              <input className="form-control w-full h-12 text-lg" name="valued_at" type="date" value={form.valued_at} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">تاريخ إصدار التقرير *</label>
              <input className="form-control w-full h-12 text-lg" name="submitted_at" type="date" value={form.submitted_at} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">الافتراضات</label>
              <input className="form-control w-full h-12 text-lg" name="assumptions" type="text" value={form.assumptions} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">الافتراضات الخاصة</label>
              <input className="form-control w-full h-12 text-lg" name="special_assumptions" type="text" value={form.special_assumptions} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">الرأي النهائي في القيمة *</label>
              <input className="form-control w-full h-12 text-lg" name="value" type="text" value={form.value} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">عملة التقييم *</label>
              <select className="form-control w-full h-12 text-lg" name="currency_id" value={form.currency_id} onChange={handleChange}>
                <option value="">تحديد</option>
                <option value="1">ريال سعودي</option>
                <option value="2">دولار أمريكي</option>
                <option value="3">درهم إماراتي</option>
                <option value="4">يورو</option>
                <option value="5">جنيه إسترليني</option>
                <option value="6">جنيه سوداني</option>
              </select>
            </div>
          </div>

          {/* رفع ملف PDF للتقرير */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 mb-8 flex flex-col items-center text-center bg-white hover:border-blue-400 transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={40} />
            <div className="mb-2 font-semibold text-gray-700">اسحب ملف PDF أو انقر للتحميل</div>
            <div className="mb-4 text-sm text-gray-500">يجب أن يكون الملف بصيغة PDF</div>
            <input
              type="file"
              accept="application/pdf,.pdf"
              id="pdf-upload"
              name="pdf_file"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0] || null;
                setForm(f => ({ ...f, pdf_file: file }));
              }}
            />
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all cursor-pointer mt-2" onClick={() => document.getElementById('pdf-upload')?.click()}>
              اختيار ملف PDF
            </button>
            {form.pdf_file && (
              <div className="mt-2 text-green-600 text-sm">تم اختيار الملف: {form.pdf_file.name}</div>
            )}
          </div>

          {/* بيانات العميل */}
          <h3 className="text-xl font-semibold mb-4 text-blue-800">بيانات العميل</h3>
          {clients.map((client, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 bg-gray-50 rounded-lg p-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">اسم العميل *</label>
                <input className="form-control w-full h-12 text-lg" name={`client[${idx}][name]`} type="text" value={client.name} onChange={e => handleClientChange(idx, e)} />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">رقم الهاتف *</label>
                <input className="form-control w-full h-12 text-lg" name={`client[${idx}][telephone]`} type="text" value={client.telephone} onChange={e => handleClientChange(idx, e)} />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">البريد الإلكتروني *</label>
                <input className="form-control w-full h-12 text-lg" name={`client[${idx}][email]`} type="text" value={client.email} onChange={e => handleClientChange(idx, e)} />
              </div>
            </div>
          ))}
          <div className="flex gap-4 mb-8">
            <button className="btn btn-primary px-6 py-2 text-lg" type="button" onClick={addClient}>إضافة عميل</button>
            {clients.length > 1 && (
              <button className="btn btn-outline-danger px-6 py-2 text-lg" type="button" onClick={removeClient}>حذف عميل</button>
            )}
          </div>

          {/* مستخدمون آخرون */}
          <div className="form-check mb-6">
            <input className="form-check-input" id="showUser" type="checkbox" name="has_user" value="1" checked={hasUser} onChange={e => setHasUser(e.target.checked)} />
            <label className="form-check-label font-semibold text-gray-700 ml-2" htmlFor="showUser">للتقرير مستخدمون آخرون</label>
          </div>
          {hasUser && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">المستخدمون الآخرون للتقرير</h3>
              {users.map((user, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">اسم مستخدم التقرير *</label>
                    <input className="form-control w-full h-12 text-lg" name={`user[${idx}][name]`} type="text" value={user.name} onChange={e => handleUserChange(idx, e)} />
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <button className="btn btn-primary px-6 py-2 text-lg" type="button" onClick={addUser}>إضافة مستخدم</button>
                {users.length > 1 && (
                  <button className="btn btn-outline-danger px-6 py-2 text-lg" type="button" onClick={removeUser}>حذف مستخدم</button>
                )}
              </div>
            </div>
          )}

          {/* بيانات المقيمين */}
          <h3 className="text-xl font-semibold mb-4 text-blue-800">بيانات المقيمين</h3>
          {valuers.map((valuer, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 bg-gray-50 rounded-lg p-4 items-center">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">اسم المقيم *</label>
                <select className="form-control w-full h-12 text-lg" name={`valuer[${idx}][id]`} value={valuer.id} onChange={e => handleValuerChange(idx, e as any)}>
                  <option value="">تحديد</option>
                  <option value="53">4210000271 - عبدالعزيز سليمان عبدالله الزيد</option>
                  <option value="247">4210000352 - حسام سعيد علي الاسمري</option>
                  <option value="310">4210000088 - أحمد محمد عبدالله ابابطين</option>
                  <option value="375">4210000102 - خالد عبدالكريم بن عبدالعزيز الجاسر</option>
                  <option value="618">4210000091 - هاني ابراهيم محمد رواس</option>
                  <option value="621">4210000334 - سعيد بن علي بن سعيد الزهراني</option>
                  <option value="793">4210000375 - احمد زبن دبيان الروقي</option>
                  <option value="832">4210000059 - عبدالله بن عبدالرحمن بن عبدالله الصعب</option>
                  <option value="1192">4210000096 - سيف مساعد بن فالح الحربي</option>
                  <option value="1655">4210000258 - فايز عويض ساير الحربي</option>
                  <option value="1920">4210000010 - حمزه مشبب فهد العاصمي</option>
                  <option value="3816">4210000113 - مالك انس سليمان حافظ</option>
                  <option value="4886">4210000078 - رائد ناصر عبدالله العميره</option>
                  <option value="5459">4210000183 - فيصل عايض جربوع الرويلي</option>
                  <option value="5938">4210000170 - عبدالله نجيب بن خالد الحليبي</option>
                  <option value="19575">4210000193 - محمد حمود عبدالرحمن العايد</option>
                  <option value="19769">4210000282 - عبيد مناحي سياف الشهراني</option>
                  <option value="19868">4210000356 - بندر عبدالله ابن سعد الهويمل</option>
                  <option value="21521">4210000210 - عبدالرحمن مساعد محمدراشد الصبحي</option>
                  <option value="26152">4210000303 - علي سليمان بن عبدالله العليان</option>
                  <option value="26470">4210000201 - فهد محمد عيد الرشيدي</option>
                  <option value="28380">4210000285 - تركي محمد عبدالمحسن الحربي</option>
                  <option value="28480">4220000293 - عمر سالم عثمان على</option>
                  <option value="28733">4210000277 - حسين علي بن احمد ابوحسون</option>
                  <option value="30843">4210000323 - علي بن معتوق بن ابراهيم الحسين</option>
                  <option value="30904">4210000347 - عبدالله محمد عبدالله العجاجى</option>
                  <option value="31013">4210000296 - فالح مفلح فالح الشهراني</option>
                  <option value="34414">4210000335 - خالد محمد ابراهيم العضيبى</option>
                  <option value="34912">4210000346 - عبدالله احمد عبدالله الغامدي</option>
                  <option value="36022">4210000340 - شريفة سعيد عوض القحطاني</option>
                  <option value="38464">4210000381 - آحمد ابراهيم عبدالعزيز اللهيب</option>
                  <option value="41413">4210000369 - سعود حسين بن علي آل فطيح</option>
                  <option value="41470">4210000366 - حسام موسى سعد السويري</option>
                  <option value="144">4210000008 - حمد عبدالله ناصر الحمد</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">نسبة المساهمة *</label>
                <select className="form-control w-full h-12 text-lg" name={`valuer[${idx}][contribution]`} value={valuer.contribution} onChange={e => handleValuerChange(idx, e as any)}>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45">45%</option>
                  <option value="50">50%</option>
                  <option value="55">55%</option>
                  <option value="60">60%</option>
                  <option value="65">65%</option>
                  <option value="70">70%</option>
                  <option value="75">75%</option>
                  <option value="80">80%</option>
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                  <option value="100">100%</option>
                </select>
              </div>
              <div className="flex items-end">
                {valuers.length > 1 && (
                  <button className="btn btn-outline-danger px-4 py-2 text-lg" type="button" onClick={() => setValuers(vs => vs.filter((_, i) => i !== idx))}>حذف</button>
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-4 mb-8">
            <button className="btn btn-primary px-6 py-2 text-lg" type="button" onClick={addValuer}>إضافة مقيم</button>
            {valuers.length > 1 && (
              <button className="btn btn-outline-danger px-6 py-2 text-lg" type="button" onClick={removeValuer}>حذف مقيم</button>
            )}
          </div>

          <div className="flex flex-row gap-4 justify-end mt-10">
            <input
              className="btn btn-outline-primary btn-lg px-8 py-3 text-lg"
              name="save"
              type="submit"
              value="حفظ وإغلاق"
              onClick={e => {
                e.preventDefault();
                setStep(1);
              }}
            />
            <button
              className="btn btn-primary btn-lg px-8 py-3 text-lg"
              type="button"
              onClick={() => setStep(2)}
            >
              حفظ واستمرار
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload Excel file only */}
      {step === 2 && (
        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center text-center bg-white hover:border-blue-400 transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={40} />
            <div className="mb-2 font-semibold text-gray-700">اسحب ملف Excel أو انقر للتحميل</div>
            <div className="mb-4 text-sm text-gray-500">يجب أن يكون الملف بصيغة XLSX أو XLS</div>
            <input
              type="file"
              accept=".xlsx,.xls"
              id="excel-upload"
              name="excel_file"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0] || null;
                setForm(f => ({ ...f, excel_file: file }));
              }}
            />
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all cursor-pointer mt-2" onClick={() => document.getElementById('excel-upload')?.click()}>
              اختيار ملف Excel
            </button>
            {form.excel_file && (
              <div className="mt-2 text-green-600 text-sm">تم اختيار الملف: {form.excel_file.name}</div>
            )}
          </div>
          <div className="flex justify-between md:justify-end gap-4 mt-6">
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
              onClick={() => setStep(3)}
              disabled={!form.excel_file}
            >
              متابعة
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Result step */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-700">نتيجة ارسال التقارير</h2>
          <p className="mb-6 text-lg text-gray-700">ملخص التقرير المرفوع:</p>
          <table className="w-full table-auto border rounded-xl shadow mb-8">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 border">رقم التقرير</th>
                <th className="px-4 py-2 border">عنوان التقرير</th>
                <th className="px-4 py-2 border">تاريخ التقييم</th>
                <th className="px-4 py-2 border">الحالة</th>
                <th className="px-4 py-2 border">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">{form.report_number || '---'}</td>
                <td className="px-4 py-2 border">{form.title || '—'}</td>
                <td className="px-4 py-2 border">{form.valued_at || '—'}</td>
                <td className="px-4 py-2 border">
                  <select
                    className="form-control h-10 text-base"
                    value={resultStatus}
                    onChange={e => setResultStatus(e.target.value as any)}
                  >
                    <option value="جديد">جديد</option>
                    <option value="مكتمل جزئي">مكتمل جزئي</option>
                    <option value=" مكتمل"> مكتمل</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 font-bold mr-2"
                    type="button"
                    onClick={() => setShowSendModal(true)}
                  >
                    إرسال
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 font-bold mr-2"
                    type="button"
                    onClick={() => setShowEditModal(true)}
                  >
                    تعديل
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-bold"
                    type="button"
                    onClick={() => { setShowSendModal(true); setSendStatus(null); setTimeout(handleSendReport, 0); }}
                  >
                    إعادة الإرسال
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <button className="btn btn-primary px-8 py-3 text-lg" type="button" onClick={() => setStep(1)}>رفع تقرير جديد</button>
          </div>

          {/* مودال الإرسال */}
          {showSendModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 bg-opacity-70 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-10 relative animate-fade-in border-2 border-blue-200">
                <button className="absolute top-4 left-4 text-gray-500 hover:text-red-600 text-3xl font-bold" onClick={() => setShowSendModal(false)}>&times;</button>
                <h3 className="text-2xl font-extrabold text-green-700 mb-6 flex items-center gap-3">
                  <Upload className="h-7 w-7" /> إرسال تقرير ال��قارات إلى نظام الهيئة
                </h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="font-bold text-gray-700">عنوان التقرير:</div>
                  <div className="text-blue-900">{form.title || '—'}</div>
                  <div className="font-bold text-gray-700 mt-2">رقم التقرير:</div>
                  <div className="text-gray-900">{form.report_number || '---'}</div>
                  <div className="font-bold text-gray-700 mt-2">الحالة الحالية:</div>
                  <div className="text-gray-900">{resultStatus}</div>
                </div>
                {sendStatus === null || sendStatus === 'sending' ? (
                  <div className="w-full my-4">
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-4 bg-blue-500 transition-all duration-150" style={{ width: `${sendStatus === 'sending' ? sendProgress : 0}%` }}></div>
                    </div>
                    <div className="text-center text-blue-600 font-bold mt-2">{sendStatus === 'sending' ? `جاري الإرسال... ${sendProgress}%` : 'جاهز للإرسال'}</div>
                  </div>
                ) : null}
                {sendStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-700 font-bold animate-fade-in mt-6">
                    <Check className="h-5 w-5" /> تم إرسال التقرير بنجاح إلى نظام الهيئة!
                  </div>
                )}
                {sendStatus === 'error' && (
                  <div className="flex flex-col items-center gap-2 text-red-700 font-bold animate-fade-in mt-6">
                    <AlertTriangle className="h-5 w-5" /> فشل في إرسال التقرير، يرجى المحاولة مرة أخرى.
                    <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700" onClick={handleSendReport}>إعادة الإرسال</button>
                  </div>
                )}
                {sendStatus === null && (
                  <div className="flex gap-4 justify-end mt-8">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300" onClick={() => setShowSendModal(false)}>إلغاء</button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700" onClick={handleSendReport}>تأكيد الإرسال</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* مودال التعديل */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
                <button className="absolute top-4 left-4 text-gray-500 hover:text-red-600 text-2xl font-bold" onClick={() => setShowEditModal(false)}>&times;</button>
                <h3 className="text-xl font-bold text-yellow-700 mb-4">تعديل بيانات التقرير</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">عنوان التقرير</label>
                    <input className="form-control w-full" type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">تاريخ التقييم</label>
                    <input className="form-control w-full" type="date" value={editForm.valued_at} onChange={e => setEditForm(f => ({ ...f, valued_at: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-8">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300" onClick={() => setShowEditModal(false)}>إلغاء</button>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-700" onClick={handleSaveEdit}>حفظ التعديلات</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        body, .form-control, .btn, .form-label {
          font-family: 'Cairo', Tahoma, Arial, sans-serif;
        }
        .form-control {
          background: #fff;
          border: 1.5px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 1.08rem;
          transition: border-color 0.2s;
          box-shadow: 0 1px 2px #0001;
        }
        .form-control:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 2px #2563eb22;
        }
        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
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
        .btn-outline-primary {
          border: 2px solid #2563eb;
          color: #2563eb;
          background: #fff;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline-primary:hover {
          background: #e0e7ff;
          color: #1d4ed8;
        }
        .btn-outline-danger {
          border: 2px solid #ef4444;
          color: #ef4444;
          background: #fff;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline-danger:hover {
          background: #fee2e2;
          color: #b91c1c;
        }
        .shadow-lg {
          box-shadow: 0 4px 24px #0002;
        }
        .shadow {
          box-shadow: 0 2px 8px #0001;
        }
        .rounded-2xl {
          border-radius: 1.25rem;
        }
        .rounded-lg {
          border-radius: 0.75rem;
        }
        .h-12 {
          height: 3rem;
        }
        .text-lg {
          font-size: 1.08rem;
        }
        .text-xl {
          font-size: 1.25rem;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .font-semibold {
          font-weight: 600;
        }
        .bg-gray-50 {
          background: #f9fafb;
        }
        .bg-blue-900 {
          color: #1e3a8a;
        }
        .bg-blue-800 {
          color: #1e40af;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        .mt-10 {
          margin-top: 2.5rem;
        }
        .gap-4 {
          gap: 1rem;
        }
        .gap-6 {
          gap: 1.5rem;
        }
        .p-8 {
          padding: 2rem;
        }
        .p-4 {
          padding: 1rem;
        }
        .px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .px-8 {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        .btn-lg {
          font-size: 1.15rem;
          padding: 0.75rem 2rem;
        }
        @media (max-width: 900px) {
          .max-w-[1600px] { max-width: 100vw; }
          .grid-cols-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
};

export default ManualUpload;
