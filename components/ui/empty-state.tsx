import Image from "next/image";

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
}

export function EmptyState({ icon = "📭", title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 max-w-xs">{description}</p>
            )}
        </div>
    );
}

// Pre-built empty states for common scenarios
export function EmptyNotifications() {
    return (
        <EmptyState
            icon="🔔"
            title="No notifications yet"
            description="You're all caught up! Check back later for updates."
        />
    );
}

export function EmptyRewards() {
    return (
        <EmptyState
            icon="🎁"
            title="No rewards available"
            description="Check back soon for new exciting rewards!"
        />
    );
}

export function EmptyReferrals() {
    return (
        <EmptyState
            icon="👥"
            title="No referrals yet"
            description="Share your link with friends to start earning points!"
        />
    );
}
