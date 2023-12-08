"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/EyeFilledIcon.js";
import { EyeSlashFilledIcon } from "../../components/EyeslashFilledIcon.js";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../api/api.js";
import Link from "next/link.js";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Formik
      initialValues={{
        username: "",

        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(10, "Permitido até 10 caracteres")
          .required("Campo obrigatório"),

        password: Yup.string()
          .min(6, "Permitido a partir de 6 caracteres")
          .max(10, "Permitido até 10 caracteres")
          .required("Campo obrigatório"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsDisabled(true);
        const payload = {
          username: values.username,

          password: values.password,
        };
        api
          .post("/login", payload)
          .then((res) => {
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("logged", true);
            setTimeout(() => {
              location.replace("/projects");
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
            label="Senha"
            placeholder="Digite sua senha"
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

          <Button
            color="primary"
            variant="solid"
            type="submit"
            isDisabled={isDisabled}
            className="font-bold"
          >
            Entrar
          </Button>
          <Link href="/checkemail">
            <span className="text-sm text-blue-600 hover:text-blue-500">
              Esqueci minha senha
            </span>
          </Link>
        </Form>
      )}
    </Formik>
  );
}
