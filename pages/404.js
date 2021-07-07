import React, { Component } from "react";

export default class Error404 extends Component {
  render() {
    return (
      <>
        <div className="bg-gray-800 px-4 py-10 min-h-screen">
          <div className={"bg-gray-200 text-gray-800 rounded px-6 py-10 text-3xl text-center"}>
            <label>Error 404</label>
            <br />
            <span className="fas text-red-500 fa-exclamation-triangle text-13xl mt-3"></span>
            <br />
            <span className="text-sm">A página que você está procurando não foi encontrada</span>
          </div>
        </div>
      </>
    );
  }
}
