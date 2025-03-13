import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function PageSizeSelector({ value, onChange , label = 'Items per page', numberItems}) {


    return (
        <FormControl variant="outlined" size="small" sx={{ width:120, margin:2, padding:0}}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange} label={label}>
                {numberItems.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default PageSizeSelector;