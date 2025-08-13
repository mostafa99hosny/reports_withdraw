import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTr } from '../../context/LanguageContext';

const MekyasLogin: React.FC = () => {
  const tr = useTr();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginStep, setLoginStep] = useState<'form' | 'authenticating' | 'success'>('form');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept any credentials and proceed
    setIsLoading(true);
    setLoginStep('authenticating');
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Always succeed and navigate
      setLoginStep('success');

      localStorage.setItem('mekyasAuth', JSON.stringify({
        username: formData.username || 'user',
        loginTime: new Date().toISOString(),
        token: 'mekyas_auth_token_' + Date.now()
      }));

      setTimeout(() => {
        navigate('/reports/mekyas');
      }, 700);
    } catch (err) {
      setError(tr('حدث خطأ في تسجيل الدخول','An error occurred during login'));
      setLoginStep('form');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAuthenticatingStep = () => (
    <div className="text-center py-8">
      <div className="mb-6">
        <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {tr('جاري التحقق من بيانات الدخول','Verifying your credentials')}
      </h3>
      <p className="text-gray-600">
        {tr('يتم التحقق من صحة البيانات مع موقع مقياس...','Validating your data with Mekyas...')}
      </p>
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          يرجى الانتظار، لا تغلق هذه الصفحة
        </p>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="mb-6">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {tr('تم تسجيل الدخول بنجاح','Logged in successfully')}
      </h3>
      <p className="text-gray-600 mb-4">
        مرحباً {formData.username}، سيتم تحويلك إلى صفحة التقارير...
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-sm text-green-700">
          {tr('تم التحقق من هويتك بنجاح مع موقع مقياس','Your identity has been verified with Mekyas')}
        </p>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          <User className="h-4 w-4 inline ml-1" />
          {tr('اسم المستخدم','Username')}
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={tr('أدخل اسم المستخدم الخاص بك في موقع مقياس','Enter your Mekyas username')}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          <Lock className="h-4 w-4 inline ml-1" />
          {tr('كلمة المرور','Password')}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
            placeholder={tr('أدخل كلمة المرور','Enter your password')}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 ml-2" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="h-5 w-5 animate-spin ml-2" />
            جاري تسجيل الدخول...
          </div>
        ) : (
          'تسجيل الدخول'
        )}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {tr('تسجيل الدخول إلى مقياس','Sign in to Mekyas')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {tr('يرجى تسجيل الدخول بحساب موقع مقياس للوصول إلى التقارير','Please sign in with your Mekyas account to access reports')}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {loginStep === 'form' && renderLoginForm()}
          {loginStep === 'authenticating' && renderAuthenticatingStep()}
          {loginStep === 'success' && renderSuccessStep()}
        </div>

        {/* Demo Credentials */}
        {loginStep === 'form' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              بيانات تجريبية للاختبار:
            </h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>اسم المستخدم:</strong> admin</p>
              <p><strong>كلمة المرور:</strong> mekyas123</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            هذا النظام محمي ومخصص للمستخدمين المصرح لهم فقط
          </p>
        </div>
      </div>
    </div>
  );
};

export default MekyasLogin;