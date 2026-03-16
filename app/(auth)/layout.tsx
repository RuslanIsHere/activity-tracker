type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10">
      <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
        <section className="hidden space-y-6 lg:block">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            AT
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Activity Tracker
            </p>
            <h1 className="max-w-md text-4xl font-semibold tracking-tight text-balance">
              Build consistency with a cleaner view of your daily progress.
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Create an account to log activities, keep routines visible, and
              turn small daily actions into momentum.
            </p>
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          {props.children}
        </section>
      </div>
    </main>
  )
}
