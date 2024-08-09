import Link from "next/link";

export default function UserProfile({ params }: any) {
  return (

 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6">
  <h1 className="text-4xl font-bold text-white mb-4">Profile</h1>
  <hr className="border-t border-gray-700 w-full mb-4" />
  <p className="text-3xl text-gray-300">
    Profile page
    <span className="ml-2 p-2 rounded-lg bg-orange-600 text-black font-semibold">
      {params.id}
    </span>
  </p>
  <Link href="/profile">
    <button className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300">
      Back to Profile
    </button>
  </Link>
</div>

  );
}
