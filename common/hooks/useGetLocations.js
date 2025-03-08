import { useEffect, useState } from "react";

import APIKit from "../helpers/APIKit";

export default function useGetLocations(divisionUid, districtUid) {
  const [locations, setLocations] = useState({
    divisions: [],
    districts: [],
    upazilas: [],
  });
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);

  useEffect(() => {
    APIKit.global.globalDivision().then(({ data }) => {
      setLocations((prevLocations) => {
        const updatedLocations = { ...prevLocations };
        updatedLocations.divisions = data;

        return updatedLocations;
      });
      setIsLocationsLoading(false);
    });

    if (divisionUid) {
      APIKit.global.globalDivisionDistrict(divisionUid).then(({ data }) => {
        setLocations((prevLocations) => {
          const updatedLocations = { ...prevLocations };
          updatedLocations.districts = data;

          return updatedLocations;
        });
      });
    }

    if (districtUid) {
      APIKit.global.globalDistrictUpazila(districtUid).then(({ data }) => {
        setLocations((prevLocations) => {
          const updatedLocations = { ...prevLocations };
          updatedLocations.upazilas = data;

          return updatedLocations;
        });
      });
    }
  }, [divisionUid, districtUid]);

  return { locations, isLocationsLoading };
}
