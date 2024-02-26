import React from 'react';
import Employee from "../../components/employee/employee.tsx";
import BreadCrumb from "../../components/common/breadcrumb.tsx";

const breadcrumbItems = [{ title: 'employee', link: '/employee' }];

function EmployeePage() {
    return (
        <div className='mt-4 mb-4'>
            <BreadCrumb items={breadcrumbItems} />
            <Employee/>
        </div>
    );
}

export default EmployeePage;
