import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
} from "lucide-react";
import { useState } from "react";

const ExpStaffReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedAgent, setSelectedAgent] = useState("all");

  // Mock data for reports
  const reportData = {
    totalCommissionIntake: 485000,
    totalTransactions: 18,
    averageCommission: 26944,
    capAchievements: 2,
    assignedAgents: [
      { name: "John Smith", intake: 185000, transactions: 7, capProgress: 85 },
      {
        name: "Sarah Johnson",
        intake: 142000,
        transactions: 6,
        capProgress: 72,
      },
      { name: "Mike Wilson", intake: 158000, transactions: 5, capProgress: 45 },
    ],
    monthlyTrends: [
      { month: "Jan", intake: 485000, transactions: 18 },
      { month: "Dec", intake: 442000, transactions: 16 },
      { month: "Nov", intake: 398000, transactions: 15 },
      { month: "Oct", intake: 356000, transactions: 14 },
    ],
    capAnalytics: {
      agentsNearCap: 1,
      avgCapProgress: 67,
      estimatedCapCompletions: [
        { agent: "John Smith", estimatedDate: "2024-02-15", capType: "16k" },
        { agent: "Sarah Johnson", estimatedDate: "2024-03-20", capType: "8k" },
      ],
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commission Reports</h1>
          <p className="text-muted-foreground">
            Analytics and reports for assigned agents
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Intake
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${reportData.totalCommissionIntake.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportData.totalTransactions}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg: ${reportData.averageCommission.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Agents
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportData.assignedAgents.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {reportData.capAnalytics.agentsNearCap} near cap
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Cap Progress
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportData.capAnalytics.avgCapProgress}%
            </div>
            <Progress
              value={reportData.capAnalytics.avgCapProgress}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
          <CardDescription>
            Commission intake and transaction volume by agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.assignedAgents.map((agent, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{agent.name}</h4>
                    <Badge
                      variant={
                        agent.capProgress > 80 ? "destructive" : "secondary"
                      }
                    >
                      {agent.capProgress}% cap
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {agent.transactions} transactions
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${agent.intake.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg: $
                    {Math.round(
                      agent.intake / agent.transactions
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cap Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Cap Achievement Analytics</CardTitle>
          <CardDescription>
            Estimated cap completion dates and progress tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.capAnalytics.estimatedCapCompletions.map(
              (completion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{completion.agent}</div>
                      <div className="text-sm text-muted-foreground">
                        {completion.capType} cap
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {completion.estimatedDate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Est. completion
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>
            Commission intake and transaction trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.monthlyTrends.map((trend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="font-medium">{trend.month} 2024</div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-medium">
                      ${trend.intake.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Commission intake
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{trend.transactions}</div>
                    <div className="text-sm text-muted-foreground">
                      Transactions
                    </div>
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

export default ExpStaffReports;
