import React from "react";
import { MenuItem, Select as Selmui } from "@material-ui/core"
import { ENDPOINTS, useConnectionConfig } from "../utils/connection";

export const Settings = () => {
  const { endpoint, setEndpoint } = useConnectionConfig();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEndpoint(event.target.value as string);
  };

  return (
    <>
      <div>
        Transactions: Settings:
      </div>
      <div style={{ display: "grid" }}>
        Network:{" "}
      </div>
      <Selmui
        onChange={handleChange}
        value={endpoint}>
        {ENDPOINTS.map(({ name, endpoint }) => (
          <MenuItem value={endpoint} key={endpoint}>
            {name}
          </MenuItem>
        ))}
      </Selmui>
    </>
  );
};
