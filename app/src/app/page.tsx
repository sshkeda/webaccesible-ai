import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <main>
      <div className="mt-64">
        <h1 className="text-center text-3xl">
          WebAccessible<span className="italic">.ai</span>
        </h1>
        <h2 className="text-center text-zinc-400">
          <Balancer>
            Expanding accessibility throughout the web by utilizing AI
            technology
          </Balancer>
        </h2>
      </div>
    </main>
  );
}
