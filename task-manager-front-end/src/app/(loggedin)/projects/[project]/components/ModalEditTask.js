"use client";

import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/api/api";

export default function ModalEditTask({
  isOpen,
  onOpenChange,
  taskId,
  title,
  description,
  status,
  priority,
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      placement="top-center"
      className="p-3"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-bold text-blue-600">Editar Tarefa</h2>
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  title: title,
                  description: description,
                  priority: priority,
                  status: status,
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Campo obrigatório"),
                  description: Yup.string().required("Campo obrigatório"),
                  priority: Yup.string().required("Campo obrigatório"),
                  status: Yup.string().required("Campo obrigatório"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setIsDisabled(true);
                  const payload = {
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    status: values.status,
                  };

                  api
                    .patch(`/task/${taskId}`, payload)
                    .then((res) => {
                      toast.success(res.data.message);
                      setTimeout(() => {
                        onClose();
                        location.reload();
                      }, 3000);
                    })
                    .catch((err) => {
                      toast.error(err.response.data.error);
                      setTimeout(() => {
                        onClose();
                        setIsDisabled(false);
                      }, 3000);
                    });
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <Form className="p-3 shadow-lg flex flex-col justify-center items-center gap-3 max-w-[400px] w-full rounded">
                    <Input
                      type="text"
                      label="Título"
                      name="title"
                      placeholder="Título"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-red-500 text-xs font-bold mb-2">
                        {formik.errors.title}
                      </div>
                    ) : null}

                    <Textarea
                      label="Descrição"
                      labelPlacement="inside"
                      placeholder="Descreva a tarefa"
                      className="w-full"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-red-500 text-xs font-bold mb-2">
                        {formik.errors.description}
                      </div>
                    ) : null}

                    <div className="flex flex-row justify-around gap-3 w-full">
                      <div className="flex flex-col w-1/2">
                        <Select
                          label="Prioridade"
                          placeholder="Selecione uma prioridade"
                          defaultSelectedKeys={[priority]}
                          {...formik.getFieldProps("priority")}
                        >
                          <SelectItem key="Baixa" value="Baixa">
                            Baixa
                          </SelectItem>
                          <SelectItem key="Média" value="Média">
                            Média
                          </SelectItem>
                          <SelectItem key="Alta" value="Alta">
                            Alta
                          </SelectItem>
                        </Select>
                        {formik.touched.priority && formik.errors.priority ? (
                          <div className="text-red-500 text-xs font-bold mb-2">
                            {formik.errors.priority}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col w-1/2">
                        <Select
                          label="Status"
                          placeholder="Selecione um status"
                          defaultSelectedKeys={[status]}
                          {...formik.getFieldProps("status")}
                        >
                          <SelectItem key="Adicionada" value="Adicionada">
                            Adicionada
                          </SelectItem>
                          <SelectItem key="Em andamento" value="Em andamento">
                            Em andamento
                          </SelectItem>
                          <SelectItem key="Concluída" value="Concluída">
                            Concluída
                          </SelectItem>
                        </Select>
                        {formik.touched.status && formik.errors.status ? (
                          <div className="text-red-500 text-xs font-bold mb-2">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-row justify-around w-full">
                      <Button
                        color="danger"
                        variant="bordered"
                        onPress={onClose}
                      >
                        Cancelar
                      </Button>

                      <Button
                        color="primary"
                        variant="solid"
                        type="submit"
                        isDisabled={isDisabled}
                        className="font-bold"
                      >
                        Editar
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
