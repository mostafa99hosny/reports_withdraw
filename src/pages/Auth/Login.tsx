import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, MapPin, FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTr } from '../../context/LanguageContext';

const Login: React.FC = () => {
  const tr = useTr();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Company Information
    companyName: '',
    companyType: 'عقارية',
    licenseNumber: '',
    city: '',
    
    // Account Information
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Accept any credentials and proceed
      const authData = {
        user: {
          id: 1,
          name: 'مستخدم',
          email: loginForm.email || 'user@example.com',
          company: 'شركة التقارير',
          role: 'user'
        },
        token: 'mock-jwt-token',
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('userAuth', JSON.stringify(authData));

      setMessage({ type: 'success', text: tr('تم تسجيل الدخول بنجاح!','Logged in successfully!') });

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      setMessage({ type: 'error', text: tr('حدث خطأ أثناء تسجيل الدخول','An error occurred during login') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage({ type: 'error', text: tr('كلمة المرور وتأكيد كلمة المرور غير متطابقتين','Password and confirm password do not match') });
      setIsLoading(false);
      return;
    }

    if (!registerForm.agreeToTerms) {
      setMessage({ type: 'error', text: tr('يجب الموافقة على الشروط والأحكام','You must agree to the Terms & Conditions') });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage({ type: 'success', text: tr('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول','Account created successfully! Please log in.') });
      
      setTimeout(() => {
        setActiveTab('login');
        setLoginForm({ ...loginForm, email: registerForm.email });
      }, 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء إنشاء الحساب' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">نظام التقارير العقارية</h1>
            <p className="text-xl text-gray-600 mb-8">منصة متكاملة لإدارة وإرسال تقارير العقارات</p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">أمان عالي</h3>
                <p className="text-gray-600 text-sm">حماية متقدمة لبياناتك وتقاريرك</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">سهولة الاستخدام</h3>
                <p className="text-gray-600 text-sm">واجهة بسيطة ومفهومة للجميع</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">تكامل شامل</h3>
                <p className="text-gray-600 text-sm">ربط مع أنظمة مقياس ونقرة والهيئة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('login')}
              >
                {tr('تسجيل الدخول','Login')}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('register')}
              >
                {tr('إنشاء حساب','Create Account')}
              </button>
            </div>

            <div className="p-8">
              {/* Message */}
              {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 ml-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 ml-2" />
                  )}
                  {message.text}
                </div>
              )}

              {/* Login Form */}
              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr('مرحباً بك مرة أخرى','Welcome back')}</h2>
                    <p className="text-gray-600">{tr('سجل دخولك للوصول إلى حسابك','Sign in to access your account')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tr('البريد الإلكتروني','Email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={tr('أدخل بريدك الإلكتروني','Enter your email')}
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tr('كلمة المرور','Password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={tr('أدخل كلمة المرور','Enter your password')}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={loginForm.rememberMe}
                        onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                      />
                      <span className="mr-2 text-sm text-gray-600">{tr('تذكرني','Remember me')}</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                      {tr('نسيت كلمة المرور؟','Forgot password?')}
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {isLoading ? tr('جاري تسجيل الدخول...','Signing in...') : tr('تسجيل الدخول','Login')}
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      للاختبار: admin@reports.com / 123456
                    </p>
                  </div>
                </form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr('إنشاء حساب جديد','Create a new account')}</h2>
                    <p className="text-gray-600">{tr('انضم إلينا وابدأ في إدارة تقاريرك','Join us and start managing your reports')}</p>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <User className="h-5 w-5 ml-2 text-blue-600" />
                      {tr('المعلومات الشخصية','Personal information')}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {tr('الاسم الأول','First name')}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('الاسم الأول','First name')}
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {tr('الاسم الأخير','Last name')}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('الاسم الأخير','Last name')}
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('البريد الإلكتروني','Email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          required
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('أدخل بريدك الإلكتروني','Enter your email')}
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('رقم الهاتف','Phone number')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="tel"
                          required
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('05xxxxxxxx','05xxxxxxxx')}
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Building className="h-5 w-5 ml-2 text-green-600" />
                      {tr('معلومات الشركة','Company information')}
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('اسم الشركة','Company name')}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="أدخل اسم الشركة"
                        value={registerForm.companyName}
                        onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {tr('نوع الشركة','Company type')}
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={registerForm.companyType}
                          onChange={(e) => setRegisterForm({ ...registerForm, companyType: e.target.value })}
                        >
                          <option value="عقارية">{tr('شركة عقارية','Real estate company')}</option>
                          <option value="تقييم">{tr('شركة تقييم','Valuation company')}</option>
                          <option value="استشارية">{tr('شركة استشارية','Consulting company')}</option>
                          <option value="تطوير">{tr('شركة تطوير','Development company')}</option>
                          <option value="أخرى">{tr('أخرى','Other')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {tr('رقم الترخيص','License number')}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('رقم الترخيص','License number')}
                          value={registerForm.licenseNumber}
                          onChange={(e) => setRegisterForm({ ...registerForm, licenseNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('المدينة','City')}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <select
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={registerForm.city}
                          onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                        >
                          <option value="">{tr('اختر المدينة','Choose a city')}</option>
                          <option value="الرياض">الرياض</option>
                          <option value="جدة">جدة</option>
                          <option value="الدمام">الدمام</option>
                          <option value="مكة المكرمة">مكة المكرمة</option>
                          <option value="المدينة المنورة">المدينة المنورة</option>
                          <option value="الطائف">الطائف</option>
                          <option value="تبوك">تبوك</option>
                          <option value="بريدة">بريدة</option>
                          <option value="خميس مشيط">خميس مشيط</option>
                          <option value="حائل">حائل</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Lock className="h-5 w-5 ml-2 text-purple-600" />
                      {tr('معلومات الحساب','Account information')}
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('كلمة المرور','Password')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('أدخل كلمة المرور','Enter your password')}
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tr('تأكيد كلمة المرور','Confirm password')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={tr('أعد إدخال كلمة المرور','Re-enter your password')}
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                        checked={registerForm.agreeToTerms}
                        onChange={(e) => setRegisterForm({ ...registerForm, agreeToTerms: e.target.checked })}
                      />
                      <span className="mr-2 text-sm text-gray-600">
                        {tr('أوافق على','I agree to')}{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                          {tr('الشروط والأحكام','Terms & Conditions')}
                        </Link>
                        {' '}و{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                          {tr('سياسة الخصوصية','Privacy Policy')}
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={registerForm.subscribeNewsletter}
                        onChange={(e) => setRegisterForm({ ...registerForm, subscribeNewsletter: e.target.checked })}
                      />
                      <span className="mr-2 text-sm text-gray-600">
                        {tr('أرغب في تلقي النشرة الإخبارية والتحديثات','I want to receive the newsletter and updates')}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {isLoading ? tr('جاري إنشاء الحساب...','Creating account...') : tr('إنشاء الحساب','Create account')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Mobile Branding */}
          <div className="lg:hidden text-center mt-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{tr('نظام التقارير العقارية','Real Estate Reports System')}</h1>
            <p className="text-gray-600">{tr('منصة متكاملة لإدارة وإرسال تقارير العقارات','An integrated platform for managing and sending real estate reports')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;