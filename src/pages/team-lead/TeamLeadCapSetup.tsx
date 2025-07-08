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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Target, DollarSign, TrendingUp } from "lucide-react";

const TeamLeadCapSetup = () => {
  const [capAmount, setCapAmount] = useState("50000");
  const [capDescription, setCapDescription] = useState(
    "Team external cap for additional commission splits"
  );
  const [capMode, setCapMode] = useState("external");

  // Mock current cap data
  const currentCap = {
    amount: 50000,
    paid: 32000,
    progress: 64,
    description: "Team external cap for additional commission splits",
    mode: "external",
    contributors: [
      { name: "John Smith", contributed: 12000, percentage: 37.5 },
      { name: "Sarah Johnson", contributed: 9500, percentage: 29.7 },
      { name: "Mike Wilson", contributed: 10500, percentage: 32.8 },
    ],
  };

  const handleSave = () => {
    // In real app, this would save to API
    console.log("Saving cap configuration:", {
      amount: capAmount,
      description: capDescription,
      mode: capMode,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">External Cap Setup</h1>
          <p className="text-muted-foreground">
            Configure your team's external cap amount and rules
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>

      {/* Current Cap Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Current External Cap Status
          </CardTitle>
          <CardDescription>
            Progress towards your team's external cap goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentCap.progress}%
              </span>
            </div>
            <Progress value={currentCap.progress} className="h-2" />
            <div className="flex justify-between text-sm">
              <span>${currentCap.paid.toLocaleString()} paid</span>
              <span>${currentCap.amount.toLocaleString()} target</span>
            </div>
            <div className="text-sm text-muted-foreground">
              ${(currentCap.amount - currentCap.paid).toLocaleString()}{" "}
              remaining to reach cap
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cap Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Cap Configuration</CardTitle>
            <CardDescription>
              Set up your external cap amount and rules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capAmount">External Cap Amount</Label>
              <Input
                id="capAmount"
                type="number"
                placeholder="50000"
                value={capAmount}
                onChange={(e) => setCapAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capMode">Cap Mode</Label>
              <Select value={capMode} onValueChange={setCapMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cap mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="external">External Cap Only</SelectItem>
                  <SelectItem value="general">General Split Only</SelectItem>
                  <SelectItem value="hybrid">Hybrid Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capDescription">Cap Description</Label>
              <Textarea
                id="capDescription"
                placeholder="Describe the purpose and rules for this cap"
                value={capDescription}
                onChange={(e) => setCapDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">Cap Mode Explanation</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {capMode === "external" && (
                  <p>
                    • Commission percentage goes toward external cap until
                    reached
                  </p>
                )}
                {capMode === "general" && (
                  <p>• Fixed percentage split between agent and team lead</p>
                )}
                {capMode === "hybrid" && (
                  <div>
                    <p>• Combination of external cap and general split</p>
                    <p>
                      • External cap takes priority, then general split on
                      remainder
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cap Contributors */}
        <Card>
          <CardHeader>
            <CardTitle>Cap Contributors</CardTitle>
            <CardDescription>
              How each team member contributes to the cap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCap.contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <div className="font-medium">{contributor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {contributor.percentage.toFixed(1)}% of total
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${contributor.contributed.toLocaleString()}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cap History & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cap Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Monthly Progress</h4>
              <div className="text-2xl font-bold">
                ${currentCap.paid.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                +${(currentCap.paid * 0.15).toLocaleString()} this month
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Estimated Completion</h4>
              <div className="text-2xl font-bold">Mar 2024</div>
              <div className="text-sm text-muted-foreground">
                Based on current pace
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Team Efficiency</h4>
              <div className="text-2xl font-bold">127%</div>
              <div className="text-sm text-muted-foreground">
                Above target pace
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadCapSetup;
