import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-gray-800"
            : "relative bg-gray-800") + " pb-6"
        }
      >
        <div className="container mx-auto px-0">
          <hr className="mb-6 border-b-1 border-emerald-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-8/12 px-4">
              <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left xs:">
                Copyright © {new Date().getFullYear()}{" "} - Todos os direitos reservados
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center md:text-right">
              <small className="text-gray-500">Desenvolvido por: </small>
              <img alt="Logo Empresa" className="w-8 inline-block" src="/img/logo.png" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
