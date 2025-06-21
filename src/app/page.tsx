import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-background text-foreground font-sans">
      {/* Logo */}
      <header className="mb-8">
        <Image
          src="/bvnk.svg"
          alt="BVNK Logo"
          width={93}
          height={27}
          priority
        />
      </header>

      {/* Intro Section */}
      <main className="flex-1 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">BVNK Interview App</h1>
        <p className="mb-6">
          This application demonstrates a payment flow built with Next.js 15 App
          Router, TypeScript, Tailwind CSS, and ShadCN UI components. Users can
          accept quotes, pay with cryptocurrency, and see expiry states—all with
          server-side fetching, timers, QR codes, and clipboard copy.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-1 font-mono">
            <li>
              Clone the repo:
              <code className="ml-2 px-2 py-1 bg-muted rounded">
                git clone https://github.com/your-org/bvnk-interview.git
              </code>
            </li>
            <li>
              Install dependencies:
              <code className="ml-2 px-2 py-1 bg-muted rounded">
                npm install
              </code>
            </li>
            <li>
              Run development server:
              <code className="ml-2 px-2 py-1 bg-muted rounded">
                npm run dev
              </code>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Quick Manual Tests</h2>
          <ul className="list-disc list-inside space-y-1 font-mono">
            <li>
              Accept Quote: Navigate to <code>/payin/&lt;UUID&gt;</code>.
            </li>
            <li>
              Pay Quote: On <code>/payin/&lt;UUID&gt;/pay</code>, verify QR
              code, copy buttons.
            </li>
            <li>
              Expiry: Visit <code>/payin/&lt;UUID&gt;/expired</code> for expired
              state.
            </li>
          </ul>
        </section>
      </main>

      <footer className="mt-8 text-sm text-secondary">
        © {new Date().getFullYear()} BVNK Interview App.
      </footer>
    </div>
  );
}
