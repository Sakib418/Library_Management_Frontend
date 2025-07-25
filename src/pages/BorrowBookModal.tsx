import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";


type BorrowFormInputs = {
  quantity: number;
  dueDate: string;
};
type Props = {
  book: {
    _id: string;
    title: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
};


export function BorrowBookModal({ book, open, setOpen }: Props) {
  
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();

  const form = useForm<BorrowFormInputs>({
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

  const onSubmit: SubmitHandler<BorrowFormInputs> = async (data) => {
    try {
      // console.log({book,...data});
      const borrowData = {
        book: book._id,
        ...data
      }
      console.log(borrowData);
      await borrowBook( borrowData ).unwrap();
      toast.success("📚 Book borrowed successfully");
      form.reset();
      navigate('/borrowSummary');
      setOpen(false);
    } catch (err: any) {
      toast.error("❌ Failed to borrow book", {
        description: err?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
