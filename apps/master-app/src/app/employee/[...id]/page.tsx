import React from 'react';
import EmployeeForm from "../../../components/employee/form/employee-form.tsx";
import BreadCrumb from "../../../components/common/breadcrumb.tsx";

const breadcrumbItems = [{ title: 'employee', link: '/employee' }, { title: 'edit', link: '/employee/id' }];

function EmployeeEditPage() {
    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <EmployeeForm/>
        </>
    );
}

export default EmployeeEditPage;
