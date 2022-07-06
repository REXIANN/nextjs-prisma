import * as React from "react";

import type { User } from '@/libs/server/typs'

import styles from "../styles/Home.module.css";

interface Props {
  users: User[];
}

function Index(props: Props) {
  const id = React.useId();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header>유저 목록</header>
        <section>
          {props.users.map((user) => {
            return (
              <span key={id}>
                name: {user.name}, email: {user.email}, phone: {user.phone}
              </span>
            )
          })}
        </section>
      </main>
    </div>
  );
}

export default Index;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const users = await res.json();

  return {
    props: { users },
  };
}