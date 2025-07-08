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
import { Download, Filter, Eye, Calendar } from "lucide-react";

const AgentCommissions = () => {
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock commission data
  const commissionData = {
    totalYTD: 285000,
    totalTransactions: 18,
    avgCommission: 15833,
    expCapContribution: 57000,
    teamCapContribution: 28500,
    netEarnings: 199500,
  };

  const commissionHistory = [
    {
      id: "1",
      date: "2024-01-15",
      property: "123 Main St, Downtown",
      gross: 52000,
      expSplit: 10400,
      teamExternalCapSplit: 5200,
      teamLeadSplit: 0,
      agentNet: 36400,
      status: "Paid",
    },
    {
      id: "2",
      date: "2024-01-10",
      property: "456 Oak Ave, Westside",
      gross: 38000,
      expSplit: 7600,
      teamExternalCapSplit: 3800,
      teamLeadSplit: 0,
      agentNet: 26600,
      status: "Paid",
    },
    {
      id: "3",
      date: "2024-01-05",
      property: "789 Pine Rd, Suburban",
      gross: 44000,
      expSplit: 8800,
      teamExternalCapSplit: 4400,
      teamLeadSplit: 0,
      agentNet: 30800,
      status: "Paid",
    },
    {
      id: "4",
      date: "2024-01-02",
      property: "321 Elm St, Downtown",
      gross: 35000,
      expSplit: 7000,
      teamExternalCapSplit: 3500,
      teamLeadSplit: 0,
      agentNet: 24500,
      status: "Processing",
    },
  ];

  const filteredCommissions = commissionHistory.filter((commission) => {
    const matchesSearch = commission.property
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commission History</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of your commission earnings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total YTD Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${commissionData.netEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {commissionData.totalTransactions} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${commissionData.avgCommission.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${commissionData.totalYTD.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Before splits</p>
          </CardContent>
        </Card>
      </div>

      {/* Split Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>YTD Split Breakdown</CardTitle>
          <CardDescription>
            How your commissions are distributed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">eXp Company (20%)</h4>
              <div className="text-2xl font-bold text-red-600">
                ${commissionData.expCapContribution.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Company split</div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Team External Cap</h4>
              <div className="text-2xl font-bold text-orange-600">
                ${commissionData.teamCapContribution.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Team cap contribution
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Your Net Earnings</h4>
              <div className="text-2xl font-bold text-green-600">
                ${commissionData.netEarnings.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                After all splits
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by property address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Commission History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Detailed breakdown of each commission transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Gross Commission</TableHead>
                <TableHead>eXp Split</TableHead>
                <TableHead>Team Split</TableHead>
                <TableHead>Your Net</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(commission.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {commission.property}
                  </TableCell>
                  <TableCell>${commission.gross.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">
                    ${commission.expSplit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-orange-600">
                    ${commission.teamExternalCapSplit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${commission.agentNet.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        commission.status === "Paid" ? "default" : "secondary"
                      }
                    >
                      {commission.status}
                    </Badge>
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

export default AgentCommissions;
