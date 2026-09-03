import Link from "next/link";
import ForgeUICanvas from "@/components/ForgeUICanvas";

const capabilities = [
  {
    number: "01",
    title: "Think in systems",
    description:
      "Turn rough ideas into clear, reusable interface foundations.",
  },
  {
    number: "02",
    title: "Generate with intent",
    description:
      "Move from prompt to polished UI without losing your point of view.",
  },
  {
    number: "03",
    title: "Ship with confidence",
    description:
      "Keep every detail consistent as your product grows and changes.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950 dark:bg-[#030303] dark:text-white">
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden border-b border-zinc-200 bg-[#fafafa] dark:border-white/10 dark:bg-[#030303]">
        <ForgeUICanvas />
      </section>

      {/* WORKFLOW */}
      <section
        id="workflow"
        className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-[#030303]"
      >
        <div className="mx-auto max-w-6xl px-6 py-28 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* Heading */}
            <div>
              <p className="text-sm font-medium text-zinc-400 dark:text-white/45">
                The Forge-UI approach
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-4xl">
                Less friction.
                <br />
                More making.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-zinc-500 dark:text-white/60">
                A focused toolkit for teams who care about how an experience
                feels, not just how fast it ships.
              </p>
            </div>

            {/* Workflow */}
            <div className="space-y-0">
              {capabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="group flex gap-6 border-t border-zinc-200 py-7 dark:border-white/10"
                >
                  <span className="pt-1 text-xs font-medium tabular-nums text-zinc-400 dark:text-white/40">
                    {capability.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-base font-medium tracking-tight text-zinc-950 dark:text-white">
                      {capability.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500 dark:text-white/55">
                      {capability.description}
                    </p>
                  </div>

                  <span className="pt-1 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-zinc-950 dark:text-white/35 dark:group-hover:text-white">
                    ↗
                  </span>
                </article>
              ))}

              <div className="border-t border-zinc-200 dark:border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="about"
        className="border-b border-zinc-200 bg-[#fafafa] dark:border-white/10 dark:bg-[#030303]"
      >
        <div className="mx-auto max-w-6xl px-6 py-32 text-center lg:px-8">
          <p className="text-sm font-medium text-zinc-400 dark:text-white/45">
            Start with a blank canvas
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-5xl">
            Your best interface is still an idea.
          </h2>

          <Link
            href="/dashboard"
            className="mt-9 inline-flex h-11 items-center rounded-lg bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Enter Forge-UI
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-6xl items-center justify-between bg-[#fafafa] px-6 py-7 text-xs text-zinc-400 dark:bg-[#030303] dark:text-white/40 lg:px-8">
        <span className="font-medium text-zinc-600 dark:text-white/70">Forge-UI</span>
        <span>Made for the next idea.</span>
      </footer>
    </main>
  );
}
