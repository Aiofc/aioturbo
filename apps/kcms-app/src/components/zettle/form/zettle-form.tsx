'use client';
import React from 'react';
import {useParams} from "next/navigation";
import {Heading} from "../../common/page/heading.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Input} from "../../ui/input.tsx";
import {Textarea} from "../../ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover.tsx";
import {Button} from "../../ui/button.tsx";
import {cn} from "../../../lib/utils.ts";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandGroup, CommandItem} from "../../ui/command.tsx";
import {ZettleFormSchema, ZettleFormValues} from "../../../types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

function ZettleForm() {
    const params = useParams<{ id: string }>();
    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    const defaultValues: Partial<ZettleFormValues> = {
        id: "",
        name: "",
        description: "",
        active: true,
    };
    const knowledgeForm = useForm<ZettleFormValues>({
        resolver: zodResolver(ZettleFormSchema),
        defaultValues,
    });

    const activeStatus = [
        {value: true, label: "启用"},
        {value: false, label: "禁用"},
    ];

    async function onSubmit(data: ZettleFormValues) {
        console.log(data);
    }

    return (
        <div>
            <Heading
                title={params.id ? "修改知识卡片" : "创建知识卡片"}
                description={""}
            />
            <Form {...knowledgeForm} >
                <form
                    className="space-y-8 mt-2 mb-2"
                    onSubmit={knowledgeForm.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={knowledgeForm.control}
                        name="id"
                        render={({field}) => (
                            <FormItem hidden>
                                <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={params.id ? params.id : ""}
                                        disabled={true}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={knowledgeForm.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>知识卡片名称</FormLabel>
                                <FormControl>
                                    <Input placeholder="知识卡片的名称" {...field} />
                                </FormControl>
                                <FormDescription>此处填入知识卡片的名称</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={knowledgeForm.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>描述</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="知识卡片描述" {...field} />
                                </FormControl>
                                <FormDescription>此处填入知识卡片描述</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={knowledgeForm.control}
                        name="active"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-4">
                                <FormLabel>知识卡片状态</FormLabel>
                                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                            >
                                                {
                                                    activeStatus.find(
                                                        (activeStatus) =>
                                                            activeStatus.value === field.value,
                                                    )?.label
                                                }
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandGroup>
                                                {activeStatus.map((item) => (
                                                    <CommandItem
                                                        value={item.label}
                                                        key={item.value.toString()}
                                                        onSelect={() => {
                                                            knowledgeForm.setValue("active", item.value);
                                                            setOpenPopover(false);
                                                        }}
                                                    >
                                                        {item.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                item.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{params.id ? "保存更改" : "确认新增"}</Button>
                </form>
            </Form>
        </div>
    );
}

export default ZettleForm;
