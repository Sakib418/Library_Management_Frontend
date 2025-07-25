import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {  Form , FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form"

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};
export function AddBookModal() {
   const form = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 0,
      description: "",
      available: true,
    },
  });

 const onSubmit = (data:BookFormData) => {
  console.log(data);
 }
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="font-bold bg-blue-100 text-blue-600 hover:bg-blue-200 text-xl">Add Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">
            Fill up this form to add book
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
          </DialogHeader>
          <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
    control={form.control}
    name="title"
    render={({field}) => (
      <FormItem>
        <FormLabel >Title</FormLabel>
        <FormControl>
          <Input {...field} value={field.value || ""} />
        </FormControl>
        
      </FormItem>
    )}
  />

 <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

           <FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </FormControl>
    </FormItem>
  )}
/>



            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) =>
                        field.onChange(Boolean(value))
                      }
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Available</FormLabel>
                </FormItem>
              )}
            />

    <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
    </DialogFooter>
           </form>
          
          </Form>
        </DialogContent>
     
    </Dialog>
  )
}
