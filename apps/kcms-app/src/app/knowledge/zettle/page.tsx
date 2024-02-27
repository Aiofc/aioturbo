import React from 'react';
import BreadCrumb from "../../../components/common/page/breadcrumb.tsx";
import Zettlekasten from "../../../components/zettle/zettlekasten.tsx";

const breadcrumbItems = [{ title: '知识库', link: '/knowledge'}, {title: '知识卡片', link: '/knowledge/zettle'}]

function ZettlePage() {

    return (
        <div className='mt-4 mb-4'>
            <BreadCrumb items={breadcrumbItems}/>
            <Zettlekasten/>
        </div>
    );
}

export default ZettlePage;
