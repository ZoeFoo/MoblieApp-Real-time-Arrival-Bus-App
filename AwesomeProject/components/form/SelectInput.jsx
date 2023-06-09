import React from "react";
import { Select, CheckIcon } from "native-base";

const SelectInput = ({ selectValue, setSelectValue }) => {
    return (
        <Select
            selectedValue={selectValue}
            minWidth="200"
            placeholder="請選擇查詢的巴士站"
            _selectedItem={{
                endIcon: <CheckIcon size="5" />
            }}
            onValueChange={(itemValue) => {
                setSelectValue(itemValue);
            }}>
            <Select.Item label="荃景圍天橋" value="BFA3460955AC820C" />
            <Select.Item label="荃灣柴灣角街" value="5FB1FCAF80F3D97D" />
        </Select>
    )
};

export default SelectInput;