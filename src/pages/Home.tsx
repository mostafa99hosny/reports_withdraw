import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  HelpCircle, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Crown,
  Rocket,
  Building,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
const Home: React.FC = () => {
  return <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-blue-500 bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4 mr-2" />
            الحل الأمثل لإدارة التقارير العقارية
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            نظام إدارة تقارير العقارات
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed">
            🚀 منصة متكاملة وذكية لإدارة وسحب وإرسال تقارير العقارات بين الأنظمة المختلفة
            <br />
            <span className="text-blue-200">بكفاءة عالية وسرعة فائقة</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/auth/login" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center">
              <ArrowRight className="ml-2 h-5 w-5" />
              ابدأ باستخدام النظام الآن
            </Link>
            <Link to="/help" className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
              تعلم المزيد
            </Link>
          </div>
          <div className="flex justify-center items-center gap-8 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              أكثر من 1000+ مستخدم
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              دعم فني 24/7
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              أمان عالي
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار نظامنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم لك أفضل الحلول التقنية لإدارة تقارير العقارات بكفاءة واحترافية عالية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                سرعة فائقة ⚡
              </h3>
              <p className="text-gray-600 leading-relaxed">
                سحب التقارير في ثوانٍ معدودة مع تقنيات متطورة توفر عليك ساعات من العمل
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                أمان عالي 🔒
              </h3>
              <p className="text-gray-600 leading-relaxed">
                حماية متقدمة لبياناتك مع تشفير من الدرجة العسكرية وامتثال كامل للمعايير الدولية
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                تكامل شامل 🌐
              </h3>
              <p className="text-gray-600 leading-relaxed">
                يعمل مع جميع الأنظمة العقارية الرئيسية في المملكة مع واجهات برمجية متطورة
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                متاح 24/7 ⏰
              </h3>
              <p className="text-gray-600 leading-relaxed">
                خدمة مستمرة على مدار الساعة مع دعم فني متخصص لضمان عدم توقف عملك
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الأنظمة المدعومة والشركاء
            </h2>
            <p className="text-xl text-gray-600">
              نتكامل مع أفضل الأنظمة العقارية في المملكة
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">مقياس</span>
              </div>
              <h3 className="font-semibold text-gray-900">نظام مقياس</h3>
              <p className="text-sm text-gray-600 mt-1">تكامل كامل</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">نقرة</span>
              </div>
              <h3 className="font-semibold text-gray-900">نظام نقرة</h3>
              <p className="text-sm text-gray-600 mt-1">دعم متقدم</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">أنظمة أخرى</h3>
              <p className="text-sm text-gray-600 mt-1">قريباً</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">API مخصص</h3>
              <p className="text-sm text-gray-600 mt-1">حسب الطلب</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">مستخدم نشط</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">تقرير تم سحبه</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">وقت التشغيل</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم فني</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              فوائد استخدام النظام
            </h2>
            <p className="text-xl text-gray-600">
              اكتشف كيف يمكن لنظامنا أن يحول طريقة عملك
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    زيادة الإنتاجية بنسبة 300%
                  </h3>
                  <p className="text-gray-600">
                    وفر ساعات من العمل اليدوي واستفد من الأتمتة الذكية
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    تعاون فريق محسن
                  </h3>
                  <p className="text-gray-600">
                    شارك التقارير والبيانات مع فريقك بسهولة وأمان
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    إدارة متقدمة للتقارير
                  </h3>
                  <p className="text-gray-600">
                    نظم وأرشف تقاريرك مع إمكانيات البحث والتصفية المتقدمة
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  جرب النظام مجاناً
                </h3>
                <p className="text-gray-600 mb-6">
                  ابدأ رحلتك معنا اليوم واكتشف الفرق
                </p>
                <Link 
                  to="/auth/mekyas" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Plans Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-6">
              <Crown className="h-4 w-4 mr-2" />
              اختر الباقة المناسبة لك
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              باقات الاشتراك
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              خطط مرنة تناسب احتياجاتك من الأفراد إلى الشركات الكبيرة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">الباقة الأساسية</h3>
                <p className="text-gray-600 mb-6">مثالية للأفراد والشركات الصغيرة</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">299</span>
                  <span className="text-gray-600 mr-2">ريال/شهرياً</span>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">حتى 100 تقرير شهرياً</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تكامل مع نظام مقياس</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">دعم فني عبر البريد الإلكتروني</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تخزين 5 جيجا</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">مستخدم واحد</span>
                  </li>
                </ul>

                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  اختر هذه الباقة
                </button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  الأكثر شعبية
                </span>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">الباقة الاحترافية</h3>
                <p className="text-gray-600 mb-6">الأفضل للشركات المتوسطة</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">599</span>
                  <span className="text-gray-600 mr-2">ريال/شهرياً</span>
                  <div className="text-sm text-green-600 font-medium">وفر 20% سنوياً</div>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">حتى 500 تقرير شهرياً</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تكامل مع مقياس ونقرة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">دعم فني هاتفي ومباشر</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تخزين 25 جيجا</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">حتى 5 مستخدمين</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تقارير تحليلية متقدمة</span>
                  </li>
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors">
                  اختر هذه الباقة
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">باقة المؤسسات</h3>
                <p className="text-gray-600 mb-6">للشركات الكبيرة والمؤسسات</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">1299</span>
                  <span className="text-gray-600 mr-2">ريال/شهرياً</span>
                  <div className="text-sm text-green-600 font-medium">وفر 30% سنوياً</div>
                </div>

                <ul className="text-right space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تقارير غير محدودة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تكامل مع جميع الأنظمة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">مدير حساب مخصص</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">تخزين غير محدود</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">مستخدمين غير محدود</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                    <span className="text-gray-700">API مخصص</span>
                  </li>
                </ul>

                <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  تواصل معنا
                </button>
              </div>
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              عرض محدود
            </div>
            <h3 className="text-2xl font-bold mb-2">🎉 احصل على شهر إضافي مجاناً!</h3>
            <p className="text-lg mb-4">عند الاشتراك السنوي في أي باقة</p>
            <p className="text-sm opacity-90">* العرض ساري حتى نهاية الشهر</p>
          </div>
        </div>
      </div>

      {/* Subscription Steps Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              خطوات الاشتراك السهلة
            </h2>
            <p className="text-xl text-gray-600">
              ابدأ رحلتك معنا في 4 خطوات بسيطة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">اختر الباقة</h3>
              <p className="text-gray-600">
                حدد الباقة التي تناسب احتياجاتك وحجم عملك
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">أنشئ حسابك</h3>
              <p className="text-gray-600">
                سجل بياناتك الأساسية وبيانات شركتك
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ادفع بأمان</h3>
              <p className="text-gray-600">
                اختر طريقة الدفع المناسبة واستكمل عملية الدفع الآمنة
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ابدأ الاستخدام</h3>
              <p className="text-gray-600">
                استمتع بجميع المميزات فوراً واحصل على التدريب المجاني
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/auth/login" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg text-lg"
            >
              ابدأ الاشتراك الآن
              <ArrowRight className="mr-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Methods & Support */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">طرق الدفع المتاحة</h3>
                <p className="text-gray-600">ادفع بالطريقة التي تناسبك</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">البطاقات الائتمانية</div>
                  <div className="text-xs text-gray-500">فيزا - ماستركارد</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">التحويل البنكي</div>
                  <div className="text-xs text-gray-500">جميع البنوك السعودية</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">STC Pay</div>
                  <div className="text-xs text-gray-500">دفع سريع وآمن</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">فواتير</div>
                  <div className="text-xs text-gray-500">للشركات والمؤسسات</div>
                </div>
              </div>
            </div>

            {/* Contact for Subscription */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">تحتاج مساعدة في الاختيار؟</h3>
                <p className="text-gray-600">تواصل مع فريق المبيعات المتخصص</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">اتصل بنا</div>
                    <div className="text-sm text-gray-600">920001234</div>
                    <div className="text-xs text-gray-500">من الأحد إلى الخميس 9ص - 6م</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">راسلنا</div>
                    <div className="text-sm text-gray-600">sales@reports-system.com</div>
                    <div className="text-xs text-gray-500">رد خلال ساعتين</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">احجز موعد</div>
                    <div className="text-sm text-gray-600">استشارة مجانية 30 دقيقة</div>
                    <div className="text-xs text-gray-500">لتحديد الباقة المناسبة</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link 
                  to="/support" 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                >
                  تواصل مع فريق المبيعات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-gray-600">
              آراء حقيقية من عملاء راضين عن خدماتنا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "نظام رائع وفر علينا ساعات من العمل اليدوي. السرعة والدقة مذهلة حقاً!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  أ
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">أحمد المالكي</div>
                  <div className="text-sm text-gray-600">مدير شركة عقارية</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "الدعم الفني ممتاز والنظام يعمل بكفاءة عالية. أنصح به بشدة لكل العاملين في العقارات."
              </p>
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  ف
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">فاطمة الزهراني</div>
                  <div className="text-sm text-gray-600">مطورة عقارية</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "تكامل ممتاز مع أنظمتنا الحالية. حل مشاكل كثيرة كنا نواجهها يومياً."
              </p>
              <div className="flex items-center">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  م
                </div>
                <div className="mr-4">
                  <div className="font-semibold text-gray-900">محمد العتيبي</div>
                  <div className="text-sm text-gray-600">مدير تقني</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-white bg-opacity-20 w-20 h-20 rounded-full mb-8">
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            هل تحتاج للمساعدة؟
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            فريق الدعم الفني المتخصص متاح لمساعدتك على مدار الساعة
            <br />
            نحن هنا لضمان نجاحك وتحقيق أهدافك
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/support" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center"
            >
              تواصل مع الدعم الفني
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
            <Link 
              to="/help" 
              className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              مركز المساعدة
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;