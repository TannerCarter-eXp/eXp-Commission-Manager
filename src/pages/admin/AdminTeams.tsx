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
import { Plus, Edit, Eye, Users, DollarSign } from "lucide-react";
import { Team, User } from "@/types/database";

const AdminTeams = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data - in real app this would come from API
  const teams: (Team & {
    team_lead: User;
    exp_staff: User;
    agent_count: number;
    total_commissions: number;
  })[] = [
    {
      id: "1",
      team_lead_id: "3",
      exp_staff_id: "2",
      team_name: "Downtown Real Estate Team",
      external_cap_amount: 50000,
      external_cap_description: "Team external cap for additional splits",
      created_at: "2024-01-01T00:00:00Z",
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
      agent_count: 8,
      total_commissions: 180000,
    },
    {
      id: "2",
      team_lead_id: "4",
      exp_staff_id: "2",
      team_name: "Westside Luxury Properties",
      external_cap_amount: 75000,
      external_cap_description: "Higher cap for luxury property team",
      created_at: "2024-01-01T00:00:00Z",
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
      agent_count: 12,
      total_commissions: 285000,
    },
    {
      id: "3",
      team_lead_id: "5",
      exp_staff_id: "6",
      team_name: "Suburban Family Homes",
      external_cap_amount: 30000,
      external_cap_description: "Suburban market focus team",
      created_at: "2024-01-01T00:00:00Z",
      team_lead: {
        id: "5",
        email: "lead3@exp.com",
        full_name: "Team Lead 3",
        role: "team_lead",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      exp_staff: {
        id: "6",
        email: "staff2@exp.com",
        full_name: "eXp Staff 2",
        role: "exp_staff",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      agent_count: 6,
      total_commissions: 125000,
    },
  ];

  const CreateTeamDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Create a new team and assign a team lead and eXp staff member.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamName" className="text-right">
              Team Name
            </Label>
            <Input
              id="teamName"
              placeholder="Team Name"
              className="col-span-3"
            />
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capAmount" className="text-right">
              External Cap
            </Label>
            <Input
              id="capAmount"
              type="number"
              placeholder="50000"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capDescription" className="text-right">
              Description
            </Label>
            <Input
              id="capDescription"
              placeholder="Cap description"
              className="col-span-3"
            />
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
            Create Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Manage teams, assignments, and external caps
          </p>
        </div>
        <CreateTeamDialog />
      </div>

      {/* Teams List */}
      <div className="space-y-4">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {team.team_name}
                    <Badge variant="outline">{team.agent_count} agents</Badge>
                  </CardTitle>
                  <CardDescription>
                    {team.external_cap_description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Team Lead</h4>
                  <p className="text-sm text-muted-foreground">
                    {team.team_lead.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {team.team_lead.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">eXp Staff</h4>
                  <p className="text-sm text-muted-foreground">
                    {team.exp_staff.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {team.exp_staff.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">External Cap</h4>
                  <p className="text-sm text-muted-foreground">
                    $
                    {team.external_cap_amount?.toLocaleString() || "No cap set"}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">{team.agent_count}</span>{" "}
                    agents
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">
                      ${team.total_commissions.toLocaleString()}
                    </span>{" "}
                    total commissions
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTeams;
