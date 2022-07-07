import * as React from "react";
import { css } from "@emotion/css";
import { useForm } from "react-hook-form";

const rootCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`

const boxCss =css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`

interface EnterForm {
  name: string;
  email: string;
  phone?: number;
  age: number;
}

function Form() {
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
      history.back();
    });
  };

  return (
    <main className={rootCss}>
      <header>유저 생성</header>
      <form className={formCss} onSubmit={handleSubmit(onSubmit)}>
        <div className={boxCss}>
          <label htmlFor={`${id}-name`}>이름</label>
          <input id={`${id}-name`} {...register("name", { required: true })}/>
        </div>
        <div className={boxCss}>
          <label htmlFor={`${id}-email`}>이메일</label>
          <input id={`${id}-email`} {...register("email", { required: true })}/>
        </div>
        <div className={boxCss}>
          <label htmlFor={`${id}-age`}>나이</label>
          <input id={`${id}-age`} {...register("age", { required: true })}/>
        </div>
        <div className={boxCss}>
          <label htmlFor={`${id}-phone`}>전화번호(선택)</label>
          <input id={`${id}-phone`} {...register("phone", { required: false, pattern: /^\d+/ })}/>
        </div>
        <button type="submit">등록</button>
      </form>
    </main>
  );
}

export default Form;