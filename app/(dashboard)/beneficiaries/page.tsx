"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Plus,
    Search,
    MoreVertical,
    Send,
    Edit2,
    Trash2,
    UserPlus,
    Loader2,
    CheckCircle,
    X,
    Shield,
    Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";

interface Beneficiary {
    id: string;
    name: string;
    email: string;
    upiId: string;
}

export default function BeneficiariesPage() {
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        upiId: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBeneficiaries = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient.get("/beneficiary");
            setBeneficiaries(data);
        } catch (error) {
            console.error("Failed to fetch beneficiaries", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const handleAddBeneficiary = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await apiClient.post("/beneficiary", formData);
            setIsAddOpen(false);
            setFormData({ name: "", email: "", upiId: "" });
            fetchBeneficiaries();
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message || "Failed to add beneficiary");
            } else {
                alert("Failed to add beneficiary");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBeneficiary = async (id: string) => {
        if (!confirm("Are you sure you want to remove this beneficiary?")) return;
        try {
            await apiClient.request(`/beneficiary/${id}`, { method: 'DELETE' });
            fetchBeneficiaries();
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message || "Failed to delete beneficiary");
            } else {
                alert("Failed to delete beneficiary");
            }
        }
    };

    const filteredBeneficiaries = beneficiaries.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Circle <span className="text-teal-500">.</span></h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Trusted Payment Nodes & Beneficiaries</p>
                </div>
                <div className="flex gap-3">
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-12 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl px-6 gap-2">
                                <UserPlus className="w-4 h-4" />
                                Add Contact
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card border-white/10 bg-slate-950 text-white rounded-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">New Trusted Node</DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium">Add a contact to your secure payment circle for faster settlements.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddBeneficiary} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Varun Sharma"
                                        className="h-14 bg-white/5 border-white/10 text-white font-bold rounded-2xl px-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <Input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="varun@example.com"
                                        className="h-14 bg-white/5 border-white/10 text-white font-bold rounded-2xl px-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">UPI ID (Optional)</label>
                                    <Input
                                        value={formData.upiId}
                                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                        placeholder="varun@fluxpay"
                                        className="h-14 bg-white/5 border-white/10 text-white font-bold rounded-2xl px-6"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save to Circle"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Search and Filters */}
                <Card className="lg:col-span-12 glass-card border-white/5 rounded-[2.5rem] p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, email or node ID..."
                                className="h-16 pl-16 bg-white/5 border-white/10 text-white font-bold rounded-[1.5rem] w-full focus:border-teal-500/50 transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="h-10 px-4 border-white/5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-3 h-3" /> Verified
                            </Badge>
                            <Badge variant="outline" className="h-10 px-4 border-white/5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Star className="w-3 h-3 text-yellow-500" /> Favorites
                            </Badge>
                        </div>
                    </div>
                </Card>

                {/* Beneficiaries List */}
                <div className="lg:col-span-12">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quantum Ledger Sync...</p>
                        </div>
                    ) : filteredBeneficiaries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBeneficiaries.map(beneficiary => (
                                <BeneficiaryCard
                                    key={beneficiary.id}
                                    beneficiary={beneficiary}
                                    onDelete={() => handleDeleteBeneficiary(beneficiary.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 gap-6 glass-card border-white/5 rounded-[3rem]">
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-slate-600">
                                <Users className="w-10 h-10" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white">Your circle is empty</h3>
                                <p className="text-slate-500 text-sm mt-1">Start adding contacts for secure, instant transfers.</p>
                            </div>
                            <Button
                                onClick={() => setIsAddOpen(true)}
                                variant="outline"
                                className="h-12 border-teal-500/20 bg-teal-500/5 text-teal-400 font-black uppercase tracking-widest text-[10px] rounded-2xl px-8"
                            >
                                Add Your First Contact
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function BeneficiaryCard({ beneficiary, onDelete }: { beneficiary: Beneficiary; onDelete: (id: string) => void }) {
    const initials = beneficiary.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <Card className="glass-card border-white/5 rounded-[2rem] p-6 hover:bg-white/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onDelete(beneficiary.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-600/20 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-lg">
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{beneficiary.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">{beneficiary.email}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Protocol Address</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{beneficiary.upiId || "FLUX-NODE-01"}</span>
                </div>
                <div className="flex gap-2">
                    <Button asChild className="flex-1 h-12 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-all">
                        <Link href={`/send?email=${beneficiary.email}`}>
                            <Send className="w-3.5 h-3.5 mr-2" />
                            Send Pay
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-12 h-12 border-white/5 bg-white/5 text-slate-500 rounded-xl hover:text-white hover:border-white/10">
                        <Edit2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
