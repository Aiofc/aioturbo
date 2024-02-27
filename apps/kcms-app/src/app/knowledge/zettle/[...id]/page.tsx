import React from "react";
import BreadCrumb from "../../../../components/common/page/breadcrumb.tsx";
import ZettleForm from "../../../../components/zettle/form/zettle-form.tsx";

const breadcrumbItems = [
  { title: "知识库", link: "/knowledge" },
  {
    title: "知识卡片",
    link: "/knowledge/zettle",
  },
  { title: "编辑知识卡片", link: "/knowledge/zettle/id" },
];

function ZettleEditPage() {
  return (
    <div>
      <div className="mt-4 mb-4">
        <BreadCrumb items={breadcrumbItems} />
      </div>
        <ZettleForm/>
    </div>
  );
}

export default ZettleEditPage;
