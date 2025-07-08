import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Building2,
  Receipt,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      label: "Overview",
      path: "/admin",
      icon: LayoutDashboard,
      roles: ["admin"],
    },
    { label: "Agents", path: "/admin/agents", icon: Users, roles: ["admin"] },
    { label: "Teams", path: "/admin/teams", icon: Building2, roles: ["admin"] },
    {
      label: "Transactions",
      path: "/admin/transactions",
      icon: Receipt,
      roles: ["admin"],
    },
    { label: "Users", path: "/admin/users", icon: UserPlus, roles: ["admin"] },

    {
      label: "Overview",
      path: "/exp-staff",
      icon: LayoutDashboard,
      roles: ["exp_staff"],
    },
    {
      label: "Agents",
      path: "/exp-staff/agents",
      icon: Users,
      roles: ["exp_staff"],
    },
    {
      label: "Transactions",
      path: "/exp-staff/transactions",
      icon: Receipt,
      roles: ["exp_staff"],
    },
    {
      label: "Teams",
      path: "/exp-staff/teams",
      icon: Building2,
      roles: ["exp_staff"],
    },

    {
      label: "Overview",
      path: "/team-lead",
      icon: LayoutDashboard,
      roles: ["team_lead"],
    },
    {
      label: "Agents",
      path: "/team-lead/agents",
      icon: Users,
      roles: ["team_lead"],
    },
    {
      label: "Transactions",
      path: "/team-lead/transactions",
      icon: Receipt,
      roles: ["team_lead"],
    },
    {
      label: "Cap Setup",
      path: "/team-lead/cap-setup",
      icon: Building2,
      roles: ["team_lead"],
    },

    {
      label: "Overview",
      path: "/agent",
      icon: LayoutDashboard,
      roles: ["agent"],
    },
    {
      label: "Commissions",
      path: "/agent/commissions",
      icon: Receipt,
      roles: ["agent"],
    },
    {
      label: "Cap Progress",
      path: "/agent/caps",
      icon: Building2,
      roles: ["agent"],
    },
  ];

  const filteredNavigation = navigationItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">eXp Commission Manager</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {user.role.replace("_", " ")}
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {filteredNavigation.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarFallback>
                      {user.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user.full_name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
