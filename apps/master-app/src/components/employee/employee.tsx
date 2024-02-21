"use client";
import React, {useEffect} from 'react';
import Link from "next/link";
import { Heading } from "../common/heading.tsx";
import { buttonVariants } from "../ui/button.tsx";
import EmployeeManagerTable from "./table/employee-manager-table.tsx";
import {EmployeeTableColumns} from "../../types";
import request from "../../utils/request.ts";

function Employee() {
    const [ data, setData ] = React.useState<EmployeeTableColumns[]>([]);
    useEffect(() =>{
        async function getEmployee() {
            const params = new URLSearchParams({
                current: "1",
                size: "10"
            }).toString();
            const response = await request(`/gateway/employee/empolyee/page?${params}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setData(response.data.records);
        }
        getEmployee();
    },[])

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <Heading title={"知识库"} description={"知识库管理页面"}/>
                <Link href={"/knowledge/create"} className={buttonVariants({variant: "default"})}>新增</Link>
            </div>
            <EmployeeManagerTable data={data}/>
        </div>
    );
}

export default Employee;
