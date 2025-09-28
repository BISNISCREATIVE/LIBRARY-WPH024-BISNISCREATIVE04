import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  itemName?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Delete Data",
  description = "Once deleted, you won't be able to recover this data.",
  itemName = ""
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (onConfirm) {
        await onConfirm();
      }
      toast({
        title: 'Deleted',
        description: `${itemName} has been deleted successfully.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md shadow-xl rounded-xl px-2 md:px-8 py-6 md:py-8">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold mb-2">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base mb-4">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
          <Button variant="outline" onClick={onClose} disabled={isLoading} className="w-full md:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? 'Deleting...' : 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};