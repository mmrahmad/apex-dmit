import LoginForm from "#/components/login/LoginForm";

export default function Home() {
  return (
    <main className="container">
      <div className="grid h-full min-h-screen grid-cols-2 items-center justify-center">
        <div>Test</div>
        <div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
