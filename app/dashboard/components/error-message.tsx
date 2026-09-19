import React from "react";

type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      <p className="mt-1 text-sm text-red-500">{message}</p>
    </>
  );
}

export default ErrorMessage;
