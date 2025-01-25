"use client";

import { Button, Input } from "antd";
import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
type FieldType = {
  username: string;
  password: string;
};
type ValidateField = {
  username: boolean;
  password: boolean;
  form: boolean;
};
const usernameStorage = localStorage.getItem("user");
const passwordStorage = localStorage.getItem("password");
const initField: FieldType = {
  username: usernameStorage || "",
  password: passwordStorage || "",
};
const initValidateField: ValidateField = {
  username: false,
  password: false,
  form: false,
};

const page = () => {
  const router = useRouter();
  const query = new URLSearchParams(window.location.search);
  const redirect = query.get("redirect");
  const [form, setForm] = useState<FieldType>(initField);
  const [validateForm, setValidateForm] =
    useState<ValidateField>(initValidateField);

  const onFinish = () => {
    setValidateForm({ ...validateForm, form: false });
    if (!validate()) {return;};
    localStorage.setItem("user", form.username);
    localStorage.setItem("password", form.password);

    if (form.username !== "admin" || form.password !== "password") {
      setValidateForm({ ...validateForm, form: true });
      return;
    }
   
    if (redirect) {
      router.push(redirect);
    }
  };
  const validate = (): boolean => {
    setValidateForm({
      ...validateForm,
      username: !form.username,
      password: !form.password,
    });
    console.log('validateForm', !validateForm.username || !validateForm.password);
    
    return !validateForm.username || !validateForm.password;
  };

  return (
    <section className="flex flex-col items-center gap-8 p-8 border-solid border-black border-spacing-2 rounded-xl shadow-2xl">
      <div className="text-2xl font-bold">Login Form</div>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <Input
          status={validateForm.username|| validateForm.form ? "error" : ""}
          placeholder="Please input your username!"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input.Password
          status={validateForm.password ||validateForm.form ? "error" : ""}
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

export default page;
