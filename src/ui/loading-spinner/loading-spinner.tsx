export default function LoadingSpinner() {
  return (
    <div className="backdrop-blur-[1px] flex items-center justify-center absolute z-50 h-screen w-screen top-0 left-0">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-solid border-transparent border-t-primary"></div>
    </div>
  );
}
