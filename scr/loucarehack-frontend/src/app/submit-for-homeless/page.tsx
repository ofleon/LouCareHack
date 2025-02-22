import Link from 'next/link'
import { SubmitButton } from '@/components/submit-button'

export default function SubmitForHomeless() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Submit on Behalf of Homeless Person</h1>
          <Link
            href="/"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">Form for case workers and volunteers to submit on behalf of homeless individuals</p>
          {/* Form fields will be added here once backend API is ready */}
          <div className="flex justify-end mt-6">
            <SubmitButton className="bg-green-600 hover:bg-green-700">
              Submit
            </SubmitButton>
          </div>
        </div>
      </div>
    </main>
  )
}
