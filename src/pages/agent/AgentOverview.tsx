
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Target, TrendingUp, Calendar } from 'lucide-react';

const AgentOverview = () => {
  // Mock agent data
  const agentData = {
    name: 'John Smith',
    expCapType: '16k',
    expCapAmount: 16000,
    expCapPaid: 13600,
    expCapProgress: 85,
    externalCapAmount: 50000,
    externalCapPaid: 36000,
    externalCapProgress: 72,
    monthlyCommission: 45000,
    ytdCommission: 285000,
    estimatedCapDate: '2024-03-15'
  };

  const recentTransactions = [
    { date: '2024-01-15', property: '123 Main St', gross: 52000, net: 36400, expSplit: 10400, teamSplit: 5200 },
    { date: '2024-01-10', property: '456 Oak Ave', gross: 38000, net: 26600, expSplit: 7600, teamSplit: 3800 },
    { date: '2024-01-05', property: '789 Pine Rd', gross: 44000, net: 30800, expSplit: 8800, teamSplit: 4400 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {agentData.name}</h1>
        <p className="text-muted-foreground">Track your commission caps and earnings progress</p>
      </div>

      {/* Cap Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              eXp Company Cap ({agentData.expCapType})
              <Badge variant={agentData.expCapProgress > 80 ? "destructive" : "secondary"}>
                {agentData.expCapProgress}%
              </Badge>
            </CardTitle>
            <CardDescription>Company cap progress - 20% split to eXp</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={agentData.expCapProgress} className="mb-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Paid to Cap</div>
                <div className="text-lg font-bold">${agentData.expCapPaid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Remaining</div>
                <div className="text-lg font-bold">${(agentData.expCapAmount - agentData.expCapPaid).toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              External Team Cap
              <Badge variant={agentData.externalCapProgress > 80 ? "destructive" : "secondary"}>
                {agentData.externalCapProgress}%
              </Badge>
            </CardTitle>
            <CardDescription>Team external cap progress - variable split</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={agentData.externalCapProgress} className="mb-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Paid to Cap</div>
                <div className="text-lg font-bold">${agentData.externalCapPaid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Remaining</div>
                <div className="text-lg font-bold">${(agentData.externalCapAmount - agentData.externalCapPaid).toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${agentData.monthlyCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${agentData.ytdCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              year to date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Cap Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15</div>
            <p className="text-xs text-muted-foreground">
              estimated completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest commission breakdowns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{transaction.property}</div>
                  <div className="text-sm text-muted-foreground">{transaction.date}</div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="text-muted-foreground">Gross</div>
                    <div className="font-medium">${transaction.gross.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">eXp Split</div>
                    <div className="font-medium text-red-600">${transaction.expSplit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Team Split</div>
                    <div className="font-medium text-orange-600">${transaction.teamSplit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Net</div>
                    <div className="font-medium text-green-600">${transaction.net.toLocaleString()}</div>
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

export default AgentOverview;
