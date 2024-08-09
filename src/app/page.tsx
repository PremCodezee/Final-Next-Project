import Link from "next/link";
import { Code } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Code size={48} className="mb-8 text-blue-400" />
      <h1 className="text-4xl font-bold mb-8">TechApp</h1>
      <div className="space-x-4">
        <Link href="/signup" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition duration-300">
          Sign Up
        </Link>
        <Link href="/login" className="px-4 py-2 border border-blue-500 hover:bg-blue-500 rounded transition duration-300">
          Login
        </Link>
      </div>
    </div>
  );
}