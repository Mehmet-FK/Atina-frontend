import React, { useEffect } from "react";
import MobileBookingsTable from "../components/tables/MobileBookingsTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const MobileBookings = () => {
  const { getMobileBookingsData } = useAtinaCalls();
  useEffect(() => {
    getMobileBookingsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MobileBookingsTable />
    </div>
  );
};

export default MobileBookings;
