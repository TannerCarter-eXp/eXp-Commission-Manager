import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Filter } from "lucide-react";
import { useState } from "react";

const ExpStaffAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for assigned agents - in real app this would come from API
  const assignedAgents = [
    {
      id: "1",
      name: "John Smith",
      email: "john@agent.com",
      team: "Downtown Team",
      expCapType: "16k",
      expCapAmount: 16000,
      expCapPaid: 13600,
      expCapProgress: 85,
      externalCapAmount: 50000,
      externalCapPaid: 36000,
      externalCapProgress: 72,
      splitPercentage: 70,
      teamLeadPercentage: 30,
      monthlyCommission: 45000,
      ytdCommission: 285000,
      recentTransactions: [
        {
          date: "2024-01-15",
          property: "123 Main St",
          gross: 52000,
          net: 36400,
        },
        {
          date: "2024-01-10",
          property: "456 Oak Ave",
          gross: 38000,
          net: 26600,
        },
      ],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@agent.com",
      team: "Westside Team",
      expCapType: "8k",
      expCapAmount: 8000,
      expCapPaid: 5760,
      expCapProgress: 72,
      externalCapAmount: 75000,
      externalCapPaid: 33750,
      externalCapProgress: 45,
      splitPercentage: 75,
      teamLeadPercentage: 25,
      monthlyCommission: 32000,
      ytdCommission: 198000,
      recentTransactions: [
        {
          date: "2024-01-12",
          property: "789 Pine Rd",
          gross: 44000,
          net: 33000,
        },
      ],
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@agent.com",
      team: "Downtown Team",
      expCapType: "16k",
      expCapAmount: 16000,
      expCapPaid: 7200,
      expCapProgress: 45,
      externalCapAmount: 50000,
      externalCapPaid: 33500,
      externalCapProgress: 67,
      splitPercentage: 70,
      teamLeadPercentage: 30,
      monthlyCommission: 28000,
      ytdCommission: 164000,
      recentTransactions: [
        {
          date: "2024-01-08",
          property: "321 Elm St",
          gross: 35000,
          net: 24500,
        },
      ],
    },
  ];

  const filteredAgents = assignedAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assigned Agents</h1>
          <p className="text-muted-foreground">
            Detailed view of agents under your management
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by agent name, email, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Agents List */}
      <div className="space-y-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {agent.name}
                    <Badge variant="outline">{agent.expCapType} cap</Badge>
                    <Badge
                      variant={
                        agent.expCapProgress > 80 ? "destructive" : "secondary"
                      }
                    >
                      {agent.expCapProgress > 80 ? "Near Cap" : "Active"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {agent.email} • {agent.team}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* eXp Cap Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">eXp Company Cap Progress</h4>
                      <span className="text-sm text-muted-foreground">
                        {agent.expCapProgress}%
                      </span>
                    </div>
                    <Progress value={agent.expCapProgress} className="mb-2" />
                    <div className="text-sm text-muted-foreground">
                      ${agent.expCapPaid.toLocaleString()} of $
                      {agent.expCapAmount.toLocaleString()} paid
                    </div>
                  </div>

                  {/* External Cap Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">
                        External Team Cap Progress
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {agent.externalCapProgress}%
                      </span>
                    </div>
                    <Progress
                      value={agent.externalCapProgress}
                      className="mb-2"
                    />
                    <div className="text-sm text-muted-foreground">
                      ${agent.externalCapPaid.toLocaleString()} of $
                      {agent.externalCapAmount.toLocaleString()} paid
                    </div>
                  </div>
                </div>

                {/* Split Configuration & Stats */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Split Configuration (Read-Only)
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
                          eXp Company Split:
                        </span>
                        <div className="font-medium">20%</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Commission Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Monthly:</span>
                        <div className="font-medium">
                          ${agent.monthlyCommission.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">YTD:</span>
                        <div className="font-medium">
                          ${agent.ytdCommission.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Recent Transactions</h4>
                <div className="space-y-2">
                  {agent.recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {transaction.property}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${transaction.gross.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          Net: ${transaction.net.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpStaffAgents;
