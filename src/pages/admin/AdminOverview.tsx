
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, DollarSign, Target, TrendingUp, AlertCircle } from 'lucide-react';

const AdminOverview = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalAgents: 45,
    activeAgents: 42,
    totalCommissions: 2450000,
    avgCapProgress: 68,
    agentsNearCap: 8,
    recentTransactions: 15
  };

  const recentActivity = [
    { agent: 'John Smith', amount: 45000, property: '123 Main St', date: '2024-01-15', capProgress: 85 },
    { agent: 'Sarah Johnson', amount: 32000, property: '456 Oak Ave', date: '2024-01-14', capProgress: 72 },
    { agent: 'Mike Wilson', amount: 28000, property: '789 Pine Rd', date: '2024-01-14', capProgress: 45 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAgents}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalAgents} total agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalCommissions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cap Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCapProgress}%</div>
            <Progress value={stats.avgCapProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near Cap</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.agentsNearCap}</div>
            <p className="text-xs text-muted-foreground">
              agents above 80% cap
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest commission transactions across all teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{transaction.agent}</div>
                  <div className="text-sm text-muted-foreground">{transaction.property}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">${transaction.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                  <Badge variant={transaction.capProgress > 80 ? "destructive" : "secondary"}>
                    {transaction.capProgress}% cap
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
