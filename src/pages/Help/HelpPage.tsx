import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Shield, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Zap,
  Globe
} from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          مركز المساعدة والدعم
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          تعلم كيفية استخدام نظام إدارة تقارير العقارات بكفاءة واحترافية
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            دليل البدء السريع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                إنشاء حساب
              </h3>
              <p className="text-gray-600">
                سجل دخولك باستخدام بيانات نظام مقياس للحصول على الوصول الكامل
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                سحب التقارير
              </h3>
              <p className="text-gray-600">
                ابدأ بسحب تقارير العقارات من الأنظمة المختلفة بضغطة واحدة
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                إدارة البيانات
              </h3>
              <p className="text-gray-600">
                راجع وأدر تقاريرك بسهولة مع أدوات التحكم المتقدمة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            مميزات النظام المتقدمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Zap className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                سرعة فائقة
              </h3>
              <p className="text-gray-600 text-sm">
                سحب التقارير في ثوانٍ معدودة مع تقنيات متطورة
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                أمان عالي
              </h3>
              <p className="text-gray-600 text-sm">
                حماية متقدمة لبياناتك مع تشفير من الدرجة العسكرية
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Globe className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                تكامل شامل
              </h3>
              <p className="text-gray-600 text-sm">
                يعمل مع جميع الأنظمة العقارية الرئيسية في المملكة
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Clock className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                متاح 24/7
              </h3>
              <p className="text-gray-600 text-sm">
                خدمة مستمرة على مدار الساعة بدون انقطاع
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Policy */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            سياسة الاستخدام
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4 space-x-reverse">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  الاستخدام المسؤول
                </h3>
                <p className="text-gray-600">
                  يجب استخدام النظام لأغراض مشروعة فقط وفقاً للقوانين واللوائح المعمول بها في المملكة العربية السعودية.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  حماية البيانات
                </h3>
                <p className="text-gray-600">
                  نلتزم بحماية خصوصية بياناتك وعدم مشاركتها مع أطراف ثالثة دون موافقتك الصريحة.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  الدعم الفني
                </h3>
                <p className="text-gray-600">
                  فريق الدعم الفني متاح لمساعدتك في حل أي مشاكل تقنية أو استفسارات حول استخدام النظام.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  التحديثات المستمرة
                </h3>
                <p className="text-gray-600">
                  نقوم بتحديث النظام بانتظام لضمان أفضل أداء وإضافة مميزات جديدة تلبي احتياجاتك.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            آراء عملائنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "نظام رائع وفر علينا ساعات من العمل اليدوي. سهولة الاستخدام والسرعة مذهلة."
              </p>
              <div className="text-sm text-gray-500">
                - أحمد المالكي، مدير شركة عقارية
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "الدعم الفني ممتاز والنظام يعمل بكفاءة عالية. أنصح به بشدة."
              </p>
              <div className="text-sm text-gray-500">
                - فاطمة الزهراني، مطورة عقارية
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "تكامل ممتاز مع أنظمتنا الحالية. حل مشاكل كثيرة كنا نواجهها."
              </p>
              <div className="text-sm text-gray-500">
                - محمد العتيبي، مدير تقني
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                كيف يمكنني البدء في استخدام النظام؟
              </h3>
              <p className="text-gray-600">
                يمكنك البدء بالضغط على "ابدأ باستخدام النظام" في الصفحة الرئيسية وتسجيل الدخول باستخدام بيانات نظام مقياس.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                هل النظام آمن لاستخدام بيانات الشركة؟
              </h3>
              <p className="text-gray-600">
                نعم، النظام يستخدم أحدث تقنيات التشفير والحماية لضمان أمان بياناتك بالكامل.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ما هي الأنظمة المدعومة؟
              </h3>
              <p className="text-gray-600">
                النظام يدعم التكامل مع نظام مقياس ونقرة وجميع الأنظمة العقارية الرئيسية في المملكة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            جاهز للبدء؟
          </h2>
          <p className="text-xl mb-8">
            انضم إلى آلاف المستخدمين الذين يثقون في نظامنا لإدارة تقاريرهم العقارية
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/auth/mekyas" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              ابدأ الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
            <Link 
              to="/support" 
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors border border-blue-500"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;