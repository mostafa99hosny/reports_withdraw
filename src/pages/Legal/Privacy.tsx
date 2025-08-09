import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <Link 
              to="/auth/login" 
              className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium ml-4"
            >
              <ArrowLeft className="h-4 w-4 ml-1" />
              العودة للتسجيل
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">سياسة الخصوصية</h1>
            <p className="text-gray-600">آخر تحديث: 15 يناير 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none text-right">
            
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-green-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">التزامنا بخصوصيتك</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                نحن في نظام إدارة التقارير العقارية نقدر خصوصيتك ونلتزم بحماية معلوماتك الشخصية. 
                هذه السياسة توضح كيفية جمع واستخدام وحماية بياناتك.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-blue-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">المعلومات التي نجمعها</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">المعلومات الشخصية:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700">
                    <li>الاسم الكامل</li>
                    <li>البريد الإلكتروني</li>
                    <li>رقم الهاتف</li>
                    <li>معلومات الشركة (الاسم، النوع، رقم الترخيص)</li>
                    <li>المدينة والموقع</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">معلومات الاستخدام:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700">
                    <li>سجلات تسجيل الدخول</li>
                    <li>عنوان IP والموقع الجغرافي</li>
                    <li>نوع المتصفح ونظام التشغيل</li>
                    <li>الصفحات المزارة وأوقات الاستخدام</li>
                    <li>التفاعل مع ميزات النظام</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">بيانات التقارير:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700">
                    <li>محتوى التقارير العقارية</li>
                    <li>معلومات العقارات والتقييمات</li>
                    <li>تواريخ الإنشاء والتعديل</li>
                    <li>حالة المعالجة والإرسال</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-purple-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">كيف نستخدم معلوماتك</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>تقديم وتحسين خدماتنا</li>
                  <li>إدارة حسابك والتحقق من هويتك</li>
                  <li>معالجة وإرسال التقارير العقارية</li>
                  <li>التواصل معك بشأن الخدمة</li>
                  <li>إرسال التحديثات والإشعارات المهمة</li>
                  <li>تحليل الاستخدام لتحسين الأداء</li>
                  <li>الامتثال للمتطلبات القانونية</li>
                  <li>منع الاحتيال وضمان الأمان</li>
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-red-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">حماية البيانات</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>نطبق إجراءات أمنية متقدمة لحماية بياناتك:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>تشفير البيانات أثناء النقل والتخزين (SSL/TLS)</li>
                  <li>خوادم آمنة مع حماية متعددة الطبقات</li>
                  <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                  <li>نسخ احتياطية منتظمة ومشفرة</li>
                  <li>وصول محدود للموظفين المخولين فقط</li>
                  <li>تحديثات أمنية دورية</li>
                  <li>اختبارات اختراق منتظمة</li>
                </ul>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">مشاركة البيانات</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>نحن لا نبيع أو نؤجر معلوماتك الشخصية. قد نشارك البيانات في الحالات التالية فقط:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li><strong>مع موافقتك الصريحة:</strong> عندما تطلب منا مشاركة معلومات محددة</li>
                  <li><strong>مقدمي الخدمات:</strong> شركاء موثوقون يساعدون في تقديم الخدمة</li>
                  <li><strong>الأنظمة الحكومية:</strong> مقياس، نقرة، والهيئة حسب الحاجة</li>
                  <li><strong>المتطلبات القانونية:</strong> عند الطلب من السلطات المختصة</li>
                  <li><strong>حماية الحقوق:</strong> لحماية حقوقنا أو حقوق المستخدمين الآخرين</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
              <div className="space-y-4 text-gray-700">
                <p>لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li><strong>الوصول:</strong> طلب نسخة من بياناتك الشخصية</li>
                  <li><strong>التصحيح:</strong> تحديث أو تصحيح المعلومات غير الدقيقة</li>
                  <li><strong>الحذف:</strong> طلب حذف بياناتك في ظروف معينة</li>
                  <li><strong>التقييد:</strong> تقييد معالجة بياناتك</li>
                  <li><strong>النقل:</strong> الحصول على بياناتك بتنسيق قابل للقراءة</li>
                  <li><strong>الاعتراض:</strong> الاعتراض على معالجة بياناتك لأغراض معينة</li>
                  <li><strong>سحب الموافقة:</strong> سحب موافقتك في أي وقت</li>
                </ul>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط</h2>
              <div className="space-y-4 text-gray-700">
                <p>نستخدم ملفات تعريف الارتباط (Cookies) للأغراض التالية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li><strong>الضرورية:</strong> لتشغيل النظام وتسجيل الدخول</li>
                  <li><strong>الوظيفية:</strong> لحفظ تفضيلاتك وإعداداتك</li>
                  <li><strong>التحليلية:</strong> لفهم كيفية استخدام النظام</li>
                  <li><strong>الأداء:</strong> لتحسين سرعة وأداء النظام</li>
                </ul>
                <p>يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.</p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الاحتفاظ بالبيانات</h2>
              <div className="space-y-4 text-gray-700">
                <p>نحتفظ ببياناتك للفترات التالية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li><strong>بيانات الحساب:</strong> طوال فترة نشاط الحساب + 3 سنوات</li>
                  <li><strong>التقارير:</strong> حسب المتطلبات القانونية (عادة 7 سنوات)</li>
                  <li><strong>سجلات النظام:</strong> 2-5 سنوات حسب النوع</li>
                  <li><strong>البيانات المالية:</strong> 10 سنوات للامتثال الضريبي</li>
                </ul>
                <p>بعد انتهاء فترة الاحتفاظ، يتم حذف البيانات بشكل آمن ونهائي.</p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">النقل الدولي للبيانات</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  بياناتك تُخزن ومُعالج داخل المملكة العربية السعودية. في حالات نادرة قد نحتاج 
                  لنقل بيانات معينة خارج المملكة، وسيتم ذلك مع ضمانات أمنية مناسبة وموافقتك المسبقة.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">خصوصية الأطفال</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  خدماتنا مخصصة للبالغين والشركات. لا نجمع عمداً معلومات شخصية من الأطفال 
                  دون سن 18 عاماً. إذا علمنا بجمع معلومات من طفل، سنحذفها فوراً.
                </p>
              </div>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تغييرات السياسة</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  قد نحدث هذه السياسة من وقت لآخر. سنشعرك بأي تغييرات جوهرية عبر:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>إشعار عبر البريد الإلكتروني</li>
                  <li>إشعار داخل النظام</li>
                  <li>تحديث تاريخ "آخر تحديث" أعلى هذه الصفحة</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <div className="space-y-2 text-gray-700">
                <p>لأي استفسارات حول خصوصيتك أو هذه السياسة:</p>
                <p>📧 مسؤول حماية البيانات: privacy@reports.com</p>
                <p>📞 خط الخصوصية: 920001234 (تحويلة 3)</p>
                <p>📍 العنوان: الرياض، المملكة العربية السعودية</p>
                <p>🕒 أوقات العمل: الأحد - الخميس (9ص - 6م)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              بالمتابعة، فإنك تؤكد قراءتك وفهمك وموافقتك على سياسة الخصوصية هذه.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth/login" 
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                أوافق على سياسة الخصوصية
              </Link>
              <Link 
                to="/" 
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;