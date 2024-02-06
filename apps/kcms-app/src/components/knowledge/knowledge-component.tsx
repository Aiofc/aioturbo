import React from "react";
import KnowledgeManagerTable from "./table/knowledge-manager-table";
import { Heading } from "../common/heading";
import { data } from "../../demo-data/knowledge-demo";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";

export default function KnowledgeComponent() {

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Heading title={"知识库"} description={"知识库管理页面"} />
        <Link href={"/knowledge/edit"} className={buttonVariants({ variant: "default" })}>新增</Link>
      </div>
      <KnowledgeManagerTable data={data} />
    </div>
  );
}
