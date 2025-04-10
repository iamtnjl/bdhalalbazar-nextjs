import PhotoPlaceholder from "@/components/shared/PhotoPlaceholder";

function CustomerProductCardListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[...Array(12).keys()].map((item) => (
        <div key={item} className="rounded-lg border p-2">
          <div className="flex gap-3">
            <div className="space-y-2 w-full">
              <div className="w-3/4 h-4 bg-grey-200 rounded-md" />
              <div className="w-3/5 h-3 bg-grey-200 rounded-md" />
              <div className="w-2/4 h-4 bg-grey-200 rounded-md" />
              <div className="w-3/4 h-4 bg-grey-200 rounded-md" />
            </div>
            <div className="h-20 w-20 shrink-0 border rounded-md grid place-items-center">
              <PhotoPlaceholder />
            </div>
          </div>

          <div className="h-10 w-28 ml-auto mt-2 bg-grey-200 rounded-md w-" />
        </div>
      ))}
    </div>
  );
}

export default CustomerProductCardListSkeleton;
