import React from 'react';
import EmployeeForm from "../../../components/employee/form/employee-form.tsx";
import BreadCrumb from "../../../components/common/breadcrumb.tsx";

const breadcrumbItems = [{ title: '员工', link: '/employee' }, { title: '编辑', link: '/employee/id' }];

function EmployeeEditPage() {
    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <EmployeeForm/>
        </>
    );
}

export default EmployeeEditPage;
