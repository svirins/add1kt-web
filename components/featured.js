export default function Featured() {
  return (
    <div className="flex">
      <span className="mr-2 text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 bg-red-200 text-red-700 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-activity mr-2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </span>
    </div>
  );
}
