"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "../../components/EyeslashFilledIcon.js";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../api/api.js";

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);
  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(30, "Permitido até 30 caracteres")
          .required("Campo obrigatório"),
        username: Yup.string()
          .max(10, "Permitido até 10 caracteres")
          .required("Campo obrigatório"),
        email: Yup.string()
          .email("Formato inválido")
          .required("Campo obrigatório"),
        password: Yup.string()
          .min(6, "Permitido a partir de 6 caracteres")
          .max(10, "Permitido até 10 caracteres")
          .required("Campo obrigatório"),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Precisa ser igual à senha")
          .required("Campo obrigatório"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsDisabled(true);
        const payload = {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        };
        api
          .post("/signup", payload)
          .then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
              location.replace("/login");
            }, 3000);
          })
          .catch((err) => {
            toast.error(err.response.data.error);
            setTimeout(() => {
              setIsDisabled(false);
            }, 3000);
          });
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form className="m-3 p-3 shadow-lg flex flex-col justify-center items-center gap-3 max-w-[400px] w-full rounded">
          <Input
            type="text"
            label="Nome"
            placeholder="Seu Nome"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.name}
            </div>
          ) : null}

          <Input
            type="text"
            label="Usuário"
            placeholder="nomedeusuario"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.username}
            </div>
          ) : null}

          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="usuario@email.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.email}
            </div>
          ) : null}

          <Input
            label="Senha"
            placeholder="Digite uma senha"
            {...formik.getFieldProps("password")}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.password}
            </div>
          ) : null}

          <Input
            label="Repita sua senha"
            placeholder="Repita sua senha"
            {...formik.getFieldProps("repeatPassword")}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityRepeat}
              >
                {isVisibleRepeat ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleRepeat ? "text" : "password"}
            className="w-full"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.repeatPassword}
            </div>
          ) : null}

          <Button
            color="primary"
            variant="solid"
            type="submit"
            isDisabled={isDisabled}
            className="font-bold"
          >
            Registrar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
