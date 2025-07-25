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
  const { data, isLoading, isError } = useGetBorrowedBooksQuery(undefined);
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
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead className="text-right">
                        Total Borrowed
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowList.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.book.title}</TableCell>
                        <TableCell>{item.book.isbn}</TableCell>
                        <TableCell className="text-right">
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
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <p>
                    <span className="font-medium text-muted-foreground">
                      Title:
                    </span>{" "}
                    {item.book.title}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">
                      ISBN:
                    </span>{" "}
                    {item.book.isbn}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">
                      Total Borrowed:
                    </span>{" "}
                    {item.totalQuantity}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );


}
