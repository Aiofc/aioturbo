"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { EmployeeFormSchema, EmployeeFormValues } from "../../../types";
import { Heading } from "../../common/heading.tsx";
import request from "../../../utils/request.ts";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.tsx";
import { cn } from "../../../lib/utils.ts";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandGroup, CommandItem } from "../../ui/command.tsx";
import { useToast } from "../../ui/use-toast.ts";

function EmployeeForm() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const defaultValues: Partial<EmployeeFormValues> = {
      id: '',
      name: '',
      jobTitle: '',
      active: 1,
  };
  const employeeForm = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues,
  });
  const activeStatus = [
    { value: 1, label: "在职" },
    { value: 0, label: "离职" },
  ];

  useEffect(() => {
    async function getEmployee() {
      const response = await request(
        `/gateway/employee/empolyee/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = response.data;
      employeeForm.reset(data);
    }

    if (params.id) {
      getEmployee();
    }
  }, []);

  const onSubmit = async (data: EmployeeFormValues) => {
    if (params.id) {
      const response = await request(`/gateway/employee/empolyee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.data && response.ok) {
        toast({
          title: "修改成功",
          description: "修改员工信息成功",
          variant: "default",
          duration: 2000,
        });
        router.push("/employee");
      } else {
        toast({
          title: "修改失败",
          description: "修改员工信息失败, 请联系管理员",
          variant: "destructive",
          duration: 2000,
        });
      }
    } else {
      const response = await request(`/gateway/employee/empolyee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.data && response.ok) {
        toast({
          title: "新增成功",
          description: "新增员工成功",
          variant: "default",
          duration: 2000,
        });
        router.push("/employee");
      } else {
        toast({
          title: "新增失败",
          description: "新增员工失败, 请联系管理员",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div>
      <Heading
        title={params.id ? "修改员工信息" : "创建员工"}
        description={""}
      />
      <Form {...employeeForm}>
        <form
          className="space-y-8"
          onSubmit={employeeForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={employeeForm.control}
            name="id"
            render={({ field }) => (
              <FormItem hidden={!params.id}>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={params.id ? params.id : ""}
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={employeeForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>员工</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>此处填入员工的姓名</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={employeeForm.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>岗位</FormLabel>
                <FormControl>
                  <Input placeholder="员工岗位" {...field} />
                </FormControl>
                <FormDescription>此处填入员工的岗位</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={employeeForm.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-4">
                <FormLabel>就职状态</FormLabel>
                <Popover>
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
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandGroup>
                        {activeStatus.map((item) => (
                          <CommandItem
                            value={item.label}
                            key={item.value}
                            onSelect={() => {
                              employeeForm.setValue("active", item.value);
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{params.id ? "保存更改" : "确认新增"}</Button>
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;
