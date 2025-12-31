"use client";

import { ReactNode } from "react";

import styles from "@/styles/components/HeaderContent.module.css";

type HeaderContentProps = {
  children: ReactNode;
};

export function HeaderContent({ children }: HeaderContentProps) {
  return <p className={styles.subtitle}>{children}</p>;
}
