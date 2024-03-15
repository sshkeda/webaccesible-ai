import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { errorAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function Error() {
  const error = useAtomValue(errorAtom);

  return (
    <AlertDialog open={error !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Extension Errors Present</AlertDialogTitle>
          {error && (
            <AlertDialogDescription>{error.message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
