import React, { ComponentType, ElementType, ReactNode } from "react";
interface TextOwnProps<E extends React.ElementType> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  children: ReactNode;
  as?: E;
}
type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;
export const Text = <E extends React.ElementType>({
  size,
  color,
  children,
  as,
}: TextProps<E>) => {
  const Component = as || "div";
  console.log(Component);
  return <Component>{children}</Component>;
};
