"use client";

/**
 * 仅做页面拼接以及样式调整展示，后期删除
 */

import React from "react";
import EditTree from "../../components/common/tree/edit-tree.tsx";
import {sourceData} from "../../demo-data/tree-demo.ts";
import KnowledgeComponent from "../../components/knowledge/knowledge-component.tsx";
import KanbanView from "../../components/common/views/KanbanView.tsx";
import {BizTreeData} from "../../types";

export default function TestPage() {

    function dealData(data: any) {
        let result: any[] = [];
        data.forEach((item: any) => {
            let newItem = {
                id: item.id,
                title: item.name,
                description: item.description,
            };

            result.push(newItem);

            if (item.subCategories && item.subCategories.length > 0) {
                result = result.concat(dealData(item.subCategories));
            }
        });
        return result;
    }

    const operat = {
        searchKey: "title",
    }

    return (
        <div className="flex flex-row">
            <div className="w-72">
                <EditTree treeData={sourceData}/>
            </div>
            <div className="ml-4 mt-3">
                <KanbanView initDataList={dealData(sourceData)} title={"title"} onClick={() => null}
                            operateBar={operat}/>
            </div>
        </div>

    );
}
