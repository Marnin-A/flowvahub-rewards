"use client";

import { Button } from "./button";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Something went wrong",
    message,
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-4">{message}</p>
            {onRetry && (
                <Button
                    onClick={onRetry}
                    className="bg-primary-purple hover:bg-[#7c3aed] text-white px-6 py-2 rounded-full"
                >
                    Try again
                </Button>
            )}
        </div>
    );
}
