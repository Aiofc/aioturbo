'use client';
import React from "react";
import KnowledgeManagerTable from "./table/knowledge-manager-table";
import {Heading} from "../common/page/heading.tsx";
import {data} from "../../demo-data/knowledge-demo";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs.tsx";
import KanbanView from "../common/views/KanbanView.tsx";
import {useRouter} from "next/navigation";

export default function KnowledgeComponent() {
    const router = useRouter();
    const handleClick = (data: any) => {
        router.push(`/knowledge/zettle?knowledge_id=${data.id}`);
    };

    const operateBar = {
        view: true,
        create: "/knowledge/create",
        placeholder: "搜索知识库",
        searchKey: "name",
    }

    return (
        <Tabs defaultValue="kanban">
            <div className="flex items-center justify-between">
                <Heading title={"知识库"} description={"知识库管理页面"}/>
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="kanban">看板</TabsTrigger>
                    <TabsTrigger value="table">列表</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="kanban" className="w-full">
                <KanbanView initDataList={data} editLink="/knowledge/" operateBar={operateBar} onClick={handleClick}/>
            </TabsContent>
            <TabsContent value="table" className="w-full">
                <KnowledgeManagerTable data={data}/>
            </TabsContent>
        </Tabs>
    );
}
