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
import { Edit, Save, Settings, Percent } from "lucide-react";

const TeamLeadSplits = () => {
  const [isEditDefaultOpen, setIsEditDefaultOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [defaultAgentSplit, setDefaultAgentSplit] = useState("70");
  const [defaultTeamLeadSplit, setDefaultTeamLeadSplit] = useState("30");

  // Mock data for split configurations
  const splitConfig = {
    defaultAgentSplit: 70,
    defaultTeamLeadSplit: 30,
    externalCapContribution: 10,
    mode: "external",
  };

  const agentSplits = [
    {
      id: "1",
      name: "John Smith",
      agentSplit: 70,
      teamLeadSplit: 30,
      externalCapContribution: 10,
      isCustom: false,
      monthlyCommission: 45000,
      effectiveDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      agentSplit: 75,
      teamLeadSplit: 25,
      externalCapContribution: 10,
      isCustom: true,
      monthlyCommission: 32000,
      effectiveDate: "2024-01-15",
    },
    {
      id: "3",
      name: "Mike Wilson",
      agentSplit: 70,
      teamLeadSplit: 30,
      externalCapContribution: 10,
      isCustom: false,
      monthlyCommission: 28000,
      effectiveDate: "2024-01-01",
    },
  ];

  const EditDefaultSplitDialog = () => (
    <Dialog open={isEditDefaultOpen} onOpenChange={setIsEditDefaultOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Edit Default Split
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Default Split Configuration</DialogTitle>
          <DialogDescription>
            These percentages will be applied to new agents by default.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="defaultAgent" className="text-right">
              Agent Split
            </Label>
            <Input
              id="defaultAgent"
              type="number"
              value={defaultAgentSplit}
              onChange={(e) => setDefaultAgentSplit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="defaultTeamLead" className="text-right">
              Team Lead Split
            </Label>
            <Input
              id="defaultTeamLead"
              type="number"
              value={defaultTeamLeadSplit}
              onChange={(e) => setDefaultTeamLeadSplit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="externalCap" className="text-right">
              External Cap
            </Label>
            <Input
              id="externalCap"
              type="number"
              defaultValue="10"
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Note: eXp company always receives 20% regardless of these settings.
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditDefaultOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditDefaultOpen(false)}>
            Save Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const EditAgentSplitDialog = ({ agent }) => (
    <Dialog open={isEditAgentOpen} onOpenChange={setIsEditAgentOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Agent Split</DialogTitle>
          <DialogDescription>
            Configure custom split percentages for {agent?.name}
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
              defaultValue={agent?.agentSplit}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamLeadSplit" className="text-right">
              Team Lead Split
            </Label>
            <Input
              id="teamLeadSplit"
              type="number"
              defaultValue={agent?.teamLeadSplit}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="externalCapContrib" className="text-right">
              External Cap
            </Label>
            <Input
              id="externalCapContrib"
              type="number"
              defaultValue={agent?.externalCapContribution}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="effectiveDate" className="text-right">
              Effective Date
            </Label>
            <Input
              id="effectiveDate"
              type="date"
              defaultValue={agent?.effectiveDate}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditAgentOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditAgentOpen(false)}>
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
          <h1 className="text-3xl font-bold">Split Configuration</h1>
          <p className="text-muted-foreground">
            Configure commission split percentages for your team
          </p>
        </div>
        <EditDefaultSplitDialog />
      </div>

      {/* Default Split Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Default Split Configuration
          </CardTitle>
          <CardDescription>
            Default percentages applied to new team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium mb-2">Agent Split</h4>
              <div className="text-2xl font-bold">
                {splitConfig.defaultAgentSplit}%
              </div>
              <div className="text-sm text-muted-foreground">
                Default agent percentage
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Team Lead Split</h4>
              <div className="text-2xl font-bold">
                {splitConfig.defaultTeamLeadSplit}%
              </div>
              <div className="text-sm text-muted-foreground">
                Default team lead percentage
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">External Cap</h4>
              <div className="text-2xl font-bold">
                {splitConfig.externalCapContribution}%
              </div>
              <div className="text-sm text-muted-foreground">
                Contribution to external cap
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">eXp Company</h4>
              <div className="text-2xl font-bold">20%</div>
              <div className="text-sm text-muted-foreground">
                Fixed company split
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Agent Splits */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Agent Splits</CardTitle>
          <CardDescription>
            Configure custom splits for specific agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentSplits.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{agent.name}</h4>
                    <Badge variant={agent.isCustom ? "default" : "secondary"}>
                      {agent.isCustom ? "Custom" : "Default"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Effective:{" "}
                    {new Date(agent.effectiveDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Agent</div>
                    <div className="font-medium">{agent.agentSplit}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Team Lead
                    </div>
                    <div className="font-medium">{agent.teamLeadSplit}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      External Cap
                    </div>
                    <div className="font-medium">
                      {agent.externalCapContribution}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">
                      ${agent.monthlyCommission.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Monthly avg
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsEditAgentOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Split Mode Information */}
      <Card>
        <CardHeader>
          <CardTitle>Split Mode Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">How Splits Work</h4>
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <p>• eXp company always receives 20% of gross commission</p>
                <p>
                  • External cap contribution is deducted until team cap is
                  reached
                </p>
                <p>
                  • Agent and team lead percentages are applied to remaining
                  amount
                </p>
                <p>
                  • Custom splits override default percentages for specific
                  agents
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium">
                Example Calculation (on $10,000 gross)
              </h4>
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <p>• eXp Split: $2,000 (20%)</p>
                <p>• External Cap: $1,000 (10%)</p>
                <p>• Remaining: $7,000</p>
                <p>• Agent (70%): $4,900</p>
                <p>• Team Lead (30%): $2,100</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditAgentSplitDialog agent={selectedAgent} />
    </div>
  );
};

export default TeamLeadSplits;
