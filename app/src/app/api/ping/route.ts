export const runtime = "edge";

export function GET() {
  return new Response("", {
    status: 200,
  });
}
