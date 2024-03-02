import {AiFillFolder, AiFillFile} from "react-icons/ai";
import {MdArrowRight, MdArrowDropDown, MdEdit} from "react-icons/md";
import {RxCross2} from "react-icons/rx";
import {Input} from "../../ui/input.tsx";

interface NodeProps {
    node: any;
    style: any;
    dragHandle?: any;
    tree: any;
}

const Node = ({node, style, dragHandle, tree}: NodeProps) => {
    const CustomIcon = node.data.icon;
    const iconColor = node.data.iconColor;

    // console.log(node, tree);
    return (
        <div
            className={`flex h-full items-center w-full ${node.state.isSelected ? "isSelected" : ""}`}
            style={style}
            ref={dragHandle}
        >
            <div
                onClick={() => node.isInternal}
                className="flex h-full items-center w-full cursor-pointer"
            >
                {node.isLeaf ? (
                    <div >
                        <span className="w-5 text-lg flex"></span>
                        <span className="mr-1.5 flex items-center text-lg">
                            {
                                CustomIcon ? (
                                    <CustomIcon color={iconColor ? iconColor : "#6bc7f6"}/>
                                ) : (
                                    <AiFillFile color="#6bc7f6"/>
                                )
                            }
                        </span>
                    </div>
                ) : (
                    <div onClick={() => node.isInternal && node.toggle()} className="flex items-center flex-row">
                        <span className="w-5 text-lg flex">
                            {node.isOpen ? <MdArrowDropDown/> : <MdArrowRight/>}
                        </span>
                        <span className="mr-1.5 flex items-center text-lg">
                            {
                                CustomIcon ? (
                                    <CustomIcon color={iconColor ? iconColor : "#f6cf60"}/>
                                ) : (
                                    <AiFillFolder color="#f6cf60"/>
                                )
                            }
                        </span>
                    </div>
                )}
                <span className="text-gray-700 font-semibold">
                    {node.isEditing ? (
                        <Input
                            className="w-full h-6 border-1 rounded-md px-1.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            defaultValue={node.data.name}
                            onFocus={(e) => e.currentTarget.select()}
                            onBlur={() => node.reset()}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") node.reset();
                              if (e.key === "Enter") node.submit(e.currentTarget.value);
                            }}
                            autoFocus
                        />
                    ) : (
                      <span>{node.data.name}</span>
                    )}
                </span>
            </div>

            <div className="h-full flex">
                <div className="flex flex-row items-center mr-2.5">
                    <button onClick={() => node.edit()} title="Rename...">
                        <MdEdit/>
                    </button>
                    <button onClick={() => tree.delete(node.id)} title="Delete">
                        <RxCross2/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Node;
