function AddressInfo({ selected, addresses, setShowAddress }) {
  return (
    <>
      {selected.label ? (
        <div className="bg-white border-primary ring-2 ring-primary px-4 py-3 rounded-md border  text-gray-700">
          <div className="flex justify-between">
            <div className=" flex gap-2 items-center">
              <h3 className="text-base font-bold">{selected?.label}</h3>
            </div>
            <button
              className="text-primary font-semibold"
              onClick={() => setShowAddress(true)}
            >
              Edit
            </button>
          </div>
          <div className="flex flex-wrap justify-start gap-1 mt-2">
            <p>
              {`${selected?.house_street}, ${selected?.upazila?.name}, ${selected?.district?.name}, ${selected?.division?.name}, ${selected?.country}`}
            </p>
          </div>
        </div>
      ) : (
        addresses?.length > 0 && (
          <div className="bg-white border-primary ring-2 px-4 py-3 rounded-md ring-primary">
            <div className="flex justify-between">
              <div className=" flex gap-2 items-center">
                <h3 className="text-base font-bold">{addresses[0]?.label}</h3>
              </div>
              <button
                className="text-primary font-semibold"
                onClick={() => setShowAddress(true)}
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap justify-start gap-1 mt-2">
              {addresses ? (
                <>
                  <p>{addresses[0]?.street},</p>
                  <p>{addresses[0]?.area},</p>
                  <p>{addresses[0]?.district},</p>
                  <p>{addresses[0]?.division},</p>
                </>
              ) : (
                <p>No Addresses Found</p>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default AddressInfo;
