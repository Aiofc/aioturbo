'use client';
import React, {ReactNode} from 'react'
import {TreeProvider} from "../../components/common/static-tree/tree-context.tsx";

interface Props {
    children: ReactNode;
}

export default function KnowledgeLayout({children}: Props) {
    return (
        <div className="mr-10 ml-10">
            <TreeProvider>
                {children}
            </TreeProvider>
        </div>
    )
}
