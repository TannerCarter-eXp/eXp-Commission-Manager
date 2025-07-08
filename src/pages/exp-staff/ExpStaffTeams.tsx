import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, Target, AlertCircle } from "lucide-react";

const ExpStaffTeams = () => {
  // Mock data for assigned teams (read-only reference)
  const assignedTeams = [
    {
      id: "1",
      name: "Downtown Real Estate Team",
      teamLead: "Team Lead",
      externalCapAmount: 50000,
      externalCapPaid: 32000,
      externalCapProgress: 64,
      agentCount: 8,
      activeAgents: 7,
      totalCommissions: 180000,
      splitConfiguration: {
        defaultAgentSplit: 70,
        defaultTeamLeadSplit: 30,
        externalCapContribution: 10, // percentage that goes to external cap
      },
      agents: [
        { name: "John Smith", split: 70, expCapProgress: 85 },
        { name: "Sarah Johnson", split: 75, expCapProgress: 72 },
        { name: "Mike Wilson", split: 70, expCapProgress: 45 },
      ],
    },
    {
      id: "2",
      name: "Westside Luxury Properties",
      teamLead: "Team Lead 2",
      externalCapAmount: 75000,
      externalCapPaid: 45000,
      externalCapProgress: 60,
      agentCount: 12,
      activeAgents: 11,
      totalCommissions: 285000,
      splitConfiguration: {
        defaultAgentSplit: 75,
        defaultTeamLeadSplit: 25,
        externalCapContribution: 8,
      },
      agents: [
        { name: "Lisa Davis", split: 75, expCapProgress: 92 },
        { name: "Tom Brown", split: 80, expCapProgress: 68 },
        { name: "Amy White", split: 75, expCapProgress: 54 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Reference</h1>
        <p className="text-muted-foreground">
          Read-only view of external cap configurations for processing context
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignedTeams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {team.name}
                <Badge variant="outline">{team.agentCount} agents</Badge>
              </CardTitle>
              <CardDescription>Team Lead: {team.teamLead}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* External Cap Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">External Cap Progress</h4>
                  <span className="text-sm text-muted-foreground">
                    {team.externalCapProgress}%
                  </span>
                </div>
                <Progress value={team.externalCapProgress} className="mb-2" />
                <div className="text-sm text-muted-foreground">
                  ${team.externalCapPaid.toLocaleString()} of $
                  {team.externalCapAmount.toLocaleString()}
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">
                      {team.activeAgents} Active
                    </div>
                    <div className="text-xs text-muted-foreground">
                      of {team.agentCount} agents
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">
                      ${team.totalCommissions.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      total commissions
                    </div>
                  </div>
                </div>
              </div>

              {/* Split Configuration (Read-Only) */}
              <div>
                <h4 className="font-medium mb-3">
                  Split Configuration Reference
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Default Agent Split:
                    </span>
                    <span className="font-medium">
                      {team.splitConfiguration.defaultAgentSplit}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Default Team Lead Split:
                    </span>
                    <span className="font-medium">
                      {team.splitConfiguration.defaultTeamLeadSplit}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      External Cap Contribution:
                    </span>
                    <span className="font-medium">
                      {team.splitConfiguration.externalCapContribution}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      eXp Company Split:
                    </span>
                    <span className="font-medium">20%</span>
                  </div>
                </div>
              </div>

              {/* Sample Agent Splits */}
              <div>
                <h4 className="font-medium mb-3">Agent Split Examples</h4>
                <div className="space-y-2">
                  {team.agents.slice(0, 3).map((agent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <div>
                        <div className="text-sm font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {agent.split}% split • {agent.expCapProgress}% eXp cap
                        </div>
                      </div>
                      <Badge
                        variant={
                          agent.expCapProgress > 80
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {agent.expCapProgress > 80 ? "Near Cap" : "Active"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Processing Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              • External cap contributions are automatically calculated based on
              team configuration
            </p>
            <p>
              • Agent splits may vary from default percentages based on
              individual agreements
            </p>
            <p>
              • eXp company split is always 20% and takes priority over other
              splits
            </p>
            <p>• External cap contributions pause when team cap is reached</p>
            <p>• Contact team lead for split configuration changes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpStaffTeams;
