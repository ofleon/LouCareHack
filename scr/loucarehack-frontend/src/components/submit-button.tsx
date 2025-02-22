'use client';

import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function SubmitButton({ className, children }: SubmitButtonProps) {
  return (
    <Button
      className={className}
      onClick={() => alert('Form submission will be implemented once backend is ready')}
    >
      {children}
    </Button>
  );
}
