import React from "react";

const Error = ({ message }: { message: string }) => {
  return (
    <div className="mt-10 text-4xl text-gray-500">
      <h1 className="text-center tracking[1px]">
        {message === "Not Found" ? "Profile Not Found" : message}
      </h1>
    </div>
  );
};

export default Error;
