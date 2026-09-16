import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0c10] text-white p-4 text-center">
      <div className="text-8xl font-bold font-mono text-[#00f0ff] mb-4">404</div>
      <h1 className="text-2xl sm:text-4xl font-light mb-2">Page Not Found</h1>
      <p className="text-sm font-mono text-zinc-400 max-w-md mb-8">
        The requested system coordinate does not exist.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00f0ff] text-black font-mono font-bold text-xs hover:bg-[#00d8e6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Orbit</span>
      </Link>
    </div>
  );
}
