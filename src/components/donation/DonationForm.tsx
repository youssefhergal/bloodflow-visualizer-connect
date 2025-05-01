
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Donation } from "@/pages/DonationTracker";

interface DonationFormProps {
  onSubmit: (donation: Omit<Donation, 'id'>) => void;
  onCancel: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, onCancel }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(450); // Default donation amount in mL
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !location) return;
    
    onSubmit({
      date,
      location,
      notes,
      amount,
    });
    
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('');
    setNotes('');
    setAmount(450);
  };
  
  return (
    <Card className="p-4 bg-[hsl(var(--clr-surface-a10))] border-[hsl(var(--clr-primary-a10))]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Donation Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded bg-[hsl(var(--clr-surface-a20))] border border-gray-600 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Donation Center / Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 rounded bg-[hsl(var(--clr-surface-a20))] border border-gray-600 text-white"
            placeholder="Red Cross Blood Center"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Amount (mL)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 rounded bg-[hsl(var(--clr-surface-a20))] border border-gray-600 text-white"
            min="100"
            max="1000"
            step="10"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Standard donation is typically 450-500 mL
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 rounded bg-[hsl(var(--clr-surface-a20))] border border-gray-600 text-white"
            rows={3}
            placeholder="Any special notes about this donation..."
          />
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button 
            type="submit"
            className="button-glow bg-[hsl(var(--clr-primary-a10))] hover:bg-[hsl(var(--clr-primary-a30))]"
          >
            Save Donation
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={onCancel}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DonationForm;
