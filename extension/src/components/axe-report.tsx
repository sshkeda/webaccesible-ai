import { p } from "@/lib/utils";
import axe from "axe-core";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";

export default function AxeReport({ results }: { results: axe.AxeResults }) {
  return (
    <Card className="relative scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-thumb-rounded-full dark:scrollbar-thumb-zinc-700">
      <CardHeader>
        <CardTitle>
          {results.testEngine.name} v{results.testEngine.version} results
          <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-3 h-7 w-7 text-muted-foreground"
              >
                <Info className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm text-muted-foreground">
                Test Date: {new Date(results.timestamp).toLocaleString()}
              </p>
              <p className="break-words text-sm text-muted-foreground">
                URL: {results.url}
              </p>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Results
            results={results.violations}
            label={`${results.violations.length} Violation${p(results.violations.length)}`}
          />
          <Results
            results={results.incomplete}
            label={`${results.incomplete.length} Incomplete`}
          />
          <Results
            results={results.passes}
            label={`${results.passes.length} Pass${p(results.passes.length, "es")}`}
          />
          <Results
            results={results.inapplicable}
            label={`${results.inapplicable.length} Inapplicable`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Results({ results, label }: { results: axe.Result[]; label: string }) {
  // sort by impact critical -> serious -> moderate -> minor

  const impactLevel = {
    critical: 4,
    serious: 3,
    moderate: 2,
    minor: 1,
    none: 0,
  };

  results.sort((a, b) => {
    return (
      impactLevel[b.impact || "none"] - impactLevel[a.impact || "none"] ||
      a.id.localeCompare(b.id)
    );
  });

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full data-[state=open]:bg-accent"
          disabled={results.length === 0}
        >
          {label}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Accordion type="single" collapsible className="w-full">
          {results.map(({ id, description, impact }, index) => {
            return (
              <AccordionItem key={index} value={id}>
                <AccordionTrigger>
                  <span className="flex items-center gap-x-2">
                    {impact && (
                      <Badge
                        className="h-3 w-3 no-underline"
                        variant={impact}
                      />
                    )}
                    {id}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{description}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CollapsibleContent>
    </Collapsible>
  );
}
