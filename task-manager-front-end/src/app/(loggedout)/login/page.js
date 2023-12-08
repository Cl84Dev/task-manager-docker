import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <h1 className="my-3 text-3xl font-bold text-blue-600">Entrar</h1>
      <LoginForm />
    </main>
  );
}
