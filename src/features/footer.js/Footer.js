import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-200 text-center fixed bottom-0 left-0 w-screen dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 Copyright : &nbsp;
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://tailwind-elements.com/"
        >
          My Fashion Store
        </a>
      </div>
    </footer>
  );
};

export default Footer;
