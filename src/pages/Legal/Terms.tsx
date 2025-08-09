import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const Terms: React.FC = () => {
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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الشروط والأحكام</h1>
            <p className="text-gray-600">آخر تحديث: 15 يناير 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none text-right">
            
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">مقدمة</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                مرحباً بك في نظام إدارة التقارير العقارية. هذه الشروط والأحكام تحكم استخدامك لخدماتنا. 
                باستخدام النظام، فإنك توافق على الالتزام بهذه الشروط.
              </p>
            </div>

            {/* Service Description */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">وصف الخدمة</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>نظام إدارة التقارير العقارية يوفر:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>سحب التقارير من نظام مقياس ونقرة</li>
                  <li>إدارة وتنظيم التقارير العقارية</li>
                  <li>إرسال التقارير إلى نظام الهيئة</li>
                  <li>تتبع حالة التقارير والعمليات</li>
                  <li>إنشاء تقارير مخصصة وإحصائيات</li>
                </ul>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-orange-600 ml-2" />
                <h2 className="text-2xl font-bold text-gray-900">مسؤوليات المستخدم</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>يتعهد المستخدم بما يلي:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                  <li>الحفاظ على سرية بيانات تسجيل الدخول</li>
                  <li>استخدام النظام للأغراض المشروعة فقط</li>
                  <li>عدم محاولة اختراق أو إلحاق الضرر بالنظام</li>
                  <li>احترام حقوق الملكية الفكرية</li>
                  <li>الالتزام بالقوانين واللوائح المعمول بها</li>
                </ul>
              </div>
            </div>

            {/* Privacy and Data */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الخصوصية والبيانات</h2>
              <div className="space-y-4 text-gray-700">
                <p>نحن ملتزمون بحماية خصوصيتك:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>جمع البيانات الضرورية فقط لتقديم الخدمة</li>
                  <li>تشفير جميع البيانات الحساسة</li>
                  <li>عدم مشاركة البيانات مع أطراف ثالثة دون موافقة</li>
                  <li>الحق في طلب حذف البيانات الشخصية</li>
                  <li>إشعارك بأي تغييرات في سياسة الخصوصية</li>
                </ul>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">توفر الخدمة</h2>
              <div className="space-y-4 text-gray-700">
                <p>نسعى لتوفير الخدمة على مدار الساعة، ولكن:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>قد تحدث انقطاعات مؤقتة للصيانة</li>
                  <li>لا نضمن عدم حدوث أعطال تقنية</li>
                  <li>سنبذل قصارى جهدنا لحل أي مشاكل بسرعة</li>
                  <li>إشعار مسبق بأعمال الصيانة المجدولة</li>
                </ul>
              </div>
            </div>

            {/* Fees and Payment */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الرسوم والدفع</h2>
              <div className="space-y-4 text-gray-700">
                <p>شروط الدفع والاشتراك:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>الرسوم تُحدد حسب خطة الاشتراك المختارة</li>
                  <li>الدفع مقدماً لفترة الاشتراك</li>
                  <li>لا توجد استردادات للمبالغ المدفوعة</li>
                  <li>حق تعديل الأسعار مع إشعار مسبق 30 يوماً</li>
                  <li>إيقاف الخدمة عند عدم سداد الرسوم</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حدود المسؤولية</h2>
              <div className="space-y-4 text-gray-700">
                <p>مسؤوليتنا محدودة بما يلي:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>لا نتحمل مسؤولية الأضرار غير المباشرة</li>
                  <li>مسؤوليتنا محدودة بقيمة الاشتراك المدفوع</li>
                  <li>لا نضمن دقة البيانات من الأنظمة الخارجية</li>
                  <li>المستخدم مسؤول عن صحة البيانات المدخلة</li>
                </ul>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">إنهاء الخدمة</h2>
              <div className="space-y-4 text-gray-700">
                <p>يمكن إنهاء الخدمة في الحالات التالية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>طلب المستخدم إنهاء الاشتراك</li>
                  <li>انتهاء فترة الاشتراك دون تجديد</li>
                  <li>مخالفة شروط الاستخدام</li>
                  <li>عدم سداد الرسوم المستحقة</li>
                </ul>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تعديل الشروط</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية 
                  عبر البريد الإلكتروني أو من خلال النظام. استمرارك في استخدام الخدمة بعد 
                  التعديلات يعني موافقتك على الشروط الجديدة.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">القانون المطبق</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. 
                  أي نزاع ينشأ عن استخدام الخدمة يخضع لاختصاص المحاكم السعودية.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات التواصل</h2>
              <div className="space-y-2 text-gray-700">
                <p>للاستفسارات حول هذه الشروط والأحكام:</p>
                <p>📧 البريد الإلكتروني: legal@reports.com</p>
                <p>📞 الهاتف: 920001234</p>
                <p>📍 العنوان: الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              بالنقر على "أوافق والمتابعة"، فإنك تؤكد قراءتك وفهمك وموافقتك على جميع الشروط والأحكام المذكورة أعلاه.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth/login" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                أوافق والمتابعة
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

export default Terms;