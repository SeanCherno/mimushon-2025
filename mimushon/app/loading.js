import LoadingSpinner from "../components/util/LoadingSpinner";

export default function Loading() {
  // This UI will be shown as a fallback
  // while the page's Server Components load.
  return <LoadingSpinner asOverlay={true} />;
}
