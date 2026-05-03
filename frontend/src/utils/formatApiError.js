/**
 * Turn FastAPI / axios errors into a single readable string.
 */
export function formatApiError(err) {
  const detail = err?.response?.data?.detail;
  if (detail == null) {
    if (err?.message) return err.message;
    return "Something went wrong. Check that the server is running.";
  }
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (typeof item?.msg === "string" ? item.msg : JSON.stringify(item)))
      .join(" ");
  }
  if (typeof detail === "object" && detail !== null) {
    try {
      return JSON.stringify(detail);
    } catch {
      return String(detail);
    }
  }
  return String(detail);
}
