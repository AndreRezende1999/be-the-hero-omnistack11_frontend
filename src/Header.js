import React from "react";
export default function Header({ children, title }) {
  return (
    <header>
      <h1>
        Be the hero! - {title}/{children}
      </h1>
    </header>
  );
}
