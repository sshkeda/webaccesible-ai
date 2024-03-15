import type axe from "axe-core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { c, cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ViolationMessage({
  violation,
}: {
  violation: axe.AxeResults["violations"][0];
}) {
  const { description, id, helpUrl, impact, help } = violation;

  return (
    <Card className="relative mb-4 ">
      <CardHeader>
        <CardTitle className="flex items-center">
          {impact && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle
                  className={cn(
                    "mr-2",
                    impact === "minor" && "stroke-yellow-500",
                    impact === "moderate" && "stroke-orange-500",
                    impact === "serious" && "stroke-red-500",
                    impact === "critical" && "stroke-red-500",
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>{c(impact)} Violation</TooltipContent>
            </Tooltip>
          )}
          {id}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{help}</p>
        <a
          href={helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-muted-foreground underline"
        >
          {helpUrl}
        </a>
      </CardContent>
    </Card>
  );
}
