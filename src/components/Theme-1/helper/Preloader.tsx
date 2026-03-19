import React from "react";

const Preloader = () => {
  let active:boolean = true;
  (()=>{
    setTimeout(() => {
      active = false;
    }, 500);
  })();

  return (
    <>
      {active  ? (
        <div className="loader-mask">
          <div className="loader">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (<div></div>)}
    </>
  );
};

export default Preloader;
