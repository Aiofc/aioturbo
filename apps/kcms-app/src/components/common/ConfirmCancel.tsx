import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import {Button} from '../ui/button';
import {useRouter} from 'next/navigation';

interface Props {
    href: string;
}

export function ConfirmCancel({href}: Props) {
    const router = useRouter();

    function onClick() {
        router.push(href);
    }

    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">确认取消?</DialogTitle>
                    <DialogDescription>
                        取消后将不会保存任何修改，页面数据将会全部丢失。
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>
                    <div className="w-full justify-end flex space-x-3 ">
                        <Button
                            type="button"
                            onClick={() => onClick()}
                            variant="destructive"
                        >
                            确认取消
                        </Button>
                        <Button type="button">我再想想</Button>
                    </div>
                </DialogClose>
            </DialogContent>
            <DialogTrigger asChild>
                <Button variant="destructive">取消</Button>
            </DialogTrigger>
        </Dialog>
    );
}
