"use client";
import { useRouter } from "next/navigation";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

type FieldType = {
  username: string;
  password: string;
};
type ValidateField = {
  username: boolean;
  password: boolean;
  form: boolean;
};

const initField: FieldType = {
  username: "",
  password: "",
};
const initValidateField: ValidateField = {
  username: false,
  password: false,
  form: false,
};

const Page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [qureyRedirect, setQureyRedirect] = useState('')
  const [form, setForm] = useState<FieldType>(initField);
  const [validateForm, setValidateForm] =
    useState<ValidateField>(initValidateField);

  useEffect(() => {
    const query = new URLSearchParams(window?.location?.search);
    setQureyRedirect(query.get("redirect") || '')
    const usernameStorage = localStorage.getItem("user");
    const passwordStorage = localStorage.getItem("password");
    // Check if localStorage is available on the client-side
    if (usernameStorage || passwordStorage) {
      setForm({
        ...form,
        username: usernameStorage || "",
        password: passwordStorage || "",
      }); // Set data from localStorage to the state
    }
    setIsLoading(false);
  }, []); //

  const onFinish = () => {
    setValidateForm({ ...validateForm, form: false });
    if (!validate()) {
      return;
    }
    localStorage.setItem("user", form.username);
    localStorage.setItem("password", form.password);

    if (form.username !== "admin" || form.password !== "password") {
      setValidateForm({ ...validateForm, form: true });
      return;
    }

    if (qureyRedirect) {
      router.push(qureyRedirect);
    }
  };
  const validate = (): boolean => {
    setValidateForm({
      ...validateForm,
      username: !form.username,
      password: !form.password,
    });
    console.log(
      "validateForm",
      !validateForm.username || !validateForm.password
    );

    return !validateForm.username || !validateForm.password;
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center gap-8 p-8 border-solid border-black border-spacing-2 rounded-xl shadow-2xl">
      <div className="text-2xl font-bold">Login Form</div>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <Input
          status={validateForm.username || validateForm.form ? "error" : ""}
          placeholder="Please input your username!"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input.Password
          status={validateForm.password || validateForm.form ? "error" : ""}
          placeholder="Please input your password!"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {validateForm.form && <div className="text-red-500 ">Login Failed</div>}
        <Button type="primary" onClick={onFinish}>
          Submit
        </Button>
      </section>
    </section>
  );
};

export default Page;
