// One codebase, several iPhone apps: VITE_APP picks which one this build is.
const app = import.meta.env.VITE_APP ?? 'kanban'

export default function App() {
  if (app === 'test') {
    return (
      <main className="hello test">
        <h1>test app</h1>
      </main>
    )
  }
  return (
    <main className="hello">
      <h1>hello</h1>
    </main>
  )
}
