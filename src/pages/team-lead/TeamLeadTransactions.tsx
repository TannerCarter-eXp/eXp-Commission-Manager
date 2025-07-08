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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Eye, Calculator, Download } from "lucide-react";

const TeamLeadTransactions = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [grossCommission, setGrossCommission] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");

  // Mock data for team agents
  const teamAgents = [
    {
      id: "1",
      name: "John Smith",
      splitPercentage: 70,
      teamLeadPercentage: 30,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      splitPercentage: 75,
      teamLeadPercentage: 25,
    },
    {
      id: "3",
      name: "Mike Wilson",
      splitPercentage: 70,
      teamLeadPercentage: 30,
    },
  ];

  // Mock transaction data
  const transactions = [
    {
      id: "1",
      agent: "John Smith",
      property: "123 Main St, Downtown",
      gross: 52000,
      expSplit: 10400,
      teamExternalCapSplit: 5200,
      teamLeadSplit: 0,
      agentNet: 36400,
      date: "2024-01-15",
      status: "Processed",
    },
    {
      id: "2",
      agent: "Sarah Johnson",
      property: "456 Oak Ave, Westside",
      gross: 38000,
      expSplit: 7600,
      teamExternalCapSplit: 3800,
      teamLeadSplit: 0,
      agentNet: 26600,
      date: "2024-01-14",
      status: "Processed",
    },
    {
      id: "3",
      agent: "Mike Wilson",
      property: "789 Pine Rd, Suburban",
      gross: 44000,
      expSplit: 8800,
      teamExternalCapSplit: 4400,
      teamLeadSplit: 0,
      agentNet: 30800,
      date: "2024-01-13",
      status: "Processed",
    },
  ];

  // Calculate splits based on selected agent
  const calculateSplits = () => {
    if (!grossCommission || !selectedAgent) return null;

    const gross = parseFloat(grossCommission);
    const agent = teamAgents.find((a) => a.id === selectedAgent);
    if (!agent) return null;

    const expSplit = gross * 0.2; // 20% to eXp
    const teamExternalCapSplit = gross * 0.1; // 10% to external cap (example)
    const teamLeadSplit = gross * (agent.teamLeadPercentage / 100); // Team lead percentage
    const agentNet = gross - expSplit - teamExternalCapSplit - teamLeadSplit;

    return {
      gross,
      expSplit,
      teamExternalCapSplit,
      teamLeadSplit,
      agentNet,
      agentSplitPercentage: agent.splitPercentage,
    };
  };

  const splits = calculateSplits();

  const AddTransactionDialog = () => (
    <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Enter transaction details. Commission splits will be calculated
            automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agent" className="text-right">
              Team Agent
            </Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select team agent" />
              </SelectTrigger>
              <SelectContent>
                {teamAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} ({agent.splitPercentage}% split)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="property" className="text-right">
              Property
            </Label>
            <Input
              id="property"
              placeholder="Property address"
              className="col-span-3"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gross" className="text-right">
              Gross Commission
            </Label>
            <Input
              id="gross"
              type="number"
              placeholder="50000"
              className="col-span-3"
              value={grossCommission}
              onChange={(e) => setGrossCommission(e.target.value)}
            />
          </div>

          {/* Auto-calculated splits */}
          {splits && (
            <div className="col-span-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4" />
                <h4 className="font-medium">Automatic Split Calculation</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Gross Commission
                  </div>
                  <div className="font-medium">
                    ${splits.gross.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    eXp Split (20%)
                  </div>
                  <div className="font-medium text-red-600">
                    ${splits.expSplit.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    External Cap Split
                  </div>
                  <div className="font-medium text-orange-600">
                    ${splits.teamExternalCapSplit.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Team Lead Split
                  </div>
                  <div className="font-medium text-blue-600">
                    ${splits.teamLeadSplit.toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">Agent Net</div>
                  <div className="font-medium text-green-600">
                    ${splits.agentNet.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsAddTransactionOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setIsAddTransactionOpen(false)}
            disabled={!splits}
          >
            Add Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Transactions</h1>
          <p className="text-muted-foreground">
            Add and manage transactions for your team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <AddTransactionDialog />
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .reduce((sum, t) => sum + t.gross, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">eXp Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .reduce((sum, t) => sum + t.expSplit, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Team Lead Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .reduce((sum, t) => sum + t.teamLeadSplit, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Agent Net Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transactions
                .reduce((sum, t) => sum + t.agentNet, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Transaction History</CardTitle>
          <CardDescription>
            All transactions processed for your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Gross</TableHead>
                <TableHead>eXp Split</TableHead>
                <TableHead>External Cap</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Agent Net</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.agent}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {transaction.property}
                  </TableCell>
                  <TableCell>${transaction.gross.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">
                    ${transaction.expSplit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-orange-600">
                    ${transaction.teamExternalCapSplit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-blue-600">
                    ${transaction.teamLeadSplit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-green-600">
                    ${transaction.agentNet.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Processed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {transaction.status}
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

export default TeamLeadTransactions;
