import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MekyasLogin from './pages/Auth/MekyasLogin';
import JadeerLogin from './pages/Auth/JadeerLogin';
import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import MekyasReports from './pages/Reports/MekyasReports';
import ViewReports from './pages/Reports/ViewReports';
import NoqraReports from './pages/Reports/NoqraReports';
import ManualUpload from './pages/Reports/ManualUpload';
import ManualUploadWithId from './pages/Reports/ManualUploadWithId';
import ManagementDashboard from './pages/Dashboard/ManagementDashboard';
import UserSettings from './pages/Settings/UserSettings';
import SupportPage from './pages/Support/SupportPage';
import HelpPage from './pages/Help/HelpPage';
import EquipmentManualUpload from './pages/Reports/EquipmentManualUpload';
import JadeerReports from './pages/Reports/JadeerReports';
import EquipmentManualUploadWithId from './pages/Reports/EquipmentManualUploadWithId';

export function App() {
  return <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/mekyas" element={<MekyasLogin />} />
          <Route path="/auth/jadeer" element={<JadeerLogin />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/reports/mekyas" element={<MekyasReports />} />
          <Route path="/reports/view" element={<ViewReports />} />
          <Route path="/reports/noqra" element={<NoqraReports />} />
          <Route path="/reports/manual-upload" element={<ManualUpload />} />
          <Route path="/reports/manual-upload-with-id" element={<ManualUploadWithId />} />
          <Route path="/equipment-reports/manual-upload" element={<EquipmentManualUpload />} />
          <Route path="/equipment-reports/manual-upload-with-id" element={<EquipmentManualUploadWithId />} />
          <Route path="/jadeer-reports" element={<JadeerReports />} />
          <Route path="/dashboard" element={<ManagementDashboard />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Layout>
    </Router>;
}