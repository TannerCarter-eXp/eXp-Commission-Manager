import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ui/protected-route";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Auth Pages
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminUsers from "./pages/admin/AdminUsers";

// eXp Staff Pages
import ExpStaffOverview from "./pages/exp-staff/ExpStaffOverview";
import ExpStaffAgents from "./pages/exp-staff/ExpStaffAgents";
import ExpStaffTransactions from "./pages/exp-staff/ExpStaffTransactions";
import ExpStaffTeams from "./pages/exp-staff/ExpStaffTeams";
import ExpStaffReports from "./pages/exp-staff/ExpStaffReports";

// Team Lead Pages
import TeamLeadOverview from "./pages/team-lead/TeamLeadOverview";
import TeamLeadAgents from "./pages/team-lead/TeamLeadAgents";
import TeamLeadTransactions from "./pages/team-lead/TeamLeadTransactions";
import TeamLeadCapSetup from "./pages/team-lead/TeamLeadCapSetup";
import TeamLeadSplits from "./pages/team-lead/TeamLeadSplits";

// Agent Pages
import AgentOverview from "./pages/agent/AgentOverview";
import AgentCommissions from "./pages/agent/AgentCommissions";
import AgentCaps from "./pages/agent/AgentCaps";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Admin Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/agents"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminAgents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/teams"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminTeams />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/transactions"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminTransactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />

              {/* eXp Staff Routes */}
              <Route
                path="exp-staff"
                element={
                  <ProtectedRoute allowedRoles={["exp_staff"]}>
                    <ExpStaffOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="exp-staff/agents"
                element={
                  <ProtectedRoute allowedRoles={["exp_staff"]}>
                    <ExpStaffAgents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="exp-staff/transactions"
                element={
                  <ProtectedRoute allowedRoles={["exp_staff"]}>
                    <ExpStaffTransactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="exp-staff/teams"
                element={
                  <ProtectedRoute allowedRoles={["exp_staff"]}>
                    <ExpStaffTeams />
                  </ProtectedRoute>
                }
              />
              <Route
                path="exp-staff/reports"
                element={
                  <ProtectedRoute allowedRoles={["exp_staff"]}>
                    <ExpStaffReports />
                  </ProtectedRoute>
                }
              />

              {/* Team Lead Routes */}
              <Route
                path="team-lead"
                element={
                  <ProtectedRoute allowedRoles={["team_lead"]}>
                    <TeamLeadOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="team-lead/agents"
                element={
                  <ProtectedRoute allowedRoles={["team_lead"]}>
                    <TeamLeadAgents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="team-lead/transactions"
                element={
                  <ProtectedRoute allowedRoles={["team_lead"]}>
                    <TeamLeadTransactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="team-lead/cap-setup"
                element={
                  <ProtectedRoute allowedRoles={["team_lead"]}>
                    <TeamLeadCapSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="team-lead/splits"
                element={
                  <ProtectedRoute allowedRoles={["team_lead"]}>
                    <TeamLeadSplits />
                  </ProtectedRoute>
                }
              />

              {/* Agent Routes */}
              <Route
                path="agent"
                element={
                  <ProtectedRoute allowedRoles={["agent"]}>
                    <AgentOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="agent/commissions"
                element={
                  <ProtectedRoute allowedRoles={["agent"]}>
                    <AgentCommissions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="agent/caps"
                element={
                  <ProtectedRoute allowedRoles={["agent"]}>
                    <AgentCaps />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
