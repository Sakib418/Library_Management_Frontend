import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

export default function BorrowSummaryPage() {
  const { data, isLoading, isError } = useGetBorrowedBooksQuery(undefined,{
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  });
  console.log(data);
  const borrowList = data?.data || [];
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        📚 Borrow Summary
      </h1>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      )}

     
      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load borrow summary. Please try again later.
          </AlertDescription>
        </Alert>
      )}

    
      {!isLoading && borrowList?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No borrowed books yet.
        </p>
      )}

      
      {
      !isLoading && borrowList?.length > 0 && (
        <>
          
          
          <div className="hidden md:block">
  <Card className="shadow-lg rounded-2xl">
    <CardContent className="p-0 overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
          <TableRow>
            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 px-4 py-3">
              Book Title
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 px-4 py-3">
              ISBN
            </TableHead>
            <TableHead className="text-right text-sm font-semibold text-gray-700 dark:text-gray-200 px-4 py-3">
              Total Borrowed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowList.map((item: any, index: number) => (
            <TableRow
              key={index}
              className={`transition-colors hover:bg-muted/50 ${
                index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <TableCell className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.book.title}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {item.book.isbn}
              </TableCell>
              <TableCell className="px-4 py-3 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {item.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</div>

         
         

          <div className="space-y-4 md:hidden">
  {borrowList.map((item: any, index: number) => (
    <Card
      key={index}
      className="rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow"
    >
      <CardContent className="p-4 space-y-2 text-sm">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Title</p>
          <p className="text-base font-medium text-foreground">
            {item.book.title}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">ISBN</p>
          <p className="text-base text-foreground">{item.book.isbn}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            Total Borrowed
          </p>
          <p className="text-base font-semibold text-primary">
            {item.totalQuantity}
          </p>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

        </>
      )}
    </div>
  );


}
