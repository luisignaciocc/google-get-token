import { TokenExchangeComponent } from "@/components/token-exchange";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Suspense>
        <TokenExchangeComponent />
      </Suspense>
    </main>
  );
}
