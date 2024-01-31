import React from "react";
import KnowledgeComponent from "../../components/knowledge/knowledge-component";
import BreadCrumb from "../../components/common/breadcrumb";

const breadcrumbItems = [{ title: 'Knowledge', link: '/knowledge' }];

export default function KnowledgePage() {
  return (
    <div className='mt-4 mb-4'>
      <BreadCrumb items={breadcrumbItems} />
      <KnowledgeComponent />
    </div>
  );
}
