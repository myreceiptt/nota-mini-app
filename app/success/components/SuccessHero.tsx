"use client";

import { ReactNode } from "react";
import Image from "next/image";

import styles from "../page.module.css";

type SuccessHeroProps = {
  children: ReactNode;
};

export function SuccessHero({ children }: SuccessHeroProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.avatarWrapper}>
        <Image
          src="/nota-pfp.png"
          alt="Prof. NOTA Inc."
          width={96}
          height={96}
          className={styles.notaAvatar}
        />
      </div>

      {children}
    </div>
  );
}
