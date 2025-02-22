import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-4xl font-bold mb-8">LouCare Dashboard</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link
          href="/submit-homeless"
          className="flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit as Homeless Person
        </Link>

        <Link
          href="/submit-for-homeless"
          className="flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit on Behalf of Homeless Person
        </Link>
      </div>
    </main>
  )
}
