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
import StaticTree from "../../components/common/static-tree/static-tree.tsx";

export default function TestPage() {

    const operate = {
        searchKey: "title",
    }

    return (
        <div className="flex flex-row">
            <div className="w-72">
                {/*<EditTree treeData={sourceData}/>*/}
                <StaticTree/>
            </div>
            {/*<div className="ml-4 mt-3">*/}
            {/*    <KanbanView initDataList={sourceData} title={"title"} onClick={() => null}*/}
            {/*                operateBar={operate}/>*/}
            {/*</div>*/}
        </div>

    );
}
