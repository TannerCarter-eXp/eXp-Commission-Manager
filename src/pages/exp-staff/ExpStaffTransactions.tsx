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
import { Plus, Eye, Calculator } from "lucide-react";

const ExpStaffTransactions = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [grossCommission, setGrossCommission] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");

  // Mock data for assigned agents
  const assignedAgents = [
    { id: "1", name: "John Smith", team: "Downtown Team", splitPercentage: 70 },
    {
      id: "2",
      name: "Sarah Johnson",
      team: "Westside Team",
      splitPercentage: 75,
    },
    {
      id: "3",
      name: "Mike Wilson",
      team: "Downtown Team",
      splitPercentage: 70,
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
      teamSplit: 5200,
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
      teamSplit: 3800,
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
      teamSplit: 4400,
      agentNet: 30800,
      date: "2024-01-13",
      status: "Pending",
    },
  ];

  // Calculate splits based on selected agent
  const calculateSplits = () => {
    if (!grossCommission || !selectedAgent) return null;

    const gross = parseFloat(grossCommission);
    const agent = assignedAgents.find((a) => a.id === selectedAgent);
    if (!agent) return null;

    const expSplit = gross * 0.2; // 20% to eXp
    const teamSplit = gross * 0.1; // 10% to team (example)
    const agentNet = gross - expSplit - teamSplit;

    return {
      gross,
      expSplit,
      teamSplit,
      agentNet,
      agentSplitPercentage: agent.splitPercentage,
    };
  };

  const splits = calculateSplits();

  const CreateTransactionDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Transaction for Assigned Agent</DialogTitle>
          <DialogDescription>
            Enter transaction details for file closing. Splits will be
            calculated automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agent" className="text-right">
              Agent
            </Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select assigned agent" />
              </SelectTrigger>
              <SelectContent>
                {assignedAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} - {agent.team}
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
                <h4 className="font-medium">Calculated Splits</h4>
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
                    Team Split
                  </div>
                  <div className="font-medium text-orange-600">
                    ${splits.teamSplit.toLocaleString()}
                  </div>
                </div>
                <div>
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
            onClick={() => setIsCreateDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(false)}
            disabled={!splits}
          >
            Process Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction Processing</h1>
          <p className="text-muted-foreground">
            Process transactions for assigned agents
          </p>
        </div>
        <CreateTransactionDialog />
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Processed
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              eXp Company Intake
            </CardTitle>
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
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Transactions processed for assigned agents
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
                <TableHead>Team Split</TableHead>
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
                    ${transaction.teamSplit.toLocaleString()}
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

export default ExpStaffTransactions;
