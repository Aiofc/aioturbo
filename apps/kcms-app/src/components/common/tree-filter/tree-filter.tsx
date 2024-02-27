'use client';
import React, {useState} from 'react';
import {CursorProps, NodeApi, NodeRendererProps, Tree, TreeApi} from "react-arborist";
import {gmailData, GmailItem} from "../../../demo-data/tree-demo.ts";
import {FillFlexParent} from "./fill-flex-parent.tsx";
import * as icons from "react-icons/md";
import {Input as ShdInput} from "../../ui/input.tsx";
import {BsTree} from "react-icons/bs";
import {clsx} from "clsx";

function TreeFilter() {
    const [term, setTerm] = useState("");
    const globalTree = (tree?: TreeApi<GmailItem> | null) => {
        // @ts-ignore
        window.tree = tree;
    };

    function FolderArrow({ node }: { node: NodeApi<GmailItem> }) {
        if (node.isLeaf) return <span></span>;
        return (
            <span>
        {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
      </span>
        );
    }

    function Input({ node }: { node: NodeApi<GmailItem> }) {
        return (
            <ShdInput
                autoFocus
                type="text"
                defaultValue={node.data.name}
                onFocus={(e) => e.currentTarget.select()}
                onBlur={() => node.reset()}
                onKeyDown={(e) => {
                    if (e.key === "Escape") node.reset();
                    if (e.key === "Enter") node.submit(e.currentTarget.value);
                }}
            />
        );
    }

    function Node({ node, style, dragHandle }: NodeRendererProps<GmailItem>) {
        const Icon = node.data.icon || BsTree;
        return (
            <div
                ref={dragHandle}
                style={style}
                className={clsx(
                    "flex items-center mx-2 h-full leading-5 whitespace-nowrap",
                    node.state,
                )}
                onClick={() => node.isInternal && node.toggle()}
            >
                <FolderArrow node={node} />
                <span>
          <Icon />
        </span>
                <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
                <span>{node.data.unread === 0 ? null : node.data.unread}</span>
            </div>
        );
    }

    function Cursor({ top, left }: CursorProps) {
        return (
            <div
                className="w-full h-0 border-t-2 border border-blue-600 absolute"
                style={{ top, left }}
            ></div>
        );
    }


    return (
        <FillFlexParent>
            {({width, height}) => (
                <Tree
                    ref={globalTree}
                    initialData={gmailData}
                    width={width}
                    height={height}
                    rowHeight={32}
                    renderCursor={Cursor}
                    searchTerm={term}
                    paddingBottom={32}
                    disableEdit={(data) => data.readOnly}
                    disableDrop={({parentNode, dragNodes}) => {
                        return (
                            parentNode.data.name === "Categories" &&
                            dragNodes.some((drag) => drag.data.name === "Inbox")
                        );
                    }}
                >
                    {Node}
                </Tree>
            )}
        </FillFlexParent>
    );
}

export default TreeFilter;
