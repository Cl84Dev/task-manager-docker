import Link from "next/link";

export default function Page() {
  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <div className="max-w-[800px]">
        <h1 className="my-3 text-3xl text-center font-bold text-blue-600">
          Sobre
        </h1>
        <p className="text-justify">
          Gerenciador de Tarefas é uma aplicação web para gerenciamento de
          tarefas. Existem outras ferramentas mais robustas para essa finalidade
          no mercado, como o Jira, no qual esta aplicação foi inspirada. Porém,
          Gerenciador de Tarefas busca ser uma alternativa simples para o
          gerenciamento de pequenos projetos, como projetos de estudo de
          desenvolvedores de software iniciantes. Naturalmente, a aplicação pode
          ser usada por qualquer nível de usuário, e não se limitando apenas à
          área de desenvolvimento de software, mas sendo útil para gerenciar
          qualquer tipo de projeto.
        </p>
      </div>
      <div className="max-w-[800px]">
        <h2 className="my-3 text-2xl text-center font-bold text-blue-600">
          Como funciona?
        </h2>
        <p className="text-justify">
          Crie uma conta gratuíta e acesse os seus projetos de onde desejar. Um
          email válido não é obrigatório, mas somente com um você conseguirá
          recuperar sua senha, caso necessário. Após entrar com o seu usuário e
          senha, você irá para a página de projetos. Nela será possível
          adicionar um projeto, atribuindo-lhe um título e uma descrição. Uma
          vez adicionado o projeto, clique em tarefas e será direcionado para a
          página onde as tarefas serão exibidas numa lista. Nessa tela será
          possível adicionar as tarefas propriamente ditas, atribuindo-lhes
          título, descrição e prioridade. Uma vez adicionada a tarefa, será
          possível editá-la e mudar o seu status, que pode ser Adicionada, Em
          andamento e Concluída. Você também poderá apagar as tarefas
          individualmente. Se você apagar um projeto, todas as tarefas
          relacionadas a ele serão igualmente apagadas.
        </p>
      </div>
      <div className="max-w-[800px]">
        <h2 className="my-3 text-2xl text-center font-bold text-blue-600">
          Como foi desenvolvido?
        </h2>
        <p className="text-justify">
          Gerenciador de Tarefas é um clássico MERN, que foi construído com
          Mongo DB para o banco de dados, Express para o backend e React para o
          frontend. No backend, foram usadas bibliotecas para cuidar da criação
          de tokens de autenticação, da criptografia das senhas e do envio de
          email com o código para recuperação de senhas. No frontend, foi usado
          o framework Next JS e Tailwind para estilização. Foi usado a
          biblioteca Next UI, que proveu muitos elementos, como os inputs,
          modais, botões e assim por diante. Também foi usada a biblioteca React
          Toastify para os toasts.
        </p>
      </div>
      <div className="max-w-[800px]">
        <h2 className="my-3 text-2xl text-center font-bold text-blue-600">
          O que mais vem agora?
        </h2>
        <p className="text-justify">
          Além de estar atentos a possíveis bugs e melhoramentos na navegação da
          aplicação, planejamos desenvolver novas features. Uma delas é a
          criação de uma página para gerenciamento de usuário, onde ele poderá
          mudar o seu email, seu nome e sua senha. Nós estamos abertos a
          sugestões para esse melhoramentos e novas features. Fale comigo no{" "}
          <Link
            className="text-blue-600 hover:text-blue-500 font-bold"
            href="https://www.linkedin.com/in/cl84dev/"
          >
            Linkedin
          </Link>
          . Terei o maior prazer em atendê-lo(a).
        </p>
      </div>
    </main>
  );
}
