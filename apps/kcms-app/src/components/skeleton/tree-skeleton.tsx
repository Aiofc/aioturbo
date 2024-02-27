import React from 'react';
import {Skeleton} from "../ui/skeleton.tsx";

function TreeSkeleton() {
    return (
        <div className="flex flex-col items-end space-y-2 w-64">
            <Skeleton className="h-7 w-[250px]"/>
            <div className="flex flex-col items-end space-y-2">
                <Skeleton className="h-7 w-[200px]"/>
                <Skeleton className="h-7 w-[150px]"/>
                <Skeleton className="h-7 w-[150px]"/>
                <Skeleton className="h-7 w-[100px]"/>
            </div>
            <Skeleton className="h-7 w-[250px]"/>
            <Skeleton className="h-7 w-[250px]"/>
            <Skeleton className="h-7 w-[200px]"/>
            <Skeleton className="h-7 w-[150px]"/>
        </div>
    );
}

export default TreeSkeleton;
