export { ConfirmModal };

function ConfirmModal({ show, children, onConfirm, onCancel }) {
  return (
    <>
      <div className={"modal shadow-lg rounded-lg bg-gray-800 text-white p-6 border-0" + (show ? " show" : "")}>
        <div className="items-center justify-center">{children}</div>
        <div className="flex flex-wrap">
          <div className="w-full pt-8 text-right">
            <button type="button" onClick={onCancel}
              className="btn-confirm-modal bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-2 ease-linear transition-all duration-150">
              NÃO
            </button>
            <button type="button" onClick={onConfirm}
              className="btn-confirm-modal bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
              SIM
            </button>
          </div>
        </div>
      </div>
      <div className={"background-modal" + (show ? " show" : "")}></div>
    </>
  );
}