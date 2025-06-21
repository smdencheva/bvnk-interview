# BVNK Interview App

This repository contains the BVNK Interview payment flow application built with Next.js 15 App Router, TypeScript, Tailwind CSS, and ShadCN UI components. It includes two main routes for accepting and paying quotes via cryptocurrency, complete with timers, clipboard copy, and QR code integration.

---

## Prerequisites

* **Node.js**: v20.x or higher (we recommend using the latest LTS)
* **npm** (v10+) or **yarn**
* **Git** for cloning the repository

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/smdencheva/bvnk-interview.git
   cd bvnk-interview
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file at the project root with the following variables:

   ```ini
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically reload as you make changes.

---

## Testing

This project uses [Vitest](https://vitest.dev/) and React Testing Library.

* All test files live alongside their components under `src/app/`.
* Global mocks and setup are defined in `src/test/setup.ts`.
* Coverage reports are output to the `coverage/` folder.

To run automated tests:

```bash
npm test
# or
yarn test
```

---

## Manual Testing

Follow these steps to verify the key user flows:

1. **Accept Quote**

    * Start the dev server: `npm run dev`.
    * Navigate to `/payin/<UUID>` (replace `<UUID>` with a valid quote ID).
    * Confirm the merchant name, display amount, and reference number appear correctly.
    * Choose a different currency from the dropdown and verify the amount due updates.
    * Click **Confirm** and ensure you're redirected to `/payin/<UUID>/pay`.

2. **Pay Quote**

    * On `/payin/<UUID>/pay`, verify:

        * The QR code renders correctly.
        * The amount due, wallet address, and countdown timer display.
        * Copy buttons for amount and address place the correct text on the clipboard.
    * Click **Cancel** and ensure you're redirected to `/payin/<UUID>/expired`.

3. **Expiry Page**

    * Navigate directly to `/payin/<UUID>/expired` where the quote is expired.
    * Verify the expired message and UI match the design.

---

## Architecture & Conventions

* **App Router**: all pages and layouts under `src/app/` following Next.js conventions.
* **TypeScript**: strict mode enabled.
* **Styling**:

    * Tailwind CSS v4 for utility classes.
    * ShadCN UI components in `src/components/ui/`.
    * BEM naming for any CSS modules.
* **Data fetching**: server‐side via Next.js route handlers or async Server Components.
* **Icons**: `lucide-react`.
* **Animations**: `tw-animate-css`.

---

## Deploying

The app can be deployed to Vercel (recommended) or any Node.js hosting:

1. Push to GitHub.
2. Configure Vercel to use the `bvnk-interview` repo.
3. Set environment variables in Vercel dashboard.
4. Vercel automatically runs `npm run build` and deploys.

---

Happy coding! 🚀
