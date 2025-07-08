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
import { Edit, Eye, Settings, Users } from "lucide-react";

const TeamLeadAgents = () => {
  const [isEditSplitOpen, setIsEditSplitOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Mock data for team agents
  const teamAgents = [
    {
      id: "1",
      name: "John Smith",
      email: "john@agent.com",
      expCapType: "16k",
      expCapAmount: 16000,
      expCapPaid: 13600,
      expCapProgress: 85,
      externalCapPaid: 36000,
      splitPercentage: 70,
      teamLeadPercentage: 30,
      monthlyCommission: 45000,
      ytdCommission: 285000,
      isActive: true,
      joinedDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@agent.com",
      expCapType: "8k",
      expCapAmount: 8000,
      expCapPaid: 5760,
      expCapProgress: 72,
      externalCapPaid: 28500,
      splitPercentage: 75,
      teamLeadPercentage: 25,
      monthlyCommission: 32000,
      ytdCommission: 198000,
      isActive: true,
      joinedDate: "2024-01-15",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@agent.com",
      expCapType: "16k",
      expCapAmount: 16000,
      expCapPaid: 7200,
      expCapProgress: 45,
      externalCapPaid: 22000,
      splitPercentage: 70,
      teamLeadPercentage: 30,
      monthlyCommission: 28000,
      ytdCommission: 164000,
      isActive: true,
      joinedDate: "2023-12-01",
    },
  ];

  const EditSplitDialog = ({ agent }) => (
    <Dialog open={isEditSplitOpen} onOpenChange={setIsEditSplitOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Split Configuration</DialogTitle>
          <DialogDescription>
            Configure commission split percentages for {agent?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentSplit" className="text-right">
              Agent Split
            </Label>
            <Input
              id="agentSplit"
              type="number"
              defaultValue={agent?.splitPercentage}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamSplit" className="text-right">
              Team Lead Split
            </Label>
            <Input
              id="teamSplit"
              type="number"
              defaultValue={agent?.teamLeadPercentage}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="externalCap" className="text-right">
              External Cap
            </Label>
            <Select defaultValue="enabled">
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">
                  Participates in external cap
                </SelectItem>
                <SelectItem value="disabled">
                  Excluded from external cap
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditSplitOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditSplitOpen(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Agent Management</h1>
          <p className="text-muted-foreground">
            Manage your team agents and their commission splits
          </p>
        </div>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Team Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamAgents.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamAgents.filter((a) => a.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Monthly Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {teamAgents
                .reduce((sum, agent) => sum + agent.monthlyCommission, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Cap Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamAgents.reduce(
                  (sum, agent) => sum + agent.expCapProgress,
                  0
                ) / teamAgents.length
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {teamAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {agent.name}
                    <Badge variant={agent.isActive ? "default" : "secondary"}>
                      {agent.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{agent.expCapType} cap</Badge>
                  </CardTitle>
                  <CardDescription>{agent.email}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsEditSplitOpen(true);
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cap Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">eXp Cap Progress</h4>
                      <span className="text-sm text-muted-foreground">
                        {agent.expCapProgress}%
                      </span>
                    </div>
                    <Progress value={agent.expCapProgress} className="mb-2" />
                    <div className="text-sm text-muted-foreground">
                      ${agent.expCapPaid.toLocaleString()} of $
                      {agent.expCapAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Monthly Commission:
                      </span>
                      <div className="font-medium">
                        ${agent.monthlyCommission.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        YTD Commission:
                      </span>
                      <div className="font-medium">
                        ${agent.ytdCommission.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Split Configuration */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Current Split Configuration
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Agent Split:
                        </span>
                        <div className="font-medium">
                          {agent.splitPercentage}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Team Lead Split:
                        </span>
                        <div className="font-medium">
                          {agent.teamLeadPercentage}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          eXp Split:
                        </span>
                        <div className="font-medium">20%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          External Cap:
                        </span>
                        <div className="font-medium">
                          ${agent.externalCapPaid.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Joined team:{" "}
                    {new Date(agent.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditSplitDialog agent={selectedAgent} />
    </div>
  );
};

export default TeamLeadAgents;
