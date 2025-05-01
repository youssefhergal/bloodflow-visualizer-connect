
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, List, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DonationLogTable from "@/components/donation/DonationLogTable";
import DonationForm from "@/components/donation/DonationForm";
import BadgeDisplay from "@/components/donation/BadgeDisplay";

export interface Donation {
  id: string;
  date: string;
  location: string;
  notes?: string;
  amount: number; // in milliliters
}

const DonationTracker = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [totalDonated, setTotalDonated] = useState(0);
  
  useEffect(() => {
    // Load donations from local storage
    const savedDonations = localStorage.getItem('bloodDonations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);
  
  useEffect(() => {
    // Calculate total donated amount
    const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
    setTotalDonated(total);
    
    // Save to local storage
    localStorage.setItem('bloodDonations', JSON.stringify(donations));
  }, [donations]);
  
  const handleAddDonation = (donation: Omit<Donation, 'id'>) => {
    const newDonation = {
      ...donation,
      id: Date.now().toString(),
    };
    
    setDonations([...donations, newDonation]);
    setShowForm(false);
  };
  
  const handleDeleteDonation = (id: string) => {
    setDonations(donations.filter(donation => donation.id !== id));
  };
  
  // Convert mL to L for display
  const totalLiters = totalDonated / 1000;
  
  // Calculate badge level
  const getDonationLevel = () => {
    const count = donations.length;
    if (count >= 25) return 'Platinum';
    if (count >= 15) return 'Gold';
    if (count >= 5) return 'Silver';
    if (count >= 1) return 'Bronze';
    return 'None';
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
          Your Blood Donation Journey
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Track your donations, see your progress, and earn recognition for your life-saving contributions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <Calendar className="mr-2 h-5 w-5" />
              Total Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{donations.length}</div>
            <p className="text-sm text-gray-400 mt-2">Donations recorded</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <List className="mr-2 h-5 w-5" />
              Volume Donated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalLiters.toFixed(2)} L</div>
            <p className="text-sm text-gray-400 mt-2">Total blood donated</p>
            <Progress 
              value={Math.min((totalLiters / 5) * 100, 100)} 
              className="h-2 mt-3 bg-gray-700"
            />
          </CardContent>
        </Card>
        
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <Award className="mr-2 h-5 w-5" />
              Donor Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{getDonationLevel()}</div>
            <p className="text-sm text-gray-400 mt-2">Donor recognition level</p>
          </CardContent>
        </Card>
      </div>
      
      <BadgeDisplay donationCount={donations.length} />
      
      <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-[hsl(var(--clr-primary-a30))]">Donation History</CardTitle>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="button-glow bg-[hsl(var(--clr-primary-a10))] hover:bg-[hsl(var(--clr-primary-a30))]"
          >
            <Plus className="mr-1 h-4 w-4" />
            {showForm ? "Cancel" : "Add Donation"}
          </Button>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <DonationForm onSubmit={handleAddDonation} onCancel={() => setShowForm(false)} />
          ) : (
            <DonationLogTable donations={donations} onDelete={handleDeleteDonation} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationTracker;
