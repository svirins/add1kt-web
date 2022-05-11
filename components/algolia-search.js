export default function AlgoliaSearch() {
  return (
    <div className="flex relative mx-auto mb-4">
      <input
        className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
        type="search"
        name="search"
        placeholder="Search"
      />
    </div>
  );
}
