type propType = {
  error: string;
};
export default function Error({ error }: propType) {
  return (
    <>
      {error ? (
        <p className="absolute bottom-6 left-6 border border-red-500 text-red-600 bg-red-200 py-1 px-4 transition-all duration-200">
          {error}
        </p>
      ) : null}
    </>
  );
}
