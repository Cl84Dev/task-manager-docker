"use client";

import { Button, Spinner, useDisclosure } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Project from "./components/Project";
import api from "@/api/api";
import ModalAddProject from "./components/ModalAddProject";
import ModalEditProject from "./components/ModalEditProject";

export default function Page() {
  const [projects, setProjects] = useState(null);
  const [modalRole, setModalRole] = useState("addProjct");
  const [editModalData, setEditModalData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = (role, data) => {
    if (role === "editProject") {
      setEditModalData({
        id: data.id,
        title: data.title,
        description: data.description,
      });
    }
    setModalRole(role);
    onOpen();
  };

  useEffect(() => {
    api
      .get("/project")
      .then((res) => {
        toast.success(res.data.message);
        setProjects(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  }, []);
  return (
    <main className="m-3 flex flex-col justify-center items-center">
      <h1 className="my-3 text-3xl font-bold text-blue-600">Projetos</h1>
      <Button
        color="primary"
        variant="solid"
        type="submit"
        className="font-bold mb-3"
        onClick={() => openModal("addProject")}
      >
        Adicionar projeto
      </Button>

      {projects && projects.length === 0 && (
        <div className="my-3">
          Nada por aqui... Comece adicionando um projeto.
        </div>
      )}

      {projects ? (
        projects.map((item) => (
          <Project
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            date={item.date}
            openModal={() =>
              openModal("editProject", {
                id: item._id,
                title: item.title,
                description: item.description,
              })
            }
          />
        ))
      ) : (
        <Spinner size="lg" className="my-5" />
      )}

      {modalRole === "addProject" ? (
        <ModalAddProject isOpen={isOpen} onOpenChange={onOpenChange} />
      ) : (
        <ModalEditProject
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          id={editModalData.id}
          title={editModalData.title}
          description={editModalData.description}
        />
      )}
    </main>
  );
}
