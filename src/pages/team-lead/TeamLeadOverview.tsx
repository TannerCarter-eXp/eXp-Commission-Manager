
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, Target, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamLeadOverview = () => {
  const navigate = useNavigate();

  // Mock team data
  const teamData = {
    teamName: 'Downtown Real Estate Team',
    externalCapAmount: 50000,
    externalCapPaid: 32000,
    externalCapProgress: 64,
    totalAgents: 8,
    activeAgents: 7,
    monthlyCommissions: 180000
  };

  const teamAgents = [
    { name: 'John Smith', expProgress: 85, split: 70, monthlyCommission: 45000 },
    { name: 'Sarah Johnson', expProgress: 72, split: 75, monthlyCommission: 32000 },
    { name: 'Mike Wilson', expProgress: 45, split: 70, monthlyCommission: 28000 },
    { name: 'Lisa Davis', expProgress: 92, split: 80, monthlyCommission: 38000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Lead Dashboard</h1>
          <p className="text-muted-foreground">Manage {teamData.teamName}</p>
        </div>
        <Button onClick={() => navigate('/team-lead/cap-setup')}>
          <Settings className="mr-2 h-4 w-4" />
          Cap Setup
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.activeAgents}</div>
            <p className="text-xs text-muted-foreground">
              of {teamData.totalAgents} total agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Commissions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${teamData.monthlyCommissions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">External Cap Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.externalCapProgress}%</div>
            <Progress value={teamData.externalCapProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${teamData.externalCapPaid.toLocaleString()} of ${teamData.externalCapAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining to Cap</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(teamData.externalCapAmount - teamData.externalCapPaid).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              until external cap reached
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Agents Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Agent Performance</CardTitle>
          <CardDescription>Individual agent progress and commission splits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-sm text-muted-foreground">Split: {agent.split}% agent / {100 - agent.split}% team</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">eXp Cap Progress</div>
                    <Progress value={agent.expProgress} className="mt-1" />
                    <div className="text-xs text-muted-foreground mt-1">{agent.expProgress}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Monthly Commission</div>
                    <div className="text-lg font-bold">${agent.monthlyCommission.toLocaleString()}</div>
                  </div>
                </div>
                <Badge variant={agent.expProgress > 80 ? "destructive" : "secondary"}>
                  {agent.expProgress > 80 ? "Near Cap" : "Active"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadOverview;
