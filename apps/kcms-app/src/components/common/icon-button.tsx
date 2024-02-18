import React from "react";
import { Button } from "../ui/button";
import { Archive } from "lucide-react";

type ButtonProps =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface IconButtonProps {
  variant?: ButtonProps;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function IconButton({
  icon,
  variant,
  children,
  onClick,
}: IconButtonProps) {
  return (
    <Button
      className='mr-1 w-full items-start'
      variant={variant ? variant : "ghost"}
      onClick={onClick}
    >
      <div className='w-full space-x-2 flex items-center'>
        {icon ? icon : <></>} <div>{children}</div>
      </div>
    </Button>
  );
}
