import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Eye, UserCheck, UserX } from "lucide-react";
import { Agent, User } from "@/types/database";

const AdminAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data - in real app this would come from API
  const agents: (Agent & { user: User; team_lead: User; exp_staff: User })[] = [
    {
      id: "1",
      user_id: "1",
      exp_cap_type: "16k",
      exp_cap_amount: 16000,
      exp_cap_paid: 13600,
      team_lead_id: "3",
      exp_staff_id: "2",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      user: {
        id: "1",
        email: "john@agent.com",
        full_name: "John Smith",
        role: "agent",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      team_lead: {
        id: "3",
        email: "lead@exp.com",
        full_name: "Team Lead",
        role: "team_lead",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      exp_staff: {
        id: "2",
        email: "staff@exp.com",
        full_name: "eXp Staff",
        role: "exp_staff",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: "2",
      user_id: "2",
      exp_cap_type: "8k",
      exp_cap_amount: 8000,
      exp_cap_paid: 5760,
      team_lead_id: "3",
      exp_staff_id: "2",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      user: {
        id: "2",
        email: "sarah@agent.com",
        full_name: "Sarah Johnson",
        role: "agent",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      team_lead: {
        id: "3",
        email: "lead@exp.com",
        full_name: "Team Lead",
        role: "team_lead",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      exp_staff: {
        id: "2",
        email: "staff@exp.com",
        full_name: "eXp Staff",
        role: "exp_staff",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: "3",
      user_id: "3",
      exp_cap_type: "4k",
      exp_cap_amount: 4000,
      exp_cap_paid: 1800,
      team_lead_id: "4",
      exp_staff_id: "2",
      is_active: false,
      created_at: "2024-01-01T00:00:00Z",
      user: {
        id: "3",
        email: "mike@agent.com",
        full_name: "Mike Wilson",
        role: "agent",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      team_lead: {
        id: "4",
        email: "lead2@exp.com",
        full_name: "Team Lead 2",
        role: "team_lead",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      exp_staff: {
        id: "2",
        email: "staff@exp.com",
        full_name: "eXp Staff",
        role: "exp_staff",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    },
  ];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && agent.is_active) ||
      (filterStatus === "inactive" && !agent.is_active);
    return matchesSearch && matchesFilter;
  });

  const CreateAgentDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Add a new agent to the system and assign them to a team lead and eXp
            staff.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Full Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="agent@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capType" className="text-right">
              Cap Type
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select cap type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16k">16k Cap</SelectItem>
                <SelectItem value="8k">8k Cap</SelectItem>
                <SelectItem value="4k">4k Cap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamLead" className="text-right">
              Team Lead
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select team lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead1">Team Lead 1</SelectItem>
                <SelectItem value="lead2">Team Lead 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expStaff" className="text-right">
              eXp Staff
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select eXp staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff1">eXp Staff 1</SelectItem>
                <SelectItem value="staff2">eXp Staff 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsCreateDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-muted-foreground">
            Manage agents, assignments, and cap configurations
          </p>
        </div>
        <CreateAgentDialog />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search agents by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Agents List */}
      <div className="space-y-4">
        {filteredAgents.map((agent) => {
          const capProgress = Math.round(
            (agent.exp_cap_paid / agent.exp_cap_amount) * 100
          );

          return (
            <Card key={agent.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {agent.user.full_name}
                        </h3>
                        <Badge
                          variant={agent.is_active ? "default" : "secondary"}
                        >
                          {agent.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {agent.exp_cap_type} Cap
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {agent.user.email}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Team Lead: {agent.team_lead.full_name}</span>
                        <span>eXp Staff: {agent.exp_staff.full_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[120px]">
                      <div className="text-sm font-medium">Cap Progress</div>
                      <Progress value={capProgress} className="mt-1" />
                      <div className="text-xs text-muted-foreground mt-1">
                        ${agent.exp_cap_paid.toLocaleString()} / $
                        {agent.exp_cap_amount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          /* Toggle active status */
                        }}
                      >
                        {agent.is_active ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAgents;
