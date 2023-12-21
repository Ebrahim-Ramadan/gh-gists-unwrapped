
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <Link
        href="/"
        className="bg-[#F8F9FA] text-black p-2 transition duration-200 ease-in-out rounded-lg font-bold hover:bg-gray-300"
      >
        Go home nigga
      </Link>
    </main>
  );
}