import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from '@radix-ui/react-icons';
import {Column} from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu.tsx';
import {Button} from '../../ui/button.tsx';
import {cn} from '../../../lib/utils.ts';
import {HTMLAttributes} from 'react';

interface DataTableColumnHeaderProps<TData, TValue>
    extends HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function TableColumnHeader<TData, TValue>({
                                                     column,
                                                     title,
                                                     className,
                                                 }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4"/>
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4"/>
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        顺序排序
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        降序排序
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        隐藏列
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
