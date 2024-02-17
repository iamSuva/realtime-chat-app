import React from "react";

function Singleconversation() {
  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded-sm
    p-2 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">
                    Suvadip
                </p>
                <span className="tetx-xl">💙</span>
            </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default Singleconversation;
