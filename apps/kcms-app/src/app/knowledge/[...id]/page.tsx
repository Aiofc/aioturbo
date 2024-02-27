import React from 'react'
import KnowledgeForm from '../../../components/knowledge/form/knowledge-form'
import BreadCrumb from "../../../components/common/page/breadcrumb.tsx";

const breadcrumbItems = [{ title: '知识库', link: '/knowledge' },{ title: "编辑知识库", link: "/knowledge/id" }]


export default function EditPage() {
  return (
      <div>
        <div className="mt-4 mb-4">
          <BreadCrumb items={breadcrumbItems} />
          <KnowledgeForm />
        </div>
      </div>

  )
}
