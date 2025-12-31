"use client";

import { ReactNode } from "react";

import styles from "@/styles/components/HeaderTitle.module.css";

type HeaderTitleProps = {
  children: ReactNode;
};

export function HeaderTitle({ children }: HeaderTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
