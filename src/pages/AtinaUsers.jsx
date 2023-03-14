import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UsersTable from "../components/tables/UsersTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const AtinaUsers = () => {
  const { getUsersData } = useAtinaCalls();
  useEffect(() => {
    getUsersData();
  }, []);
  const { AtinaUsers } = useSelector((state) => state);

  return (
    <div>
      <UsersTable />
    </div>
  );
};

export default AtinaUsers;
