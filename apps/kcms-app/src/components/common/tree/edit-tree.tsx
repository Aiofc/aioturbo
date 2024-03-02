import React, {useEffect, useRef, useState} from 'react';
import {NodeApi, Tree} from "react-arborist";
import {TbFolderPlus} from "react-icons/tb";
import {AiOutlineFileAdd} from "react-icons/ai";
import {BizDataToTreeData, TreeDataToBizData} from "../../../utils/other.ts";
import Node from "./node.tsx";
import {Input} from "../../ui/input.tsx";
import {Button} from "../../ui/button.tsx";
import {BizTreeDataList, TreeData} from "../../../types";
import {useSimpleTree} from "./hook/use-simple-tree.ts";

interface EditTreePProps {
    treeData: BizTreeDataList;
}

type MoveHandler = {
    dragIds: string[];
    dragNodes: NodeApi<TreeData>[];
    parentId: string | null;
    parentNode: NodeApi<TreeData> | null;
    index: number;
}

type RenameHandler = {id: string, name: string, node: NodeApi<TreeData>};

type DeleteHandler = {ids: string[]};

function EditTree({
                      treeData
                  }: EditTreePProps) {
    const [term, setTerm] = useState("");
    const treeRef = useRef(null);
    const [data, controller] = useSimpleTree(BizDataToTreeData(treeData));

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    function onRename({ name, id }: RenameHandler) {
        if(id.includes("simple-tree-id-"))
        console.log("创建", name, id);
        // 请求后端创建值
        else console.log("重命名", name, id);
        // 请求后端修改值
    }

    function onMove({dragIds, parentId, index, dragNodes, parentNode}: MoveHandler) {
        controller.onMove({dragIds, parentId, index, dragNodes, parentNode});
        dragNodes.forEach((node) => { node.data.parentId = parentId;})
        // 请求后端修改值
    }


    function onDelete({ ids }: DeleteHandler) {
        // controller.onDelete({ ids });
        console.log("onDelete", ids);
        // 请求后端批量删除
    }

    const createFileFolder = (
        <div className="space-x-1">
            <Button
                variant="link"
                // @ts-ignore
                onClick={() => treeRef.current.createInternal()}
                title="New Folder..."
            >
                <TbFolderPlus/>
            </Button>
            <Button
                variant="link"
                // @ts-ignore
                onClick={() => treeRef.current.createLeaf()} title="New File...">
                <AiOutlineFileAdd/>
            </Button>
        </div>
    );

    return (
        <div className="ml-2">
            <div className="folderFileActions">{createFileFolder}</div>
            <Input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <Tree
                ref={treeRef}
                data={data}
                width={260}
                height={800}
                indent={24}
                rowHeight={32}
                // openByDefault={false}
                searchTerm={term}
                searchMatch={(node, term) =>
                    node.data.name.toLowerCase().includes(term.toLowerCase())
                }

                onCreate={controller.onCreate}
                onRename={onRename}
                onMove={onMove}
                onDelete={onDelete}
            >
                {Node}
            </Tree>
        </div>
    );
}

export default EditTree;
