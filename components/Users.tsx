import * as React from "react";
import Link from "next/link";
import { css } from "@emotion/css";

import { User } from "@/libs/server/types";

const liCss = css`
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  gap: 30px;
`;

const boxCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const updateCss = css`
  padding: 5px 10px;
  border-radius: 10px;
  background-color: dodgerblue;
  color: white;
  cursor: pointer;
`

const deleteCss = css`
  padding: 5px 10px;
  border-radius: 10px;
  background-color: tomato;
  color: white;
  cursor: pointer;
`

interface Props {
  users: User[];
  fetchUsers: () => Promise<User[]>
}

function Users(props: Props) {
  const id = React.useId();

  const handleDelete = (email: string) => {
    const payload = { email }

    fetch("http://localhost:3000/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      props.fetchUsers()
    })
  };

  return (
    <ul>
      <li className={liCss}>
        <p>이름</p>
        <p>이메일</p>
        <p>전화번호</p>
        <div/>
      </li>
      {props.users.map((user) => (
        <li key={user.email} className={liCss}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <div className={boxCss}>
            <div className={updateCss}>
              <Link href="/form">수정</Link>
            </div>
            <div className={deleteCss} onClick={() => handleDelete(user.email)}>삭제</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Users;