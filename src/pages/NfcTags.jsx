import React, { useEffect } from "react";

import NfcTable from "../components/tables/NfcTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const NfcTags = () => {
  const { getNfcTagsData } = useAtinaCalls();
  useEffect(() => {
    getNfcTagsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NfcTable />
    </div>
  );
};

export default NfcTags;
