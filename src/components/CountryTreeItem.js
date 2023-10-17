import React from 'react'
import { TreeItem } from "@mui/x-tree-view/TreeItem";


function CountryTreeItem(props) {

    const { data, handleNodeSelect } = props;
    return (
        <TreeItem
            key={data.id}
            nodeId={data.id}
            label={data.name}
            onClick={() => handleNodeSelect(data.name)}
            sx={{
                fontSize: "1.5rem",
                "& .MuiTreeItem-label": {
                    fontSize: "1.5rem",
                },
            }}
        >
            {!!data.children && data.children.map((child) => <CountryTreeItem data={child} handleNodeSelect={handleNodeSelect}/>)}

        </TreeItem>
    )
}

export default CountryTreeItem