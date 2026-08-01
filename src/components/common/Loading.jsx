import React from "react";

const Loading = () => {
  return (
    <div className="w-7 h-7 animate-[ping_2s_linear_infinite] rounded-full border-2 border-[#d9376e] flex items-center justify-center">
      <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] rounded-full border-2 border-[#d9376e]"></div>
    </div>
  );
};

export default Loading;
