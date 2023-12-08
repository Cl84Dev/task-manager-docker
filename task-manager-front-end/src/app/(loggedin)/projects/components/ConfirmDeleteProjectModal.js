import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/api/api";

export default function ConfirmDeleteProjectModal({
  id,
  isOpen,
  onOpenChange,
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteProject = () => {
    setIsDisabled(true);
    api
      .delete(`/project/${id}`)
      .then((res) => {
        toast.success(res.data.message);

        setTimeout(() => {
          setIsDisabled(true);
          location.reload();
        }, 3000);
      })
      .catch((err) => {
        setIsDisabled(true);
        toast.error(err.response.data.error);
        console.log(err);
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="p-3"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <h2 className="text-xl font-bold text-blue-600">
                Apagar projeto
              </h2>
              <p>
                O projeto e suas tarefas serão apagados. Essa operação não pode
                ser desfeita. Deseja continuar?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="bordered"
                onClick={onClose}
                className="font-bold mb-3 w-[110px]"
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                isDisabled={isDisabled}
                onClick={deleteProject}
                className="font-bold mb-3 w-[110px]"
              >
                Apagar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
