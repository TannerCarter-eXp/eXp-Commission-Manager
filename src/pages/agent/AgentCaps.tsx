import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  Calendar,
  AlertCircle,
  DollarSign,
} from "lucide-react";

const AgentCaps = () => {
  // Mock agent cap data
  const capData = {
    expCap: {
      type: "16k",
      amount: 16000,
      paid: 13600,
      progress: 85,
      remaining: 2400,
      estimatedCompletion: "2024-02-15",
    },
    externalCap: {
      teamName: "Downtown Real Estate Team",
      amount: 50000,
      paid: 36000,
      progress: 72,
      remaining: 14000,
      yourContribution: 15000,
      estimatedCompletion: "2024-03-20",
    },
    monthlyProjection: {
      avgMonthly: 4500,
      expCapMonthsRemaining: 0.5,
      externalCapMonthsRemaining: 3.1,
    },
  };

  const capHistory = [
    {
      period: "2024",
      expCapAchieved: false,
      externalCapAchieved: false,
      totalCommission: 285000,
      expCapProgress: 85,
      externalCapProgress: 72,
    },
    {
      period: "2023",
      expCapAchieved: true,
      externalCapAchieved: true,
      totalCommission: 425000,
      expCapProgress: 100,
      externalCapProgress: 100,
    },
    {
      period: "2022",
      expCapAchieved: true,
      externalCapAchieved: false,
      totalCommission: 312000,
      expCapProgress: 100,
      externalCapProgress: 78,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cap Progress Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your progress toward eXp and external team caps
        </p>
      </div>

      {/* Cap Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* eXp Company Cap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              eXp Company Cap ({capData.expCap.type})
              <Badge
                variant={
                  capData.expCap.progress > 80 ? "destructive" : "default"
                }
              >
                {capData.expCap.progress}%
              </Badge>
            </CardTitle>
            <CardDescription>
              20% company split until cap is reached
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={capData.expCap.progress} className="h-3" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Paid to Cap</div>
                <div className="text-lg font-bold">
                  ${capData.expCap.paid.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Remaining</div>
                <div className="text-lg font-bold">
                  ${capData.expCap.remaining.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Estimated Completion</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(
                    capData.expCap.estimatedCompletion
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Team Cap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              External Team Cap
              <Badge
                variant={
                  capData.externalCap.progress > 80
                    ? "destructive"
                    : "secondary"
                }
              >
                {capData.externalCap.progress}%
              </Badge>
            </CardTitle>
            <CardDescription>{capData.externalCap.teamName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={capData.externalCap.progress} className="h-3" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Team Total Paid
                </div>
                <div className="text-lg font-bold">
                  ${capData.externalCap.paid.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Remaining</div>
                <div className="text-lg font-bold">
                  ${capData.externalCap.remaining.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Your Contribution
              </div>
              <div className="text-lg font-bold">
                ${capData.externalCap.yourContribution.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">
                  Estimated Team Completion
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(
                    capData.externalCap.estimatedCompletion
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projection Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cap Completion Projections
          </CardTitle>
          <CardDescription>
            Based on your current commission pace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Average Monthly eXp Split</h4>
              <div className="text-2xl font-bold">
                ${capData.monthlyProjection.avgMonthly.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on last 6 months
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">eXp Cap Completion</h4>
              <div className="text-2xl font-bold">
                {capData.monthlyProjection.expCapMonthsRemaining < 1
                  ? `${Math.round(
                      capData.monthlyProjection.expCapMonthsRemaining * 30
                    )} days`
                  : `${capData.monthlyProjection.expCapMonthsRemaining.toFixed(
                      1
                    )} months`}
              </div>
              <div className="text-sm text-muted-foreground">
                At current pace
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">External Cap Completion</h4>
              <div className="text-2xl font-bold">
                {capData.monthlyProjection.externalCapMonthsRemaining.toFixed(
                  1
                )}{" "}
                months
              </div>
              <div className="text-sm text-muted-foreground">
                Team-wide estimate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cap Achievement History */}
      <Card>
        <CardHeader>
          <CardTitle>Cap Achievement History</CardTitle>
          <CardDescription>
            Your cap completion history over the years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {capHistory.map((year, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium">{year.period}</div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={year.expCapAchieved ? "default" : "secondary"}
                    >
                      eXp:{" "}
                      {year.expCapAchieved
                        ? "Achieved"
                        : `${year.expCapProgress}%`}
                    </Badge>
                    <Badge
                      variant={
                        year.externalCapAchieved ? "default" : "secondary"
                      }
                    >
                      External:{" "}
                      {year.externalCapAchieved
                        ? "Achieved"
                        : `${year.externalCapProgress}%`}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${year.totalCommission.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total commission
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cap Benefits Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Understanding Your Caps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">eXp Company Cap Benefits</h4>
              <div className="text-sm text-muted-foreground mt-2">
                <p>
                  • Once you reach your eXp cap, you keep 100% of commission
                  (minus external cap contributions)
                </p>
                <p>• Cap resets annually on your anniversary date</p>
                <p>• Higher caps available with increased production</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium">External Team Cap Benefits</h4>
              <div className="text-sm text-muted-foreground mt-2">
                <p>• Team-wide cap that benefits all team members</p>
                <p>• Once reached, team split percentages may change</p>
                <p>• Contributions are shared across all team members</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCaps;
