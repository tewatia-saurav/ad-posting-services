import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import React, { useState } from "react";
import { DROPDOWN_PROPS, ITEM_TYPES } from "./models";

function Dropdown(props: DROPDOWN_PROPS) {
  const { label, onChange, error, helperText, items, selected } = props;
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    // setValue(e.target.value);
    onChange(e.target.value);
  };
  let style = {};
  if (error) {
    style = { color: "red" };
  }
  return (
    <div>
      <InputLabel style={style}>{label}</InputLabel>
      <Select
        label={label}
        value={selected}
        onChange={handleChange}
        fullWidth={true}
        error={error}
      >
        {items.map((item: ITEM_TYPES) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText style={{ color: "red" }}>{helperText}</FormHelperText>
      )}
    </div>
  );
}

export default Dropdown;
