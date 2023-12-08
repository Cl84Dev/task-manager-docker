"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../api/api.js";

export default function SignupForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Formato inválido")
          .required("Campo obrigatório"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsDisabled(true);
        const payload = {
          email: values.email,
        };
        api
          .patch("/checkemail", payload)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            setTimeout(() => {
              location.replace("/checkcode");
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
          <span className="text-sm text-center text-neutral-900">
            Informe seu email para receber um código de recuperação de senha
          </span>
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

          <Button
            color="primary"
            variant="solid"
            type="submit"
            isDisabled={isDisabled}
            className="font-bold"
          >
            Receber código
          </Button>
        </Form>
      )}
    </Formik>
  );
}
