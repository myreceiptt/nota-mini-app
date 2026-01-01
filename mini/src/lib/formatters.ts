"use client";

type DateInput = string | number | Date;

export const formatDateTime = (value: DateInput) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const shortenAddress = (value?: string | null) => {
  if (!value) return "unknown";
  return `${value.slice(0, 7)} ... ${value.slice(-4)}`;
};
