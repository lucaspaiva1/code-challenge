export function handleRequestError(err) {
  return Promise.reject(
    err?.response?.data?.message || "An error has occurred"
  );
}
