"use client";

import api from "@/api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";

import ModalAddTask from "./components/ModalAddTask";
import Task from "./components/Task";
import ModalEditTask from "./components/ModalEditTask";

export default function Page({ params }) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [modalRole, setModalRole] = useState("addTask");
  const [modalData, setModalData] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = (role, data) => {
    if (role === "editTask") {
      setModalData(data);
    }
    setModalRole(role);
    onOpen();
  };

  useEffect(() => {
    api
      .get(`project/${params.project}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        toast.error(err.response.data.error);
        setTimeout(() => {
          location.replace("/projects");
        }, 3000);
      });

    api
      .get(`tasks/${params.project}`)
      .then((res) => setTasks(res.data))
      .catch((err) => {
        toast.error(err.response.data.error);
        setTimeout(() => {
          location.replace("/projects");
        }, 3000);
      });
  }, []);

  if (!project) {
    return (
      <main className="m-3 flex flex-col justify-center items-center">
        <Spinner size="lg" className="my-5" />
      </main>
    );
  }

  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <h1 className="my-3 text-3xl font-bold text-blue-600 text-center">
        {project && `Projeto: ${project.title}`}
      </h1>
      <div className="flex flex-row gap-3 mb-3">
        <Button
          color="primary"
          variant="bordered"
          type="submit"
          className="font-bold mb-3"
          onClick={() => location.replace("/projects")}
        >
          Voltar para projetos
        </Button>
        <Button
          color="primary"
          variant="solid"
          type="submit"
          className="font-bold mb-3 w-[175.63px]"
          onClick={() => openModal("addTask")}
        >
          Adicionar tarefa
        </Button>
      </div>

      {tasks && tasks.length === 0 && (
        <div className="my-3">
          Nada por aqui... Comece adicionando uma tarefa.
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
          <div className="p-3 flex flex-col items-center w-full md:w-1/3 shadow-lg rounded">
            <h2 className="text-2xl text-blue-600 font-bold z-10 p-3 shadow-sm bg-white rounded sticky top-[80px] md:p-0 md:shadow-none md:bg-transparent md:rounded-none md:static">
              Adicionadas
            </h2>
            {tasks ? (
              tasks
                .filter((item) => item.status === "Adicionada")
                .map((item) => (
                  <Task
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    priority={item.priority}
                    date={item.date}
                    openModal={() =>
                      openModal("editTask", {
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                        priority: item.priority,
                      })
                    }
                  />
                ))
            ) : (
              <Spinner size="lg" className="my-5" />
            )}
          </div>
          <div className="p-3 flex flex-col items-center w-full md:w-1/3 shadow-lg rounded">
            <h2 className="text-2xl text-blue-600 font-bold z-10 p-3 shadow-sm bg-white rounded sticky top-[80px] md:p-0 md:shadow-none md:bg-transparent md:rounded-none md:static">
              Em andamento
            </h2>
            {tasks ? (
              tasks
                .filter((item) => item.status === "Em andamento")
                .map((item) => (
                  <Task
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    priority={item.priority}
                    date={item.date}
                    openModal={() =>
                      openModal("editTask", {
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                        priority: item.priority,
                      })
                    }
                  />
                ))
            ) : (
              <Spinner size="lg" className="my-5" />
            )}
          </div>
          <div className="p-3 flex flex-col items-center w-full md:w-1/3 shadow-md rounded">
            <h2 className="text-2xl text-blue-600 font-bold z-10 p-3 shadow-sm bg-white rounded sticky top-[80px] md:p-0 md:shadow-none md:bg-transparent md:rounded-none md:static">
              Concluídas
            </h2>
            {tasks ? (
              tasks
                .filter((item) => item.status === "Concluída")
                .map((item) => (
                  <Task
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    priority={item.priority}
                    date={item.date}
                    openModal={() =>
                      openModal("editTask", {
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                        priority: item.priority,
                      })
                    }
                  />
                ))
            ) : (
              <Spinner size="lg" className="my-5" />
            )}
          </div>
        </div>
      )}

      {modalRole === "addTask" ? (
        <ModalAddTask
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          projectId={project._id}
        />
      ) : (
        <ModalEditTask
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          taskId={modalData.id}
          title={modalData.title}
          description={modalData.description}
          status={modalData.status}
          priority={modalData.priority}
        />
      )}
    </main>
  );
}
