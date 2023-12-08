"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";
import api from "@/api/api";
import ConfirmDeleteTaskModal from "./ConfirmDeleteTaskModal";

export default function Task({
  id,
  title,
  description,
  status,
  priority,
  date,
  openModal,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const priorityBackgroundColor = (priority) => {
    switch (priority) {
      case "Média":
        return "bg-yellow-50";
      case "Alta":
        return "bg-red-50";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${priorityBackgroundColor(
        priority
      )} m-3 p-3 shadow-lg max-w-[400px] w-full rounded`}
    >
      <h2 className="my-3 text-xl font-bold text-blue-600">
        {title.toUpperCase()}
      </h2>
      <p className="mb-3">{description}</p>
      <div className="mb-3 flex flex-row justify-between w-full">
        <span>Prioridade: {priority}</span>
      </div>
      <span>Criado em: {formatDate(date)}</span>
      <div className="my-3 flex flex-row justify-around w-full">
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
      <ConfirmDeleteTaskModal
        id={id}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </div>
  );
}
