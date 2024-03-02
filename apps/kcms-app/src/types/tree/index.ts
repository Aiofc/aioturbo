export interface BizTreeData {
    id: string;
    name: string;
    description: string | null;
    parentId: string | null;
    active: boolean;
}

export type BizTreeDataList = BizTreeData[];

export interface TreeData {
    id: string;
    name: string;
    description: string | null;
    children?: TreeData[];
    active: boolean;
    parentId: string | null;
}

export type TreeDataList = TreeData[];
