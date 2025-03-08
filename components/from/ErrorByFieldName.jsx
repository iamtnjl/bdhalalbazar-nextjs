import ErrorAlert from "./ErrorAlert";

export default function ErrorByFieldName(props) {
  // Expects a field name and an object
  // with keys mapped to arrays
  return <ErrorAlert {...props} />;
}
