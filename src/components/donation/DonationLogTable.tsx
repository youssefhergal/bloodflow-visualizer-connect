
import React from "react";
import { Donation } from "@/pages/DonationTracker";
import { Button } from "@/components/ui/button";

interface DonationLogTableProps {
  donations: Donation[];
  onDelete: (id: string) => void;
}

const DonationLogTable: React.FC<DonationLogTableProps> = ({ donations, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No donations recorded yet.</p>
        <p className="text-sm text-gray-500 mt-2">
          Click the "Add Donation" button to record your first donation.
        </p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-gray-300">Date</th>
            <th className="text-left py-3 px-4 text-gray-300">Location</th>
            <th className="text-right py-3 px-4 text-gray-300">Amount</th>
            <th className="text-left py-3 px-4 text-gray-300">Notes</th>
            <th className="text-right py-3 px-4 text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((donation) => (
            <tr key={donation.id} className="border-b border-gray-800 hover:bg-[hsl(var(--clr-surface-a10))]">
              <td className="py-3 px-4 text-white">{formatDate(donation.date)}</td>
              <td className="py-3 px-4 text-white">{donation.location}</td>
              <td className="py-3 px-4 text-white text-right">{donation.amount} mL</td>
              <td className="py-3 px-4 text-gray-400 truncate max-w-[200px]">{donation.notes || '-'}</td>
              <td className="py-3 px-4 text-right">
                <Button
                  variant="ghost"
                  onClick={() => onDelete(donation.id)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-surface-a20))]"
                >
                  <span className="sr-only">Delete</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6C4.77614 6 5 5.77614 5 5.5C5 5.22386 4.77614 5 4.5 5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8C4.77614 8 5 7.77614 5 7.5C5 7.22386 4.77614 7 4.5 7ZM4.5 9C4.22386 9 4 9.22386 4 9.5C4 9.77614 4.22386 10 4.5 10C4.77614 10 5 9.77614 5 9.5C5 9.22386 4.77614 9 4.5 9ZM10.5 5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6C10.7761 6 11 5.77614 11 5.5C11 5.22386 10.7761 5 10.5 5ZM10.5 7C10.2239 7 10 7.22386 10 7.5C10 7.77614 10.2239 8 10.5 8C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7ZM10.5 9C10.2239 9 10 9.22386 10 9.5C10 9.77614 10.2239 10 10.5 10C10.7761 10 11 9.77614 11 9.5C11 9.22386 10.7761 9 10.5 9ZM7.5 5C7.22386 5 7 5.22386 7 5.5C7 5.77614 7.22386 6 7.5 6C7.77614 6 8 5.77614 8 5.5C8 5.22386 7.77614 5 7.5 5ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8C7.77614 8 8 7.77614 8 7.5C8 7.22386 7.77614 7 7.5 7ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationLogTable;
