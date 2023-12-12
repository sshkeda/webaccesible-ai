import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export interface Violation {
  description: string;
  help: string;
  helpUrl: string;
  id: string;
  impact: string;
}

export default function ViolationMessage({
  violation,
}: {
  violation: Violation;
}) {
  const { description, id, helpUrl, impact } = violation;
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          {impact}: {id}
        </CardTitle>
        <CardDescription>{helpUrl}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
