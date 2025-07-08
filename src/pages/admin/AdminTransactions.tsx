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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Download, Filter } from "lucide-react";
import { Transaction, Agent, User } from "@/types/database";

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAgent, setFilterAgent] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");

  // Mock data - in real app this would come from API
  const transactions: (Transaction & { agent: Agent & { user: User } })[] = [
    {
      id: "1",
      agent_id: "1",
      gross_commission: 52000,
      exp_company_split: 10400,
      team_external_cap_split: 5200,
      team_lead_general_split: 0,
      agent_net_amount: 36400,
      transaction_date: "2024-01-15",
      property_address: "123 Main St, Downtown",
      created_by: "2",
      created_at: "2024-01-15T10:00:00Z",
      agent: {
        id: "1",
        user_id: "1",
        exp_cap_type: "16k",
        exp_cap_amount: 16000,
        exp_cap_paid: 13600,
        team_lead_id: "3",
        exp_staff_id: "2",
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        user: {
          id: "1",
          email: "john@agent.com",
          full_name: "John Smith",
          role: "agent",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      },
    },
    {
      id: "2",
      agent_id: "2",
      gross_commission: 38000,
      exp_company_split: 7600,
      team_external_cap_split: 3800,
      team_lead_general_split: 0,
      agent_net_amount: 26600,
      transaction_date: "2024-01-14",
      property_address: "456 Oak Ave, Westside",
      created_by: "2",
      created_at: "2024-01-14T14:30:00Z",
      agent: {
        id: "2",
        user_id: "2",
        exp_cap_type: "8k",
        exp_cap_amount: 8000,
        exp_cap_paid: 5760,
        team_lead_id: "3",
        exp_staff_id: "2",
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        user: {
          id: "2",
          email: "sarah@agent.com",
          full_name: "Sarah Johnson",
          role: "agent",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      },
    },
    {
      id: "3",
      agent_id: "3",
      gross_commission: 44000,
      exp_company_split: 8800,
      team_external_cap_split: 4400,
      team_lead_general_split: 0,
      agent_net_amount: 30800,
      transaction_date: "2024-01-13",
      property_address: "789 Pine Rd, Suburban",
      created_by: "2",
      created_at: "2024-01-13T09:15:00Z",
      agent: {
        id: "3",
        user_id: "3",
        exp_cap_type: "4k",
        exp_cap_amount: 4000,
        exp_cap_paid: 1800,
        team_lead_id: "4",
        exp_staff_id: "2",
        is_active: false,
        created_at: "2024-01-01T00:00:00Z",
        user: {
          id: "3",
          email: "mike@agent.com",
          full_name: "Mike Wilson",
          role: "agent",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      },
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.property_address
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.agent.user.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesAgent =
      filterAgent === "all" || transaction.agent_id === filterAgent;
    return matchesSearch && matchesAgent;
  });

  const totalCommissions = filteredTransactions.reduce(
    (sum, t) => sum + t.gross_commission,
    0
  );
  const totalExpSplit = filteredTransactions.reduce(
    (sum, t) => sum + t.exp_company_split,
    0
  );
  const totalAgentNet = filteredTransactions.reduce(
    (sum, t) => sum + t.agent_net_amount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction Management</h1>
          <p className="text-muted-foreground">
            View and manage all commission transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Gross Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCommissions.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total eXp Split
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpSplit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Agent Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAgentNet.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by property address or agent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterAgent} onValueChange={setFilterAgent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {transactions.map((t) => (
                  <SelectItem key={t.agent_id} value={t.agent_id}>
                    {t.agent.user.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDateRange} onValueChange={setFilterDateRange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            All commission transactions with detailed breakdowns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Gross Commission</TableHead>
                <TableHead>eXp Split</TableHead>
                <TableHead>Team Split</TableHead>
                <TableHead>Agent Net</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {transaction.agent.user.full_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.agent.exp_cap_type} cap
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {transaction.property_address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${transaction.gross_commission.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-red-600">
                      ${transaction.exp_company_split.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-orange-600">
                      ${transaction.team_external_cap_split.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">
                      ${transaction.agent_net_amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
