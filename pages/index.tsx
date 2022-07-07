import * as React from "react";
import Link from "next/link";
import { css } from '@emotion/css'

import type { User } from "@/libs/server/types";

import Users from "../components/Users";

import styles from "../styles/Home.module.css";

const navCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const navButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  background-color: lightskyblue;
`

async function fetchUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}

interface Props {
  users: User[];
}

function Index(props: Props) {

  return (
    <div className={styles.container}>
      <nav className={navCss}>
        <div className={navButtonCss}>
          <Link href="/form">유저 생성하기</Link>
        </div>
      </nav>
      <main className={styles.main}>
        <header>유저 목록</header>
        <section>
          <Users users={props.users} fetchUsers={fetchUsers}/>
        </section>
      </main>
    </div>
  );
}


export default Index;

export async function getServerSideProps() {
  const users = await fetchUsers()

  return {
    props: { users },
  };
}