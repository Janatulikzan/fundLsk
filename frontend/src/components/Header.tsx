import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white p-5 flex justify-between items-center">
      <div className="text-2xl font-bold">FundLsk</div>
      <nav className="space-x-6">
        <Link to="/" className="hover:text-blue-300 transition hover:underline">Home</Link>
        <Link to="/guide" className="hover:text-blue-300 transition hover:underline">Guide</Link>
        <Link to="/create" className="hover:text-blue-300 transition hover:underline">Create</Link>
        <Link to="/wallet" className="mt-4 px-4 py-2 font-semibold
        bg-gradient-to-r from-pink-500 to-blue-400 hover:from-pink-700 hover:to-blue-600
        rounded transition">Wallet</Link>
      </nav>
    </header>
  )
}
