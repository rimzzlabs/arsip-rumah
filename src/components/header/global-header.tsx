import { GlobalNavbar } from "./global-navbar";

export function GlobalHeader() {
  return (
    <header className="fixed inset-x-0 top-0 border-b">
      <div className="mx-auto flex h-16 w-11/12 max-w-4xl items-center justify-between">
        <span className="text-lg font-bold">Arsip Rumah</span>

        <GlobalNavbar />
      </div>
    </header>
  );
}
