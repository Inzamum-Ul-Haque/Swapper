import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-64 w-64"></div>
    </div>
  );
};

export default Loading;
