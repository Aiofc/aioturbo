import React from 'react';
import EmployeeForm from "../../../components/employee/form/employee-form.tsx";
import BreadCrumb from "../../../components/common/breadcrumb.tsx";

const breadcrumbItems = [{ title: 'employee', link: '/employee' }, { title: 'create', link: '/employee/create' }];

function EmployeeCreatePage() {
    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <EmployeeForm/>
        </>

    );
}

export default EmployeeCreatePage;
