import Link from "next/link";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-lg items-center justify-between border-b py-2 shadow-sm">
      <Link href="/" className="text-lg">
        WebAccessible<span className="italic">.ai</span>
      </Link>
      <div className="space-x-2">
        <Link href="https://github.com/sshkeda/waccesible.ai">
          <Github className="h-6 w-6 " />
        </Link>
      </div>
    </nav>
  );
}
