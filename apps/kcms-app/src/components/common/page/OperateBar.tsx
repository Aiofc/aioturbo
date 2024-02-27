'use client';
import React, { ReactNode } from 'react';
import { Separator } from "../../ui/separator.tsx";
import { Button } from "../../ui/button.tsx";
import { Input } from "../../ui/input.tsx";
import { useRouter } from "next/navigation";

interface OperateBarProps {
    create?: string;
    placeholder?: string;
    options?: () => ReactNode;
}

function OperateBar({
    create,
    options,
    placeholder
}: OperateBarProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-start mb-3 space-y-2">
            <Separator/>
            <div className="flex flex-row space-x-3">
                { create? (
                    <Button className="h-[32px]"
                        onClick={()=>{create? router.push(create): null}}
                    >
                        新建
                    </Button>): null
                }
                <Input
                    className="w-36 lg:w-72 h-[32px] "
                    placeholder={placeholder? placeholder: "搜索"}
                />
                {options? options(): null}
            </div>
        </div>
    );
}

export default OperateBar;
