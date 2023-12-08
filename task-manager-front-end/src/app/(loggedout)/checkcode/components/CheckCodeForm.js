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
        code: "",
      }}
      validationSchema={Yup.object({
        code: Yup.string().required("Campo obrigatório"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsDisabled(true);
        const payload = {
          code: values.code,
        };
        api
          .post("/checkcode", payload)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            setTimeout(() => {
              location.replace("/recover");
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
            Informe o código de recuperação recebido
          </span>
          <Input
            type="text"
            label="Código"
            name="code"
            placeholder="123456"
            {...formik.getFieldProps("code")}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="text-red-500 text-xs font-bold mb-2">
              {formik.errors.code}
            </div>
          ) : null}

          <Button
            color="primary"
            variant="solid"
            type="submit"
            isDisabled={isDisabled}
            className="font-bold"
          >
            Verificar código
          </Button>
        </Form>
      )}
    </Formik>
  );
}
