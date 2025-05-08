import { Calendar, Car, Clock, DollarSign, FileText, RefreshCw, Shield, CreditCard, Banknote, Wallet } from 'lucide-react';
import React from 'react';

const Policy = ({ postType, paymentSystem }) => {
    // Default payment methods if none provided
    const defaultPaymentMethods = {
        creditCard: true,
        bankTransfer: true,
        digitalWallet: true,
        cash: true,
        emi: postType === "selling"
    };

    // Use provided payment system or defaults
    const paymentMethods = paymentSystem || defaultPaymentMethods;

    return (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Policy Information</h2>
            {postType === "booking" ? (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Booking Policy</h3>

                    {/* Duration & Pricing */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Clock className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Booking Duration</h4>
                                <p className="text-gray-600">Minimum booking duration is 1 hour. Maximum booking duration is 30 days.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <DollarSign className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Pricing</h4>
                                <p className="text-gray-600">Rates are calculated based on hourly, daily, or weekly basis. Additional charges may apply for extra mileage.</p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Condition */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Car className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Vehicle Condition</h4>
                                <p className="text-gray-600">Vehicle must be returned in the same condition as received. Any damages will be charged accordingly.</p>
                            </div>
                        </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Calendar className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Cancellation Policy</h4>
                                <p className="text-gray-600">Free cancellation up to 24 hours before the booking. 50% charge for cancellations within 24 hours.</p>
                            </div>
                        </div>
                    </div>

                    {/* Insurance & Safety */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Shield className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Insurance & Safety</h4>
                                <p className="text-gray-600">Comprehensive insurance coverage included. Safety features must be used at all times.</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment System */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-lg mb-3">Payment System</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.creditCard && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <CreditCard className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Credit/Debit Cards</h4>
                                        <p className="text-gray-600">We accept all major credit and debit cards including Visa, MasterCard, and American Express.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.bankTransfer && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Banknote className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Bank Transfer</h4>
                                        <p className="text-gray-600">Direct bank transfers are accepted. Please ensure to include your booking reference number.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.digitalWallet && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Wallet className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Digital Wallets</h4>
                                        <p className="text-gray-600">Pay using popular digital wallets like PayPal, Apple Pay, or Google Pay.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.cash && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <DollarSign className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Cash Payment</h4>
                                        <p className="text-gray-600">Cash payments are accepted at our physical locations with valid ID proof.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Selling Policy</h3>

                    {/* Payment Terms */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <DollarSign className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Payment Terms</h4>
                                <p className="text-gray-600">Full payment is required upon purchase. We accept various payment methods including bank transfer and cash.</p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Inspection */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Car className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Vehicle Inspection</h4>
                                <p className="text-gray-600">Buyers are encouraged to inspect the vehicle thoroughly before purchase. Test drives are available by appointment.</p>
                            </div>
                        </div>
                    </div>

                    {/* Documentation */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <FileText className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Documentation</h4>
                                <p className="text-gray-600">All necessary documentation including title transfer and registration will be handled by our team.</p>
                            </div>
                        </div>
                    </div>

                    {/* Warranty */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Shield className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Warranty</h4>
                                <p className="text-gray-600">3-month warranty on major components. Extended warranty options available.</p>
                            </div>
                        </div>
                    </div>

                    {/* Return Policy */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <RefreshCw className="text-black mt-1" size={15} />
                            <div>
                                <h4 className="font-medium">Return Policy</h4>
                                <p className="text-gray-600">7-day return policy for manufacturing defects. Vehicle must be in original condition.</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment System */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-lg mb-3">Payment System</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.creditCard && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <CreditCard className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Credit/Debit Cards</h4>
                                        <p className="text-gray-600">We accept all major credit and debit cards including Visa, MasterCard, and American Express.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.bankTransfer && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Banknote className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Bank Transfer</h4>
                                        <p className="text-gray-600">Direct bank transfers are accepted. Please ensure to include your purchase reference number.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.digitalWallet && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Wallet className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">Digital Wallets</h4>
                                        <p className="text-gray-600">Pay using popular digital wallets like PayPal, Apple Pay, or Google Pay.</p>
                                    </div>
                                </div>
                            )}
                            {paymentMethods.emi && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <DollarSign className="text-black mt-1" size={15} />
                                    <div>
                                        <h4 className="font-medium">EMI Options</h4>
                                        <p className="text-gray-600">Flexible EMI options available with various banks. Click the EMI calculator button to check your options.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* EMI Information - Only show if EMI is enabled */}
                        {paymentMethods.emi && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold mb-2">EMI Information</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• EMI options available for 12 to 60 months</li>
                                    <li>• Competitive interest rates starting from 8.5%</li>
                                    <li>• No prepayment charges</li>
                                    <li>• Quick approval process</li>
                                    <li>• Zero processing fee on selected banks</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Policy;