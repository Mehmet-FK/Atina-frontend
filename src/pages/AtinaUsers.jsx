import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UsersTable from "../components/tables/UsersTable";
import useUsersCalls from "../hooks/useUsersCalls";

const AtinaUsers = () => {
  const { getUsersData } = useUsersCalls();
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
