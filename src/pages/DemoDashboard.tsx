import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardGuests from "@/components/dashboard/DashboardGuests";
import DashboardSeating from "@/components/dashboard/DashboardSeating";
import DashboardRSVP from "@/components/dashboard/DashboardRSVP";
import DashboardRSVPBuilder from "@/components/dashboard/DashboardRSVPBuilder";
import DashboardFood from "@/components/dashboard/DashboardFood";
import DashboardTimeline from "@/components/dashboard/DashboardTimeline";
import DashboardBudget from "@/components/dashboard/DashboardBudget";
import DashboardTasks from "@/components/dashboard/DashboardTasks";
import DashboardSettings from "@/components/dashboard/DashboardSettings";

const DemoDashboard = () => (
  <DashboardLayout>
    <Routes>
      <Route index element={<DashboardOverview />} />
      <Route path="guests" element={<DashboardGuests />} />
      <Route path="seating" element={<DashboardSeating />} />
      <Route path="rsvp" element={<DashboardRSVP />} />
      <Route path="rsvp-builder" element={<DashboardRSVPBuilder />} />
      <Route path="meals" element={<DashboardFood />} />
      <Route path="timeline" element={<DashboardTimeline />} />
      <Route path="budget" element={<DashboardBudget />} />
      <Route path="tasks" element={<DashboardTasks />} />
      <Route path="settings" element={<DashboardSettings />} />
    </Routes>
  </DashboardLayout>
);

export default DemoDashboard;
