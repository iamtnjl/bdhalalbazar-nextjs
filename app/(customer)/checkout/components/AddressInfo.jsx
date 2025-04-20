function AddressInfo({ addresses, setShowAddress }) {
  return (
    <>
      {addresses?.length > 0 && (
        <div className="bg-white border-primary ring-2 px-4 py-3 rounded-md ring-primary">
          <div className="flex justify-between">
            <div className=" flex gap-2 items-center">
              <h3 className="text-base font-bold">
                {addresses ? (
                  <div className="flex flex-wrap ">
                    <p>{`${addresses[0]?.street}, `}</p>
                    <p>{`${addresses[0]?.city}, `}</p>
                    <p>{`${addresses[0]?.zip}`}</p>
                  </div>
                ) : (
                  <p>No Addresses Found</p>
                )}
              </h3>
            </div>
            <button
              className="text-primary font-semibold"
              onClick={() => setShowAddress(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressInfo;
