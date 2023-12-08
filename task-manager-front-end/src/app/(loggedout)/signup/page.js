import SignupForm from "./components/SignupForm";

export default function Page() {
  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <h1 className="my-3 text-3xl font-bold text-blue-600">Registrar</h1>
      <SignupForm />
    </main>
  );
}
