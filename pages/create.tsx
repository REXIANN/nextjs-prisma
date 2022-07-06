import * as React from "react";
import { useForm } from "react-hook-form";

interface EnterForm {
  name: string;
  email: string;
  phone?: number;
}

function Create() {
  const id = React.useId();
  const { register, reset, handleSubmit } = useForm<EnterForm>();

  const onSubmit = (data: EnterForm) => {
    console.log({ data });

    fetch("/api/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      reset();
    });
  };

  return (
    <main>
      <header>유저 생성</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={`${id}-name`}>이름</label>
        <input id={`${id}-name`} {...register("name", { required: true })}/>
        <label htmlFor={`${id}-email`}>이메일</label>
        <input id={`${id}-email`} {...register("email", { required: true })}/>
        <label htmlFor={`${id}-phone`}>전화번호(선택)</label>
        <input id={`${id}-phone`} {...register("phone", { required: false, pattern: /^\d+/ })}/>
        <button type="submit">등록</button>
      </form>
    </main>
  );
}

export default Create;