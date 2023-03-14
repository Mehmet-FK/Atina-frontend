import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MobileBookingsTable from "../components/tables/MobileBookingsTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const MobileBookings = () => {
  const { getMobileBookingsData } = useAtinaCalls();
  useEffect(() => {
    getMobileBookingsData();
  }, []);
  const { mobileBookings } = useSelector((state) => state.atina);

  return (
    <div>
      <MobileBookingsTable />
    </div>
  );
};

export default MobileBookings;
