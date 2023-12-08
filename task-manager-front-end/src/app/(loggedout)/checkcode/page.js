import CheckCodeForm from "./components/CheckCodeForm";

export default function Page() {
  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <h1 className="my-3 text-3xl font-bold text-blue-600">Recuperar Senha</h1>
      <CheckCodeForm />
    </main>
  );
}
