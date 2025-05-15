export function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-2 mt-12 text-center">
      <div className="mb-2">&copy; 2025 FundLsk Crowdfunding. All rights reserved.</div>
      <nav className="space-x-4">
        <a href="https://idrx.io" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">Lisk Official</a>
        <a href="/guide" className="hover:text-indigo-400 transition">Guide</a>
        <a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-indigo-400 transition">Terms of Service</a>
      </nav>
    </footer>
  )
}
