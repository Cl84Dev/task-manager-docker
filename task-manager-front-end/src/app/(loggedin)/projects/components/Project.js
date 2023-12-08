"use client";

import { Button, Progress, useDisclosure } from "@nextui-org/react";
import api from "@/api/api";
import { useEffect, useState } from "react";
import ConfirmDeleteProjectModal from "./ConfirmDeleteProjectModal";

export default function Project({ id, title, description, date, openModal }) {
  const [progress, setProgress] = useState(0);
  const [tasksAmount, setTasksAmount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    api.get(`/tasks/${id}`).then((res) => {
      const amount = res.data.length;
      let concludedTasksAmount = res.data.filter(
        (item) => item.status === "Concluída"
      ).length;
      setProgress(Math.round((concludedTasksAmount * 100) / amount));
      setTasksAmount(amount);
    });
  }, []);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="m-3 p-3 shadow-lg max-w-[400px] w-full rounded">
      <h2 className="my-3 text-xl font-bold text-blue-600">
        {title.toUpperCase()}
      </h2>
      <p className="mb-3">{description}</p>
      <div className="flex flex-col">
        <span>Criado em: {formatDate(date)}</span>
        <span>Quantidade de tarefas: {tasksAmount}</span>
      </div>
      <Progress value={progress} className="my-3 w-full" />
      <div className="mb-3 flex flex-row justify-between w-full">
        <Button
          color="primary"
          variant="bordered"
          type="submit"
          size="sm"
          className="font-bold mb-3 w-[110px]"
          onClick={() => location.replace(`/projects/${id}`)}
        >
          Tarefas
        </Button>
        <Button
          color="success"
          variant="bordered"
          type="submit"
          size="sm"
          className="font-bold mb-3 w-[110px]"
          onClick={openModal}
        >
          Editar
        </Button>
        <Button
          color="danger"
          variant="solid"
          type="submit"
          size="sm"
          className="font-bold mb-3 w-[110px]"
          onClick={onOpen}
        >
          Apagar
        </Button>
      </div>
      <ConfirmDeleteProjectModal
        id={id}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </div>
  );
}
