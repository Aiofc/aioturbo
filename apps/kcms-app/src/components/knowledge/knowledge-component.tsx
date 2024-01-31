import React from "react";
import KnowledgeManagerTable from "./knowledge-manager-table";
import { KnowledgeManageTableColumns } from "../../types";
import { Heading } from "../common/heading";
import { Button } from "../ui/button";

export default function KnowledgeComponent() {
  const data: KnowledgeManageTableColumns[] = [
    {
      id: "1",
      title: "测试知识库",
      category: "test",
      status: "publish",
      created: "2024-12-12",
      updated: "2024-12-12",
    },
    {
      id: "2",
      title: "医疗知识库",
      category: "test",
      status: "publish",
      created: "2024-12-12",
      updated: "2024-12-12",
    },
    {
      id: "3",
      title: "企业知识库",
      category: "test",
      status: "publish",
      created: "2024-12-12",
      updated: "2024-12-12",
    },
    {
      id: "4",
      title: "开发知识库",
      category: "test",
      status: "publish",
      created: "2024-12-12",
      updated: "2024-12-12",
    },
    {
      id: "5",
      title: "测试",
      category: "test",
      status: "publish",
      created: "2024-12-12",
      updated: "2024-12-12",
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Heading title={"知识库"} description={"知识库管理页面"} />
        <Button>新增</Button>
      </div>
      <KnowledgeManagerTable data={data} />
    </div>
  );
}
