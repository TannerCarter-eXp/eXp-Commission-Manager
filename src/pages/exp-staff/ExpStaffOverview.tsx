
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, DollarSign, Target, AlertCircle } from 'lucide-react';

const ExpStaffOverview = () => {
  // Mock data for assigned agents
  const assignedAgents = [
    { 
      id: '1', 
      name: 'John Smith', 
      expCapProgress: 85, 
      externalCapProgress: 72, 
      expCapType: '16k',
      monthlyCommission: 45000,
      team: 'Downtown Team'
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      expCapProgress: 72, 
      externalCapProgress: 45, 
      expCapType: '8k',
      monthlyCommission: 32000,
      team: 'Westside Team'
    },
    { 
      id: '3', 
      name: 'Mike Wilson', 
      expCapProgress: 45, 
      externalCapProgress: 67, 
      expCapType: '16k',
      monthlyCommission: 28000,
      team: 'Downtown Team'
    },
  ];

  const stats = {
    assignedAgents: assignedAgents.length,
    totalCommissionIntake: assignedAgents.reduce((sum, agent) => sum + agent.monthlyCommission, 0),
    agentsNearExpCap: assignedAgents.filter(agent => agent.expCapProgress > 80).length,
    avgExpProgress: Math.round(assignedAgents.reduce((sum, agent) => sum + agent.expCapProgress, 0) / assignedAgents.length)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">eXp Staff Dashboard</h1>
        <p className="text-muted-foreground">Monitor your assigned agents and process transactions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedAgents}</div>
            <p className="text-xs text-muted-foreground">
              agents under your management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Intake</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalCommissionIntake.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              this month from assigned agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg eXp Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgExpProgress}%</div>
            <Progress value={stats.avgExpProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near eXp Cap</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.agentsNearExpCap}</div>
            <p className="text-xs text-muted-foreground">
              agents above 80% eXp cap
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Agents Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Agents Overview</CardTitle>
          <CardDescription>Cap progress and commission intake for your assigned agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignedAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-sm text-muted-foreground">{agent.team}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">eXp Cap ({agent.expCapType})</div>
                    <Progress value={agent.expCapProgress} className="mt-1" />
                    <div className="text-xs text-muted-foreground mt-1">{agent.expCapProgress}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">External Cap</div>
                    <Progress value={agent.externalCapProgress} className="mt-1" />
                    <div className="text-xs text-muted-foreground mt-1">{agent.externalCapProgress}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Monthly Commission</div>
                    <div className="text-lg font-bold">${agent.monthlyCommission.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpStaffOverview;
