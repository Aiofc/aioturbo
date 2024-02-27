import React from "react";
import KnowledgeComponent from "../../components/knowledge/knowledge-component";
import BreadCrumb from "../../components/common/page/breadcrumb.tsx";

const breadcrumbItems = [{ title: '知识库', link: '/knowledge' }];

export default function KnowledgePage() {
  return (
    <div className='mt-4 mb-4'>
      <BreadCrumb items={breadcrumbItems} />
      <KnowledgeComponent />
    </div>
  );
}
