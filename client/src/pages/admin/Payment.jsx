import React from 'react';
import { CreditCard, ClipboardList, CheckCircle, XCircle } from 'lucide-react';

const payments = [
  {
    id: 'PMT-001',
    user: 'Alice Johnson',
    car: 'BYD e6',
    amount: 40000,
    status: 'Completed',
    date: '2025-07-05',
    method: 'Credit Card',
  },
  {
    id: 'PMT-002',
    user: 'Michael Smith',
    car: 'MG ZS',
    amount: 22000,
    status: 'Pending',
    date: '2025-07-04',
    method: 'PayPal',
  },
  {
    id: 'PMT-003',
    user: 'David Kim',
    car: 'Toyota Prius',
    amount: 18000,
    status: 'Failed',
    date: '2025-07-03',
    method: 'Bank Transfer',
  },
];

const Payment = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4] px-0 sm:px-4 max-h-screen overflow-auto scrollbar-hide text-white">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-cyan-100 drop-shadow flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-emerald-300" /> Payments
        </h2>
        <div className="bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-cyan-900 p-6">
          <table className="min-w-full text-sm text-cyan-100">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-900 to-blue-700 text-cyan-100">
                <th className="py-3 px-4 text-left font-semibold">Payment ID</th>
                <th className="py-3 px-4 text-left font-semibold">User</th>
                <th className="py-3 px-4 text-left font-semibold">Car</th>
                <th className="py-3 px-4 text-left font-semibold">Amount</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
               
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-cyan-900 last:border-b-0 hover:bg-cyan-900/30 transition">
                  <td className="py-2 px-4 font-mono text-cyan-200">{p.id}</td>
                  <td className="py-2 px-4 font-semibold text-cyan-100">{p.user}</td>
                  <td className="py-2 px-4 text-cyan-100">{p.car}</td>
                  <td className="py-2 px-4 text-emerald-200 font-bold">${p.amount.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    {p.status === 'Completed' && (
                      <span className="flex items-center gap-1 bg-emerald-900/80 text-emerald-200 px-2 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-4 h-4" /> Completed</span>
                    )}
                    {p.status === 'Pending' && (
                      <span className="flex items-center gap-1 bg-yellow-900/80 text-yellow-200 px-2 py-1 rounded-full text-xs font-bold"><ClipboardList className="w-4 h-4" /> Pending</span>
                    )}
                    {p.status === 'Failed' && (
                      <span className="flex items-center gap-1 bg-rose-900/80 text-rose-200 px-2 py-1 rounded-full text-xs font-bold"><XCircle className="w-4 h-4" /> Failed</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-cyan-200">{p.date}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;