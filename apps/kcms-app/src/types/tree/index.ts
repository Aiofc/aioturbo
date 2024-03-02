import {ComponentType} from "react";

export interface BizTreeData {
    id: string;
    title: string;
    description: string | null;
    pid: string | null;
    active: boolean;
}

export type BizTreeDataList = BizTreeData[];

interface iconProps {
    color?: any
}

export type TreeData = {
    icon?: ComponentType<iconProps>;
    iconColor?: string;
    id: string;
    name: string;
    title: string;
    description: string | null;
    children?: TreeData[];
    active: boolean;
    pid: string | null;
}

export type TreeDataList = TreeData[];
