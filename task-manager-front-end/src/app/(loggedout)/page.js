import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="p-5 my-3 h-1/2 flex flex-col justify-center items-center w-full bg-blue-400">
        <div className="bg-blue-600 p-3 rounded shadow-lg">
          <Image src="/logo.png" height={500} width={500} alt="Logo" />
        </div>
        <span className="text-white text-xl font-bold my-3">
          Organize. Realize. Simplifique.
        </span>
        <div className="flex flex-row gap-3">
          <Link href="/login">
            <div className="flex justify-center items-center border-solid border-3 w-[100px] h-[40px] text-white font-bold hover:bg-blue-500 transition-colors">
              Entrar
            </div>
          </Link>
          <Link href="/signup">
            <div className="flex justify-center items-center  w-[100px] h-[40px] text-blue-400 bg-white font-bold hover:bg-blue-100 transition-colors">
              Registrar
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
