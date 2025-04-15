"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: any;
  reset: any;
}) {
  return (
    <div>
      <h3>{error?.message}</h3>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
