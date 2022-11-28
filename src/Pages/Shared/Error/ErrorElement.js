import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div>
      <h1 className="text-4xl text-center mt-16 text-red-600">
        Something went wrong!
      </h1>
      <h2 className="text-red-600 text-center">
        {error.status || error.message}
      </h2>
    </div>
  );
};

export default ErrorElement;
