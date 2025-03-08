import Accordion from "../shared/Accordion";

function MobileFilterMenu({ params, setParams }) {
  return (
    <div className="flex pl-1 lg:hidden flex-col w-full sticky top-20 h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar">
      <Accordion />
      <p>Filters</p>
    </div>
  );
}

export default MobileFilterMenu;
