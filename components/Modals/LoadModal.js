export { LoadModal };

function LoadModal({ show, setShow, completeLoad, children }) {

  function handleComplete() {
    setTimeout(() => { setShow(false) }, 2500);
  }

  {completeLoad && handleComplete()}

  return (
    <>
      <div className={"modal load-modal shadow-lg rounded-lg bg-gray-800 text-white p-6 border-0 text-center" + (show ? " show" : "")}>
        <div className={"load" + (!completeLoad ? " show" : "")}>
          <div className="block mb-4">
            <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
          </div>
        </div>
        <div className={"complete" + (completeLoad ? " show" : "")}>
          <svg className="checkmark mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <div className="items-center justify-center">{children}</div>
      </div>
      <div className={"background-modal" + (show ? " show" : "")}></div>
    </>
  );
}