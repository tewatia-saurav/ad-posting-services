import React from "react";

export interface DROPDOWN_PROPS {
  label: string;
  onChange?: any;
  error?: boolean;
  helperText?: string;
  items: { value: string; label: string }[];
  selected: string;
}

export interface ITEM_TYPES {
  label: string;
  value: string;
}
