"use client";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { Heading } from "../common/page/heading.tsx";
import {zettleDemoList} from "../../demo-data/zettle-demo.ts";
import KanbanView from "../common/views/KanbanView.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs.tsx";
import ZettleManageTable from "./table/zettle-manage-table.tsx";

function Zettlekasten() {
    const searchParams = useSearchParams();
    const id = searchParams.get("knowledge_id");

    const router = useRouter();
    const operateBar = {
        create: "/knowledge/zettle/create",
        placeholder: "搜索知识卡片",
    }
    function handleClick(data: any){
        router.push(`/knowledge/zettle/${data.id}`);
    }

    return (
        <Tabs defaultValue="table">
            <div className="flex items-center justify-between">
                <Heading title={"知识卡片"} description={"知识卡片管理页面"} />
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="kanban">看板</TabsTrigger>
                  <TabsTrigger value="table">列表</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="kanban" className="w-full">
                <KanbanView dataList={zettleDemoList} onClick={handleClick} operateBar={operateBar}/>
            </TabsContent>
            <TabsContent value="table"  className="w-full">
                <ZettleManageTable data={zettleDemoList} />
            </TabsContent>
          </Tabs>
    );
}

export default Zettlekasten;
