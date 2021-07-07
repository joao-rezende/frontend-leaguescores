import React, { useContext } from "react";

// components
import { AuthContext } from "../../contexts/AuthContext";

export default function CardProfile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6 pb-8">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                {
                  (user.image) ? (
                    <img
                      alt="..."
                      src="/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  ) : (
                    <span id="image-default-profile" className="text-sm text-emerald-500 bg-gray-700 shadow-xl inline-flex items-center justify-center rounded-full -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                      <i className="fas fa-user rounded-full align-middle border-none shadow-lg icon-user"></i>
                    </span>
                  )
                }
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-2">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-white mb-2">
                  Jenna Stones
                </h3>
                {/* <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                    22
                  </span>
                  <span className="text-sm text-gray-100">Friends</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                    10
                  </span>
                  <span className="text-sm text-gray-100">Photos</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                    89
                  </span>
                  <span className="text-sm text-gray-100">Comments</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-100"></i>{" "}
              Los Angeles, California
            </div>
            <div className="mb-2 text-gray-200 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-100"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-gray-200">
              <i className="fas fa-university mr-2 text-lg text-gray-100"></i>
              University of Computer Science
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
